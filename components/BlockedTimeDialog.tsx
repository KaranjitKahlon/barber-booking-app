"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import BookCalendar from "@/components/BookCalendar"

type BlockTimeDialogProps = {
  open: boolean
  onClose: () => void
  onSave: (entry: { date: string; allDay: boolean; start: string | null; end: string | null }) => void
}

const timeOptions = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
]

export default function BlockTimeDialog({ open, onClose, onSave }: BlockTimeDialogProps) {
  const [date, setDate] = useState<Date | null>(null)
  const [allDay, setAllDay] = useState(true)
  const [start, setStart] = useState("9:00 AM")
  const [end, setEnd] = useState("5:00 PM")

  function handleSave() {
    if (!date) return
    onSave({
      date: date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      allDay,
      start: allDay ? null : start,
      end: allDay ? null : end,
    })
    onClose()
    setDate(null)
    setAllDay(true)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="[max-width:420px]">
        <DialogHeader>
          <DialogTitle>Block Time</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col [gap:20px] [padding:8px_0]">
          <div>
            <p className="[font-size:13px] [font-weight:600] [margin-bottom:8px]">Date</p>
            <BookCalendar selected={date} onSelect={(d) => setDate(d ?? null)} />
          </div>

          <div>
            <p className="[font-size:13px] [font-weight:600] [margin-bottom:8px]">Availability</p>
            <div className="flex flex-col [gap:8px]">
              <label className="flex items-center [gap:8px] cursor-pointer">
                <input type="radio" checked={allDay} onChange={() => setAllDay(true)} />
                <span className="[font-size:14px]">All day</span>
              </label>
              <label className="flex items-center [gap:8px] cursor-pointer">
                <input type="radio" checked={!allDay} onChange={() => setAllDay(false)} />
                <span className="[font-size:14px]">Specific hours</span>
              </label>
            </div>
          </div>

          {!allDay && (
            <div className="flex [gap:16px]">
              <div className="flex flex-col [gap:8px] flex-1">
                <p className="[font-size:13px] [font-weight:600]">Start</p>
                <select value={start} onChange={(e) => setStart(e.target.value)} className="[border:1px_solid_#e3ddd3] [border-radius:8px] [padding:8px_12px] [font-size:14px]">
                  {timeOptions.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex flex-col [gap:8px] flex-1">
                <p className="[font-size:13px] [font-weight:600]">End</p>
                <select value={end} onChange={(e) => setEnd(e.target.value)} className="[border:1px_solid_#e3ddd3] [border-radius:8px] [padding:8px_12px] [font-size:14px]">
                  {timeOptions.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex [gap:12px]">
          <Button onClick={onClose} className="bg-[#dee2e6] text-[#111821] hover:bg-[#adb5bd] rounded-none [padding:10px_20px]">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!date} className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:10px_20px]">
            Block Time
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
