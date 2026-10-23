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
  }, [])

    async function handleSaveSchedule() {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

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
        
        console.log("Result: ", data, error)
      }
      console.log("Schedule saved")
    }

    async function fetchBlockedTimes() {
      const { data, error } = await supabase
        .from("availability_exceptions")
        .select("*")
        .order("date")

      if (error) {
        console.log("Error fetching blocked times: ", error)
      } else {
        const formatted = data.map((row: any) => ({
          id: row.id,
          date: new Date(row.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          allDay: row.all_day,
          start: row.start_time ? formatTime(row.start_time.slice(0, 5)) : null,
          end: row.end_time ? formatTime(row.end_time.slice(0, 5)) : null,
        }))
        setBlockedTimes(formatted)
      }
    }

  async function handleDelete(id: number) {
    const { data, error } = await supabase
      .from("availability_exceptions")
      .delete()
      .eq("id", id)
    
    if (error) {
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

    if (error) {
      console.log("Error adding blocked time: ", error)
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
            <main className="flex-1 [padding:24px]">
                <section className="md:hidden flex items-center justify-around [background:#111821] [padding:12px_16px] [margin-bottom:24px] [position:sticky] [top:0] [z-index:40]">
                    <a href="/admin" className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px]">
                      <LayoutDashboard size={20} />
                      <span>Dashboard</span>
                    </a>
                    <a href="/availability" className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px]">
                      <CalendarDays size={20} />
                      <span>Availability</span>
                    </a>
                    <a href="/pricingAndServices" className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px]">
                      <Scissors size={20} />
                      <span>Edit Services</span>
                    </a>
                    <button 
                      onClick={async () => {
                        await supabase.auth.signOut()
                        window.location.href = "/login"
                      }}
                      className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px] [background:none] [border:none] cursor-pointer underline"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                </section>

                <p className="[font-size:11px] [font-weight:600] [letter-spacing:0.15em] [color:#b98a4a] [text-transform:uppercase]">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </p>
                <h1 className="[font-size:28px] [font-weight:600] [margin-top:8px]">Availability</h1>
                <p className="[font-size:14px] [color:#7c858e] [margin-top:8px]">Manage your regular working hours and upcoming time off.</p>

                <WeeklySchedule schedule={schedule} onChange={setSchedule} onSave={handleSaveSchedule} />
                <BlockedTime blockedTimes={blockedTimes} onDelete={handleDelete} onAdd={() => setDialogOpen(true)} />
                <BlockTimeDialog open={dialogOpen} onClose={() => { setDialogOpen(false); setBlockError(null) }} onSave={handleAdd} error={blockError} />
            </main>
        </div>
    </SidebarProvider>
  )
}
