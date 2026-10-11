
import { supabase } from "@/lib/supabase"

function timeToMinutes(time: string): number { // convert readable time to a string of minutes
    if (time.includes("AM") || time.includes("PM")) {
        const [timePart, period] = time.split(" ")
        let [hour, minute] = timePart.split(":").map(Number)
        if (period === "PM" && hour !== 12) hour += 12
        if (period === "AM" && hour === 12) hour = 0
        return hour * 60 + minute
    } else {
        const [hour, minute] = time.split(":").map(Number)
        return hour * 60 + minute
    }
}

function minutesToTime(minutes: number): string { // convert the string of minutes back to a readable time
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

export async function getAvailableSlots(date: Date, serviceId: string): Promise<string[]> {
    const test = await supabase.from("services").select("*")
    const dayOfWeek = date.getDay()
    const dateString = date.toISOString().split("T")[0]

    // check if barber works this day
    const { data: dayData, error: dayError } = await supabase
        .from("weekly_availability")
        .select("*")
        .eq("day_of_week", dayOfWeek)
        .single()

    if (dayError || !dayData) {
        return [] // shop closed
    }

    console.log("Weekly availability:", dayData)

    if (!dayData.is_available || !dayData.start_time || !dayData.end_time) {
        return [] // closed or no hours set
    }

    // check the service duration
    const { data: serviceData, error: serviceError } = await supabase
        .from("services")
        .select("duration_minutes")
        .eq("id", serviceId)
        .single()

    if (serviceError || !serviceData) return [] // service not found
    const duration = serviceData.duration_minutes

    // generate all 15 min blocks in working hours
    const workStart = timeToMinutes(dayData.start_time)
    const workEnd = timeToMinutes(dayData.end_time)

    const allSlots: number[] = []
    for (let t = workStart; t + duration <= workEnd; t += 15) {
        allSlots.push(t)
    }

    // fetch the availability exceptions for the date
    const { data: exceptions } = await supabase
        .from("availability_exceptions")
        .select("*")
        .eq("date", dateString)

    // fetch existing bookings for the date
    const { data: bookings, error: bookingsError } = await supabase
        .from("bookings")
        .select("id, date, start_time, end_time, service_id")
        .eq("date", dateString);

    // filter unavailable slots
    const availableSlots = allSlots.filter((slotStart) => {
        const slotEnd = slotStart + duration

        // check against exceptions
        if (exceptions) {
            for (const ex of exceptions) {
                if (ex.all_day) return false
                const exStart = timeToMinutes(ex.start_time.slice(0, 5))
                const exEnd = timeToMinutes(ex.end_time.slice(0, 5))
                if (slotStart < exEnd && slotEnd > exStart) return false
            }
        }

        // check against existing bookings
        if (bookings) {
            for (const booking of bookings) {
                if (!booking.start_time || !booking.end_time) continue
                const bookStart = timeToMinutes(booking.start_time.slice(0, 5))
                const bookEnd = timeToMinutes(booking.end_time.slice(0, 5))
                if (slotStart < bookEnd && slotEnd > bookStart) return false
            }
        }

            return true
        })

        // convert back to readable time
        return availableSlots.map((t) => minutesToTime(t))
}
