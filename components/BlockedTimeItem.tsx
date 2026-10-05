

type BlockedTimeItemProps = {
  id: number
  date: string
  allDay: boolean
  start: string | null
  end: string | null
  onDelete: (id: number) => void
}

export default function BlockedTimeItem({ id, date, allDay, start, end, onDelete }: BlockedTimeItemProps) {
  return (
    <div className="flex items-center justify-between [padding:16px_32px] [border-bottom:1px_solid_#f0eee9]">
      <div>
        <p className="[font-size:14px] [font-weight:600] [color:#303b46]">{date}</p>
        <p className="[font-size:12px] [color:#89919a] [margin-top:4px]">
          {allDay ? "Unavailable all day" : `${start} – ${end}`}
        </p>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="[font-size:12px] [color:#e05c5c] hover:[color:#c0392b] [background:none] [border:none] cursor-pointer [font-weight:600]">
        Delete
      </button>
    </div>
  )
}
