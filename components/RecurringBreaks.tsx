

import { Button } from "@/components/ui/button"
import { formatTime } from "@/lib/timeSlots"

type BreakEntry = {
  id: string
  day: number
  start: string
  end: string
}

type RecurringBreaksProps = {
  breaks: BreakEntry[]
  onAdd: () => void
  onDelete: (id: string) => void
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function RecurringBreaks({ breaks, onAdd, onDelete }: RecurringBreaksProps) {
  return (
    <section className="[border-radius:16px] [border:1px_solid_#e3ddd3] [background:#ffffff] [overflow:hidden] [margin-top:32px]">
      <div className="[padding:24px_32px] [border-bottom:1px_solid_#efede8] flex items-center justify-between [gap:16px]">
        <div>
          <h2 className="[color:#000000] [font-size:17px] [font-weight:600]">Recurring Breaks</h2>
          <p className="[font-size:12px] [color:#89919a] [margin-top:6px]">
            A weekly break, like lunch. Customers can't book over it. Appointments already booked aren't affected.
          </p>
        </div>
        <Button onClick={onAdd} className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:10px_20px] [flex-shrink:0]">
          + Add Break
        </Button>
      </div>

      {breaks.length === 0 ? (
        <div className="[padding:40px_32px] [text-align:center]">
          <p className="[font-size:14px] [color:#89919a]">No recurring breaks. Your full working hours are bookable.</p>
        </div>
      ) : (
        <div>
          {breaks.map((b) => (
            <div key={b.id} className="flex items-center justify-between [padding:16px_32px] [border-bottom:1px_solid_#f0eee9]">
              <div>
                <p className="[font-size:14px] [font-weight:600] [color:#303b46]">{dayNames[b.day]}</p>
                <p className="[font-size:12px] [color:#89919a] [margin-top:4px]">
                  {formatTime(b.start.slice(0, 5))} – {formatTime(b.end.slice(0, 5))}
                </p>
              </div>
              <button
                onClick={() => onDelete(b.id)}
                className="[font-size:12px] [color:#e05c5c] hover:[color:#c0392b] [background:none] [border:none] cursor-pointer [font-weight:600]"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
