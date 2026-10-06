"use client"

import { useState } from "react"
import WeeklySchedule from "@/components/WeeklySchedule"
import BlockedTime from "@/components/BlockedTime"
import BlockTimeDialog from "@/components/BlockedTimeDialog"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Home, LogOut, LayoutDashboard } from "lucide-react"
import { AdminSidebar } from "@/components/AdminSidebar"

type BlockedTimeEntry = {
  id: number
  date: string
  allDay: boolean
  start: string | null
  end: string | null
}

const initialSchedule = [
  { day: "Monday", isOpen: true, start: "9:00 AM", end: "5:00 PM" },
  { day: "Tuesday", isOpen: true, start: "9:00 AM", end: "5:00 PM" },
  { day: "Wednesday", isOpen: true, start: "9:00 AM", end: "5:00 PM" },
  { day: "Thursday", isOpen: true, start: "9:00 AM", end: "5:00 PM" },
  { day: "Friday", isOpen: true, start: "9:00 AM", end: "5:00 PM" },
  { day: "Saturday", isOpen: false, start: "", end: "" },
  { day: "Sunday", isOpen: false, start: "", end: "" },
]

const initialBlockedTimes: BlockedTimeEntry[] = [
  { id: 1, date: "October 8, 2026", allDay: true, start: null, end: null },
  { id: 2, date: "October 15, 2026", allDay: false, start: "1:00 PM", end: "3:00 PM" },
]

export default function AvailabilityPage() {
  const [schedule, setSchedule] = useState(initialSchedule)
  const [blockedTimes, setBlockedTimes] = useState(initialBlockedTimes)
  const [dialogOpen, setDialogOpen] = useState(false)

  function handleDelete(id: number) {
    setBlockedTimes(blockedTimes.filter((b) => b.id !== id))
  }

  function handleAdd(entry: Omit<BlockedTimeEntry, "id">) {
    setBlockedTimes([...blockedTimes, { id: Date.now(), ...entry }])
  }

  return (
    <SidebarProvider>
        <AdminSidebar />
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

                <WeeklySchedule schedule={schedule} onChange={setSchedule} />
                <BlockedTime blockedTimes={blockedTimes} onDelete={handleDelete} onAdd={() => setDialogOpen(true)} />
                <BlockTimeDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSave={handleAdd} />
            </main>
        </div>
    </SidebarProvider>
  )
}
