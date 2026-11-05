"use client"

import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import Image from "next/image";
import { Separator } from "@/components/ui/separator"
import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import CustomerBottomNav from "@/components/CustomerBottomNav";
import { CalendarIcon } from "lucide-react";




export default function Home() {
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
          async function fetchServices() {
              const {data, error } = await supabase.from('services').select('*')
              console.log("Fetched services:", data, error)
              if (error) {
                  console.error(error)
              } else {
                  setServices(data)
              }
          }
          fetchServices()
      }, [])
      
  return (
    <main className="">
      <section id="hero" className="[padding:24px_16px_32px]">
        <div className="mx-auto flex w-full max-w-[480px] min-w-0 box-border flex-col items-center rounded-2xl border border-white/10 bg-[#111821]/90 text-center [padding:32px_24px] shadow-lg">

          <p className="mb-3 text-[#b98a4a] [font-size:12px] font-semibold uppercase tracking-[2px]">
            JSL Barber
          </p>

          <h1 className="font-bold text-white [font-size:30px]">
            Get Fresh Cuts
          </h1>

          <h2 className="mt-2 max-w-[280px] text-white/65 [font-size:15px]">
            Book your appointment with ease and style.
          </h2>

          <Link href="/booking" className="mt-7 w-full">
            <Button className="flex min-h-[50px] w-full items-center justify-center [gap:8px] rounded-xl bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] [font-size:15px] font-semibold cursor-pointer">
              <CalendarIcon size={18} />
              <span>Book Now</span>
            </Button>
          </Link>

        </div>
      </section>

      <section id="hours-location" className="flex flex-col items-center text-center [padding:60px_24px]">
        <h1>Hours & Location</h1>
        <h2>Business Hours</h2>
        <p className="mt-4 max-w-[600px]">Monday - Friday: 9:00 AM - 5:00 PM</p>
        <p className="mt-2 max-w-[600px]">Saturday: 9:00 AM - 3:00 PM</p>
        <p className="mt-2 max-w-[600px]">Sunday: Closed</p>
        <p className="mt-2 max-w-[600px]">1005 E Pescadero Ave #155, Tracy, CA 95304</p>
      </section>
        
      <section id="about" className="flex flex-col items-center text-center [padding:60px_24px]">
        <h1>About</h1>
        <h2>Discover the story behind our barbering expertise.</h2>
        <p className="mt-4 max-w-[600px]">At Fresh Cuts, we are passionate about delivering top-notch grooming experiences. Our skilled barbers combine artistry and precision to ensure you leave looking and feeling your best. With a commitment to quality and customer satisfaction, we strive to create a welcoming environment for all our clients.</p>
        <a href="https://www.instagram.com/jsl_barber" target="_blank" rel="noopener noreferrer">
          <Image src="/instagramiconwhite.png" alt="Instagram" width={32} height={32} />
        </a>
      </section>
      <CustomerBottomNav />
    </main>
  );
}
