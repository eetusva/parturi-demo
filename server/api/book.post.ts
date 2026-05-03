import { serverSupabaseClient } from '#supabase/server'
 
// Apufunktio ajan muuttamiseksi minuuteiksi
const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const supabase = await serverSupabaseClient(event)
    
    // Hae asiakkaan IP-osoite
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'

    // --- RATE LIMITING ---
    // Tarkistetaan, onko tästä IP:stä tehty yli 3 varausta viimeisen tunnin aikana
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    
    const { count, error: countError } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('client_ip', ip)
        .gt('created_at', oneHourAgo)

    if (count !== null && count >= 3) {
        throw createError({
            statusCode: 429,
            statusMessage: 'Liikaa varausyrityksiä samasta osoitteesta. Odota hetki ennen uutta varausta.'
        })
    }
    // ---------------------

    // Hae palvelun kesto tietokannasta
    const { data: serviceData } = await supabase
        .from('services')
        .select('duration_minutes')
        .eq('name', body.service)
        .single()

    const duration_minutes = serviceData?.duration_minutes || 30

    // Osa 1: Tarkista päällekkäisyydet
    const { data: existingBookings } = await supabase
        .from('bookings')
        .select('booking_time, duration_minutes')
        .eq('booking_date', body.booking_date)

    const newStartMins = timeToMinutes(body.booking_time)
    const newEndMins = newStartMins + duration_minutes

    const hasOverlap = (existingBookings || []).some((b: any) => {
        const bStart = timeToMinutes(b.booking_time)
        const bEnd = bStart + (b.duration_minutes || 30)
        return (newStartMins < bEnd) && (newEndMins > bStart)
    })

    if (hasOverlap) {
        throw createError({
            statusCode: 409,
            statusMessage: 'Valitsemasi aika on juuri varattu. Ole hyvä ja valitse toinen aika.'
        })
    }

    // 2. Tallenna varaus Supabaseen
    const { data, error } = await supabase
        .from('bookings')
        .insert([
            {
                customer_name: body.customer_name,
                phone: body.phone,
                service: body.service,
                booking_date: body.booking_date,
                booking_time: body.booking_time,
                duration_minutes: duration_minutes,
                client_ip: ip,
                status: 'confirmed'
            }
        ])

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        })
    }

    // Tulostetaan vain palvelimen konsoliin demon vuoksi
    console.log(`--- UUSI VARAUS (IP: ${ip}) ---`)
    console.log(`Asiakas: ${body.customer_name}, Palvelu: ${body.service}, Aika: ${body.booking_date} klo ${body.booking_time}`)

    return { success: true }
})