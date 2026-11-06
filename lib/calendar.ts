

type CalendarEvent = {
  title: string
  date: string        // "YYYY-MM-DD"
  start: string       // "HH:MM" (24-hour)
  durationMinutes: number
  location: string
  details: string
}

function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(":").map(Number)
  const total = h * 60 + m + mins
  return `${Math.floor(total / 60).toString().padStart(2, "0")}:${(total % 60).toString().padStart(2, "0")}`
}

function stamp(date: string, time: string): string {
  return `${date.replaceAll("-", "")}T${time.replace(":", "")}00`
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n")
}

export function googleCalendarUrl(e: CalendarEvent): string {
  const end = addMinutes(e.start, e.durationMinutes)
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${stamp(e.date, e.start)}/${stamp(e.date, end)}`,
    ctz: "America/Los_Angeles",
    location: e.location,
    details: e.details,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function downloadIcs(e: CalendarEvent) {
  const end = addMinutes(e.start, e.durationMinutes)
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//JSL Barber//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${e.date}-${e.start}-${Date.now()}@jslbarber`,
    `DTSTAMP:${now}`,
    `DTSTART:${stamp(e.date, e.start)}`,
    `DTEND:${stamp(e.date, end)}`,
    `SUMMARY:${escapeIcs(e.title)}`,
    `LOCATION:${escapeIcs(e.location)}`,
    `DESCRIPTION:${escapeIcs(e.details)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Appointment tomorrow",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Appointment in 1 hour",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ]

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "appointment.ics"
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
