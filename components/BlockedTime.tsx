

import BlockedTimeItem from "@/components/BlockedTimeItem"
import { Button } from "@/components/ui/button"

type BlockedTimeEntry = {
  id: number
  date: string
  allDay: boolean
  start: string | null
  end: string | null
}

type BlockedTimeProps = {
  blockedTimes: BlockedTimeEntry[]
  onDelete: (id: number) => void
  onAdd: () => void
}

export default function BlockedTime({ blockedTimes, onDelete, onAdd }: BlockedTimeProps) {
  return (
    <section className="[border-radius:16px] [border:1px_solid_#e3ddd3] [background:#ffffff] [overflow:hidden] [margin-top:32px]">
      <div className="[padding:24px_32px] [border-bottom:1px_solid_#efede8] flex items-center justify-between">
        <div>
          <h2 className="[color:#000000] [font-size:17px] [font-weight:600]">Blocked Time</h2>
          <p className="[font-size:12px] [color:#89919a] [margin-top:6px]">Temporarily prevent customers from booking during specific dates or times.</p>
        </div>
        <Button onClick={onAdd} className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:10px_20px]">
          + Block Time
        </Button>
      </div>

      {blockedTimes.length === 0 ? (
        <div className="[padding:40px_32px] [text-align:center]">
          <p className="[font-size:14px] [color:#89919a]">No blocked times. Your normal schedule applies.</p>
        </div>
      ) : (
        <div>
          {blockedTimes.map((item) => (
            <BlockedTimeItem
              key={item.id}
              {...item}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}
