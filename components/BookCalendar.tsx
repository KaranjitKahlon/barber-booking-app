"use client"

import { Calendar } from "@/components/ui/calendar"



export default function BookCalendar( { className} : { className?: string }) {
  return <Calendar mode="single" className={`rounded-lg border ${className}`} />
}