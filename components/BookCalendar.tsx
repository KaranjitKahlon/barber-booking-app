"use client"

import { Calendar } from "@/components/ui/calendar"

type BookCalendarProps = {
    className?: string
    selected?: Date | null
    onSelect?: (date: Date | undefined) => void
    disabled?: (date: Date) => boolean
    blockedDates?: string[]
    closedDays?: number[]
}

export default function BookCalendar({
    className,
    selected,
    onSelect,
    blockedDates = [],
    closedDays = [],
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

                return date < today || blockedDates.includes(dateString) || closedDays.includes(date.getDay())
            }}
            mode="single"
            className={`w-full max-w-[380px] rounded-2xl border border-white/10 bg-[#111821] [padding:20px] shadow-lg ${className ?? ""}`}
            selected={selected ?? undefined}
            onSelect={onSelect}
            classNames={{
                months: "relative flex w-full flex-col",
                month: "w-full flex flex-col [gap:20px]",

                month_caption:
                    "relative flex h-10 w-full items-center justify-center text-white font-semibold [font-size:18px]",

                //nav: "absolute inset-x-0 top-0 flex items-center justify-between",

                button_previous:
                    "size-9 rounded-xl text-white hover:bg-white/10 hover:text-white",

                button_next:
                    "size-9 rounded-xl text-white hover:bg-white/10 hover:text-white",

                weekdays: "flex w-full",

                weekday:
                    "flex-1 text-center text-[#9ca3af] font-medium [font-size:12px]",

                week: "flex w-full [margin-top:8px]",

                day: "flex-1 aspect-square text-center p-0",

                day_button:
                    "mx-auto flex size-[38px] items-center justify-center rounded-full text-white [font-size:14px] hover:bg-white/10 hover:text-white transition-colors data-[selected-single=true]:bg-[#b98a4a] data-[selected-single=true]:text-[#111821] data-[selected-single=true]:font-bold",

                today:
                    "text-[#b98a4a] font-bold",

                disabled:
                    "text-white/25 opacity-40",

                outside:
                    "text-white/20 opacity-30",

                hidden: "invisible",
            }}
        />
    )
}
