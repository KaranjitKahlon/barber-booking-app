"use client"

import { useState, useEffect } from "react"
import WeeklySchedule from "@/components/WeeklySchedule"
import BlockedTime from "@/components/BlockedTime"
import BlockTimeDialog from "@/components/BlockedTimeDialog"
import { SidebarProvider } from "@/components/ui/sidebar"
import { LogOut, LayoutDashboard, Scissors, CalendarDays } from "lucide-react"
import { AdminSidebar } from "@/components/AdminSidebar"
import { supabase } from "@/lib/supabase"
import { formatTime } from "@/lib/timeSlots"
import { timeToMinutes } from "@/lib/availability"
import RecurringBreaks from "@/components/RecurringBreaks"
import RecurringBreakDialog from "@/components/RecurringBreakDialog"

type BreakEntry = {
  id: string
  day: number
  start: string
  end: string
}

type BlockedTimeEntry = {
  id: number
  date: string
  allDay: boolean
  start: string | null
  end: string | null
}

export default function AvailabilityPage() {
  const [schedule, setSchedule] = useState<any[]>([])
  const [blockedTimes, setBlockedTimes] = useState<BlockedTimeEntry[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [blockError, setBlockError] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [breaks, setBreaks] = useState<BreakEntry[]>([])
  const [breakDialogOpen, setBreakDialogOpen] = useState(false)
  const [breakError, setBreakError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSchedule() {
      const { data, error } = await supabase
        .from("weekly_availability")
        .select("*")
        .order("day_of_week")

      if (error) {
        console.error(error)
      } else {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const formatted = data.map((row: any) => ({
          id: row.id,
          day: days[row.day_of_week],
          isOpen: row.is_available,
          start: row.start_time ? formatTime(row.start_time.slice(0, 5)) : "9:00 AM",
          end: row.end_time ? formatTime(row.end_time.slice(0, 5)) : "5:00 PM",
        }))
        setSchedule(formatted)
      }
    }
    fetchSchedule()
    fetchBlockedTimes()
    fetchBreaks()
  }, [])

    async function handleSaveSchedule() {
      setSaveStatus("saving")
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      let failed = false

      for (const row of schedule) {
        const dayIndex = days.indexOf(row.day)
        const { data, error } = await supabase
          .from("weekly_availability")
          .update({
            is_available: row.isOpen,
            start_time: row.isOpen ? convertTo24Hour(row.start) : null,
            end_time: row.isOpen ? convertTo24Hour(row.end) : null,
          })
          .eq("day_of_week", dayIndex)
          .select()
        
        if (error || !data || data.length === 0) {
          failed = true
          console.error("Error saving", row.day, error)
        }
      }
      setSaveStatus(failed ? "error" : "saved")
    }

  async function fetchBreaks() {            // fetches the breaks from db
    const { data, error } = await supabase
      .from("recurring_breaks")
      .select("*")
      .order("day_of_week")
      .order("start_time")

    if (error) {
      console.error("Error fetching breaks: ", error)
    } else {
      setBreaks(data.map((row: any) => ({
        id: row.id,
        day: row.day_of_week,
        start: row.start_time.slice(0, 5),
        end: row.end_time.slice(0, 5),
      })))
    }
  }

  async function handleAddBreak(entry: { days: number[]; start: string; end: string }) {
    setBreakError(null)
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const startMins = timeToMinutes(entry.start)
    const endMins = timeToMinutes(entry.end)

    if (endMins <= startMins) {
      setBreakError("Break must end after it starts.")
      return
    }

    for (const d of entry.days) {
      const dayRow = schedule.find((s) => s.day === dayNames[d])

      if (!dayRow || !dayRow.isOpen) {
        setBreakError(`${dayNames[d]} is closed. Cannot add break.`)
        return
      }

      const clash = breaks.some(                                                                    // check for overlapping breaks on the same day
        (b) => b.day === d && startMins < timeToMinutes(b.end) && endMins > timeToMinutes(b.start)
      )
      if (clash) {
        setBreakError(`${dayNames[d]} already has a break that overlaps this one.`)
        return
      }

      const openMins = timeToMinutes(dayRow.start)                                                  // break hours must be within business hours
      const closeMins = timeToMinutes(dayRow.end)
      if (startMins < openMins || endMins > closeMins) {
        setBreakError(`On ${dayNames[d]} the break must fall within working hours (${dayRow.start} - ${dayRow.end}).`)
        return
      }
    }

    const rows = entry.days.map((d) => ({
      day_of_week: d,
      start_time: entry.start,
      end_time: entry.end,
    }))

    const { data, error } = await supabase
      .from("recurring_breaks")
      .insert(rows)
      .select()

    if (error?.code === "23505") {
      setBreakError("That exact break already exists on one of those days.")
    } else if (error || !data || data.length === 0) {
      setBreakError("Failed to save break. Please try again.")
    } else {
      const added = data.map((row: any) => ({
        id: row.id,
        day: row.day_of_week,
        start: row.start_time.slice(0, 5),
        end: row.end_time.slice(0, 5),
      }))
      setBreaks([...breaks, ...added].sort((a, b) => a.day - b.day || a.start.localeCompare(b.start)))
      setBreakDialogOpen(false)
    }
  }

  async function handleDeleteBreak(id: string) {
    const { data, error } = await supabase
      .from("recurring_breaks")
      .delete()
      .eq("id", id)
      .select()

    if (error || !data || data.length === 0) {
      console.error("Delete break failed: ", error)
    } else {
      setBreaks(breaks.filter((b) => b.id !== id))
    }
  }

    
  async function fetchBlockedTimes() {              //review changes for this function for blocked times on a rolling basis
    const now = new Date()
    const today =
      `${now.getFullYear()}-` +
      `${(now.getMonth() + 1).toString().padStart(2, "0")}-` +
      `${now.getDate().toString().padStart(2, "0")}`

    const { error: cleanupError } = await supabase // deletes blocked time slots if they are a day old from db and frontend
      .from("availability_exceptions")
      .delete()
      .lt("date", today)

    if (cleanupError) {
      console.log("Error cleaning up expired blocks: ", cleanupError)
    }
    
    const { data, error } = await supabase
      .from("availability_exceptions")
      .select("*")
      .gte("date", today)
      .order("date")

    if (error) {
      console.log("Error fetching blocked times: ", error)
    } else {
      const formatted = data.map((row: any) => ({
        id: row.id,
        date: new Date(`${row.date}T12:00:00`).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        allDay: row.all_day,
        start: row.start_time ? formatTime(row.start_time.slice(0, 5)) : null,
        end: row.end_time ? formatTime(row.end_time.slice(0, 5)) : null,
      }))

      setBlockedTimes(formatted)
    }
  }

  useEffect(() => {
    if (saveStatus !== "saved") return
    const timer = setTimeout(() => setSaveStatus("idle"), 3000)
    return () => clearTimeout(timer)
  }, [saveStatus])

  async function handleDelete(id: number) {
    const { data, error } = await supabase
      .from("availability_exceptions")
      .delete()
      .eq("id", id)
      .select()
    
    if (error || !data || data.length === 0) {
      console.log("Error deleting blocked time: ", error)
    } else {
      setBlockedTimes(blockedTimes.filter((b) => b.id !== id))
    }
  }

  async function handleAdd(entry: Omit<BlockedTimeEntry, "id">) {
    setBlockError(null)

    const dateString = new Date(entry.date).toISOString().split("T")[0]

    const { data: existingBookings, error: fetchError } = await supabase
      .from("bookings")
      .select("start_time, end_time")
      .eq("date", dateString)

    if (fetchError) {
      setBlockError("Failed to check existing bookings. Please try again.")
      return
    }

    if (existingBookings && existingBookings.length > 0) {
      if (entry.allDay) {
        setBlockError("Cannot block this day - there are existing appointments. Contact customers to reschedule first.")
        return
      }

      if (entry.start && entry.end) {
        const blockStartMins = timeToMinutes(convertTo24Hour(entry.start))
        const blockEndMins = timeToMinutes(convertTo24Hour(entry.end))

        for (const booking of existingBookings) {
          if (!booking.start_time || !booking.end_time) continue
          const bookStart = timeToMinutes(booking.start_time.slice(0, 5))
          const bookEnd = timeToMinutes(booking.end_time.slice(0, 5))

          if (blockStartMins < bookEnd && blockEndMins > bookStart) {
            setBlockError(`Cannot block this time - it overlaps an existing appointment between ${formatTime(booking.start_time.slice(0, 5))} and ${formatTime(booking.end_time.slice(0, 5))}.`)
            return
          }
        }
      }
    }

    // no conflicts so continue with block day/time insert
    const { data, error } = await supabase
      .from("availability_exceptions")
      .insert([{
        date: new Date(entry.date).toISOString().split("T")[0],
        all_day: entry.allDay,
        start_time: entry.start ? convertTo24Hour(entry.start) : null,
        end_time: entry.end ? convertTo24Hour(entry.end) : null,
      }])
      .select()

    if (error || !data || data.length === 0) {
      setBlockError("Failed to save blocked time. Please try again.")
    } else {
      setBlockedTimes([...blockedTimes, { id: data[0].id, ...entry }])
      setDialogOpen(false)
    }
  }

  function convertTo24Hour(time: string): string {
    const trimmedTime = time.trim()

    // Already in 24-hour format, such as "17:00"
    if (!trimmedTime.includes("AM") && !trimmedTime.includes("PM")) {
      const [hour, minute] = trimmedTime.split(":").map(Number)

      return `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`
    }

    const [timePart, period] = trimmedTime.split(" ")
    let [hour, minute] = timePart.split(":").map(Number)

    if (period === "PM" && hour !== 12) hour += 12
    if (period === "AM" && hour === 12) hour = 0

    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <SidebarProvider>
        <AdminSidebar />
        <div className="flex [width:100%]">
            <main className="flex-1 [padding:24px] [padding-bottom:110px] md:[padding-bottom:24px]">

              <nav className="fixed [bottom:0] [left:0] [right:0] [z-index:50] grid [grid-template-columns:1fr_1fr_1fr_1fr] items-center border-t border-[#303944] bg-[#111821] [padding:10px_8px_calc(48px_+_env(safe-area-inset-bottom))] md:hidden">

                {/* Dashboard */}
                <a
                  href="/admin"
                  className="flex flex-col items-center justify-center [gap:4px] text-[#ffffff] [font-size:11px]"
                >
                  <LayoutDashboard size={20} strokeWidth={1.8} />
                  <span>Dashboard</span>
                </a>

                {/* Availability */}
                <a
                  href="/availability"
                  className="flex flex-col items-center justify-center [gap:4px] text-[#ffffff] [font-size:11px]"
                >
                  <CalendarDays size={20} strokeWidth={1.8} />
                  <span>Availability</span>
                </a>

                {/* Edit Services */}
                <a
                  href="/pricingAndServices"
                  className="flex flex-col items-center justify-center [gap:4px] text-[#ffffff] [font-size:11px]"
                >
                  <Scissors size={20} strokeWidth={1.8} />
                  <span>Edit Services</span>
                </a>

                {/* Logout */}
                <button
                  onClick={async () => {
                    await supabase.auth.signOut()
                    window.location.href = "/login"
                  }}
                  className="flex flex-col items-center justify-center [gap:4px] text-[#ffffff] [font-size:11px] [background:none] [border:none] cursor-pointer"
                >
                  <LogOut size={20} strokeWidth={1.8} />
                  <span>Logout</span>
                </button>

              </nav>

                <p className="[font-size:11px] [font-weight:600] [letter-spacing:0.15em] [color:#b98a4a] [text-transform:uppercase]">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </p>
                <h1 className="[font-size:28px] [font-weight:600] [margin-top:8px]">Availability</h1>
                <p className="[font-size:14px] [color:#7c858e] [margin-top:8px]">Manage your regular working hours and upcoming time off.</p>

                <WeeklySchedule schedule={schedule} onChange={setSchedule} onSave={handleSaveSchedule} saveStatus={saveStatus} />
                <RecurringBreaks breaks={breaks} onAdd={() => { setBreakError(null); setBreakDialogOpen(true) }} onDelete={handleDeleteBreak} />
                <RecurringBreakDialog open={breakDialogOpen} onClose={() => { setBreakDialogOpen(false); setBreakError(null) }} onSave={handleAddBreak} error={breakError} />
                <BlockedTime blockedTimes={blockedTimes} onDelete={handleDelete} onAdd={() => setDialogOpen(true)} />
                <BlockTimeDialog open={dialogOpen} onClose={() => { setDialogOpen(false); setBlockError(null) }} onSave={handleAdd} error={blockError} />
            </main>
        </div>
    </SidebarProvider>
  )
}
