"use client"

import { Calendar } from "@/components/ui/calendar"

type BookCalendarProps = {
  className?: string
  selected?: Date | null
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
}

export default function BookCalendar( { className, selected, onSelect } : BookCalendarProps) {
  return <Calendar 
  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} 
  mode="single" 
  className={`rounded-lg border [padding:16px] ${className}`} 
  selected={selected ?? undefined} 
  onSelect={onSelect}
  classNames={{
  day_button: "text-[#111821] [&[data-selected-single=true]]:bg-[#b98a4a] [&[data-selected-single=true]]:text-[#111821] hover:bg-[#dee2e6] hover:text-[#111821]",
  today: "bg-[#dee2e6] text-[#111821] rounded-md",
  }}
  />
}