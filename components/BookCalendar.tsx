"use client"

import { Calendar } from "@/components/ui/calendar"

type BookCalendarProps = {
  className?: string
  selected?: Date | null
  onSelect?: (date: Date | undefined) => void
}

export default function BookCalendar( { className, selected, onSelect } : BookCalendarProps) {
  return <Calendar mode="single" className={`rounded-lg border [padding:16px] ${className}`} selected={selected ?? undefined} onSelect={onSelect} />
}