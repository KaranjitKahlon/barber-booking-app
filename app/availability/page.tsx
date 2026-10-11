"use client"

import { useState, useEffect } from "react"
import WeeklySchedule from "@/components/WeeklySchedule"
import BlockedTime from "@/components/BlockedTime"
import BlockTimeDialog from "@/components/BlockedTimeDialog"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Home, LogOut, LayoutDashboard } from "lucide-react"
import { AdminSidebar } from "@/components/AdminSidebar"
import { supabase } from "@/lib/supabase"
import { formatTime } from "@/lib/timeSlots"

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
          start: row.start_time ? formatTime(row.start_time.slice(0, 5)) : "9:00",
          end: row.end_time ? formatTime(row.end_time.slice(0, 5)) : "5:00",
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
        console.log("Saving schedule row:", row)

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
        <AdminSidebar showReturnToDashboard/>
        <div className="flex [width:100%]">
            <main className="[max-width:800px] [margin:0_auto] [padding:40px_24px]">
                <section className="md:hidden flex items-center justify-around [background:#111821] [padding:12px_16px] [border-radius:12px] [margin-bottom:24px]">
                    <a href="/" className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px]">
                    <Home size={20} />
                    <span>Home</span>
                    </a>
                    <a href="/admin" className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px]">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                    </a>
                    <button className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px] [background:none] [border:none] cursor-pointer">
                    <LogOut size={20} />
                    <span>Logout</span>
                    </button>
                </section>

                <h1 className="[font-size:28px] [font-weight:600]">Availability</h1>
                <p className="[font-size:14px] [color:#7c858e] [margin-top:8px]">Manage your regular working hours and upcoming time off.</p>

                <WeeklySchedule schedule={schedule} onChange={setSchedule} onSave={handleSaveSchedule} />
                <BlockedTime blockedTimes={blockedTimes} onDelete={handleDelete} onAdd={() => setDialogOpen(true)} />
                <BlockTimeDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSave={handleAdd} />
            </main>
        </div>
    </SidebarProvider>
  )
}
