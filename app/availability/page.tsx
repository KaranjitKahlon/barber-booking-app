"use client"


import BookCalendar from "@/components/BookCalendar"
import { useState } from "react";

export default function AvailabilityPage() {
    const [date, setDate] = useState<Date | null>(null)
    const [time, setTime] = useState<string | null>(null)
    return (
        <main className="">
            <section id="hero" className="flex flex-col items-center text-center [padding:60px_24px]">
                <h1>Edit Availability</h1>
                <BookCalendar className="[transform:scale(1.4)] [margin-top:32px]" selected={date} onSelect={(d) => { setDate(d ?? null); setTime(null); }} />
            </section>
        </main>
    )
}