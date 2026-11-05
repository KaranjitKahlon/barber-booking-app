"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { formatTime } from "@/lib/timeSlots"

type RecurringBreakDialogProps = {
  open: boolean
  onClose: () => void
  onSave: (entry: { days: number[]; start: string; end: string }) => void
  error?: string | null
}

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// 15-min increments from 7:00 to 21:00 
const timeOptions: string[] = []
for (let m = 7 * 60; m <= 21 * 60; m += 15) {
  timeOptions.push(
    `${Math.floor(m / 60).toString().padStart(2, "0")}:${(m % 60).toString().padStart(2, "0")}`
  )
}

export default function RecurringBreakDialog({ open, onClose, onSave, error }: RecurringBreakDialogProps) {
  const [days, setDays] = useState<number[]>([])
  const [start, setStart] = useState("12:00")
  const [end, setEnd] = useState("13:00")

  useEffect(() => {
    if (open) {
      setDays([])
      setStart("12:00")
      setEnd("13:00")
    }
  }, [open])

  function toggleDay(d: number) {
    setDays(days.includes(d) ? days.filter((x) => x !== d) : [...days, d])
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="[width:calc(100%-32px)] [max-width:440px] [padding:28px] [gap:0] [border-radius:16px]">
        <DialogHeader className="[padding-bottom:20px] [border-bottom:1px_solid_#efede8] [margin-bottom:24px]">
          <DialogTitle className="[font-size:18px] [font-weight:600] [color:#111821]">Add Recurring Break</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col [gap:20px]">
          <div className="flex flex-col [gap:8px]">
            <p className="[font-size:13px] [font-weight:600] [color:#303b46]">Repeats on</p>
            <div className="flex flex-wrap [gap:8px]">
              {dayLabels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleDay(i)}
                  className={`[height:40px] [min-width:48px] [padding:0_12px] [border-radius:8px] [font-size:13px] [font-weight:600] cursor-pointer ${
                    days.includes(i)
                      ? "[background:#b98a4a] [color:#111821] [border:1px_solid_#b98a4a]"
                      : "[background:#ffffff] [color:#303b46] [border:1px_solid_#dcd6cb]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex [gap:16px]">
            <div className="flex flex-col [gap:8px] flex-1">
              <label htmlFor="break-start" className="[font-size:13px] [font-weight:600] [color:#303b46]">Start</label>
              <select
                id="break-start"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="[height:44px] [border:1px_solid_#dcd6cb] [border-radius:8px] [padding:0_12px] [font-size:14px] [color:#111821] [background:#ffffff]"
              >
                {timeOptions.map((t) => <option key={t} value={t}>{formatTime(t)}</option>)}
              </select>
            </div>
            <div className="flex flex-col [gap:8px] flex-1">
              <label htmlFor="break-end" className="[font-size:13px] [font-weight:600] [color:#303b46]">End</label>
              <select
                id="break-end"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="[height:44px] [border:1px_solid_#dcd6cb] [border-radius:8px] [padding:0_12px] [font-size:14px] [color:#111821] [background:#ffffff]"
              >
                {timeOptions.map((t) => <option key={t} value={t}>{formatTime(t)}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="[font-size:13px] [color:#e05c5c]">{error}</p>}
        </div>

        <DialogFooter className="flex [flex-direction:row] [justify-content:flex-end] [gap:12px] [margin-top:28px] [padding-top:20px] [border-top:1px_solid_#efede8]">
          <Button onClick={onClose} className="bg-[#dee2e6] text-[#111821] hover:bg-[#adb5bd] rounded-none [padding:12px_24px]">
            Cancel
          </Button>
          <Button
            onClick={() => onSave({ days, start, end })}
            disabled={days.length === 0}
            className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:12px_24px]"
          >
            Add Break
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
