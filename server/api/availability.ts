import { serverSupabaseClient } from '#supabase/server'
 
// Apufunktio ajan muuttamiseksi minuuteiksi keskiyöstä (esim '09:30' -> 570)
const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
}

// Apufunktio minuuttien muuttamiseksi aika-merkkijonoksi (esim 570 -> '09:30')
const minutesToTime = (mins: number) => {
    const hours = Math.floor(mins / 60)
    const minutes = mins % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const date = query.date as string
    const serviceName = query.service as string || 'Hiustenleikkaus'

    if (!date) {
        throw createError({ statusCode: 400, statusMessage: 'Date is required' })
    }

    const supabase = await serverSupabaseClient(event)

    // Hae palvelun kesto tietokannasta
    const { data: serviceData } = await supabase
        .from('services')
        .select('duration_minutes')
        .eq('name', serviceName)
        .single()

    const requestedDuration = serviceData?.duration_minutes || 30

    // 1. Hae aukioloajat (tarkista ensin poikkeukset)
    let openTime = '09:00'
    let closeTime = '17:00'
    let isClosed = false

    // Hae viikonpäivä vakiotarkistuksia varten (esim. la-su suljettu tai eri aika)
    const d = new Date(date)
    const dayOfWeek = d.getDay() // 0 = su, 1 = ma, 6 = la

    if (dayOfWeek === 0) {
        isClosed = true // Sunnuntaisin kiinni oletuksena
    } else if (dayOfWeek === 6) {
        // Lauantai sopimuksen mukaan, oletuksena pidetään vaikka suljettuna, ellei avattu erikseen.
        isClosed = true
    }

    const { data: openingData } = await supabase
        .from('opening_hours')
        .select('*')
        .eq('date', date)
        .single()

    if (openingData) {
        isClosed = openingData.is_closed
        if (openingData.open_time) openTime = openingData.open_time
        if (openingData.close_time) closeTime = openingData.close_time
    }

    if (isClosed) {
        return { availableTimes: [] }
    }

    // 2. Hae päivän varaukset
    const { data: bookings } = await supabase
        .from('bookings')
        .select('booking_time, duration_minutes')
        .eq('booking_date', date)

    // 3. Laske vapaat ajat
    const startMins = timeToMinutes(openTime)
    const endMins = timeToMinutes(closeTime)
    const availableTimes = []

    // Luodaan lista varatuista intervalleista
    const bookedIntervals = (bookings || []).map(b => {
        const start = timeToMinutes(b.booking_time)
        return {
            start: start,
            end: start + (b.duration_minutes || 30)
        }
    })

    // Tarkistetaan jokainen 30 min aloitusväli
    for (let currentMins = startMins; currentMins + requestedDuration <= endMins; currentMins += 30) {
        const currentEnd = currentMins + requestedDuration

        // Tarkista meneekö mikään olemassa oleva varaus päällekkäin tämän slotin kanssa
        const isOverlapping = bookedIntervals.some(interval => {
            // Päällekkäisyys tapahtuu, jos:
            // - Uuden varauksen alku on ennen vanhan loppua
            // - JA uuden varauksen loppu on vanhan alun jälkeen
            return (currentMins < interval.end) && (currentEnd > interval.start)
        })

        if (!isOverlapping) {
            availableTimes.push(minutesToTime(currentMins))
        }
    }

    return { availableTimes }
})
