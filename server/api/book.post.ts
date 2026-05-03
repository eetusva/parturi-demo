import { serverSupabaseClient } from '#supabase/server'
 
// Apufunktio ajan muuttamiseksi minuuteiksi
const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const supabase = await serverSupabaseClient(event)

    // Hae palvelun kesto tietokannasta
    const { data: serviceData } = await supabase
        .from('services')
        .select('duration_minutes')
        .eq('name', body.service)
        .single()

    const duration_minutes = serviceData?.duration_minutes || 30

    // Osa 1: Tarkista päällekkäisyydet (Overlap check koodissa)
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
                status: 'confirmed'
            }
        ])

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        })
    }

    // 2. Lähetä SMS-ilmoitus yrittäjälle (Demototeutus)
    // Tässä kohtaa käytettäisiin oikeaa palvelua, esim. Twilio
    /*
    import twilio from 'twilio'
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
    await client.messages.create({
      body: `Uusi varaus: ${body.customer_name}, ${body.service} ${body.booking_date} klo ${body.booking_time}. Puh: ${body.phone}`,
      from: '+1234567890', // Twilio numero
      to: '+35815336638'   // Yrittäjän numero
    })
    */

    // Tulostetaan vain palvelimen konsoliin demon vuoksi
    console.log('--- SMS LÄHETETTY YRITTÄJÄLLE ---')
    console.log(`Uusi varaus: ${body.customer_name}, ${body.service} ${body.booking_date} klo ${body.booking_time}. Puh: ${body.phone}`)
    console.log('---------------------------------')

    return { success: true }
})