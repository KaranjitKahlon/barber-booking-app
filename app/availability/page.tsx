"use client"

import { useState } from "react"
import WeeklySchedule from "@/components/WeeklySchedule"
import BlockedTime from "@/components/BlockedTime"
import BlockTimeDialog from "@/components/BlockedTimeDialog"

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
    <main className="[max-width:800px] [margin:0_auto] [padding:40px_24px]">
      <h1 className="[font-size:28px] [font-weight:600]">Availability</h1>
      <p className="[font-size:14px] [color:#7c858e] [margin-top:8px]">Manage your regular working hours and upcoming time off.</p>

      <WeeklySchedule schedule={schedule} onChange={setSchedule} />
      <BlockedTime blockedTimes={blockedTimes} onDelete={handleDelete} onAdd={() => setDialogOpen(true)} />
      <BlockTimeDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSave={handleAdd} />
    </main>
  )
}
