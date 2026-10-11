"use client"

import { Calendar } from "@/components/ui/calendar"

type BookCalendarProps = {
  className?: string
  selected?: Date | null
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  blockedDates?: string[]
}

export default function BookCalendar({
  className,
  selected,
  onSelect,
  blockedDates = [],
}: BookCalendarProps) {
  return (
    <Calendar
      disabled={(date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const dateString = [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, "0"),
          String(date.getDate()).padStart(2, "0"),
        ].join("-")

        return date < today || blockedDates.includes(dateString)
      }}
      mode="single"
      className={`rounded-lg border [padding:16px] ${className ?? ""}`}
      selected={selected ?? undefined}
      onSelect={onSelect}
      classNames={{
        day_button:
          "text-[#111821] [&[data-selected-single=true]]:bg-[#b98a4a] [&[data-selected-single=true]]:text-[#111821] hover:bg-[#dee2e6] hover:text-[#111821]",
        today: "bg-[#dee2e6] text-[#111821] rounded-md",
      }}
    />
  )
}
