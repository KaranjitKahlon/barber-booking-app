
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

type DaySchedule = {
  day: string
  isOpen: boolean
  start: string
  end: string
}

type WeeklyScheduleProps = {
  schedule: DaySchedule[]
  onChange: (schedule: DaySchedule[]) => void
  onSave: () => void
}

export default function WeeklySchedule({ schedule, onChange, onSave }: WeeklyScheduleProps) {
  function toggleDay(index: number) {
    const updated = [...schedule]
    updated[index] = { ...updated[index], isOpen: !updated[index].isOpen }
    onChange(updated)
  }

  return (
    <section className="[border-radius:16px] [border:1px_solid_#e3ddd3] [background:#ffffff] [overflow:hidden] [margin-top:32px]">
      <div className="[padding:24px_32px] [border-bottom:1px_solid_#efede8]">
        <h2 className="[color:#000000] [font-size:17px] [font-weight:600]">Weekly Schedule</h2>
        <p className="[font-size:12px] [color:#89919a] [margin-top:6px]">Your normal business hours. Customers can book during these times by default.</p>
      </div>

      <div className="divide-y [border-color:#f0eee9]">
        {schedule.map((day, index) => (
          <div key={day.day} className="[color:#000000] flex items-center justify-between [padding:16px_32px]">
            <div className="flex items-center [gap:16px]">
              <Switch checked={day.isOpen} onCheckedChange={() => toggleDay(index)} />
              <span className="[font-size:14px] [font-weight:500] [min-width:100px]">{day.day}</span>
            </div>
            {day.isOpen ? (
              <span className="[font-size:13px] [color:#737d87]">{day.start} – {day.end}</span>
            ) : (
              <span className="[font-size:13px] [color:#adb5bd]">Closed</span>
            )}
          </div>
        ))}
      </div>

      <div className="[padding:24px_32px] [border-top:1px_solid_#efede8]">
        <Button onClick={onSave} className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:14px_32px] [margin-top:32px]">
          Save Schedule
        </Button>
      </div>
    </section>
  )
}
