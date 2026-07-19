"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function AdminPage() {
  return (
    <main className="">
      <section id="hero" className="flex flex-col items-center text-center [padding:60px_24px]">
        <h1>Current Bookings</h1>
        <p>Booksy style ui goes here</p>
      </section>

      <section id="hero" className="flex flex-col items-center text-center [padding:60px_24px]">
        <h1>Edit Availability</h1>
        <Link href="/availability"><Button className="bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px]">Edit Availability</Button></Link>
      </section>
    </main>
  )
}