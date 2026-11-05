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

      <section id="services" className="[padding:24px_16px_32px]">
        <div className="mx-auto flex w-full max-w-[480px] min-w-0 box-border flex-col rounded-2xl border border-white/10 bg-[#111821]/90 [padding:28px_16px] shadow-lg">

          <div className="mb-6 text-left">
            <p className="mb-2 text-[#b98a4a] [font-size:12px] font-semibold uppercase tracking-[2px]">
              What we offer
            </p>

            <h1 className="text-white [font-size:24px] font-bold">
              Our Services
            </h1>

            <h2 className="mt-2 text-white/60 [font-size:14px]">
              Explore our range of premium barbering services.
            </h2>
          </div>

          <div className="flex flex-col items-center [gap:16px] md:flex-row md:flex-wrap md:justify-center">
            {services.map((services) => (
              <ServiceCard
                key={services.id}
                title={services.title}
                description={services.description}
                price={services.price}
              />
            ))}
          </div>

          <Link href="/booking" className="mt-7 w-full">
            <Button className="flex min-h-[48px] w-full items-center justify-center [gap:8px] rounded-xl bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] [font-size:15px] [margin-top:32px] font-semibold cursor-pointer">
              <CalendarIcon size={18} />
              <span>Book Now</span>
            </Button>
          </Link>

        </div>
      </section>

      <section id="hours-location" className="[padding:24px_16px_32px]">
        <div className="mx-auto flex w-full max-w-[480px] min-w-0 box-border flex-col rounded-2xl border border-white/10 bg-[#111821]/90 [padding:28px_16px] shadow-lg">

          <div className="mb-6">
            <p className="mb-2 text-[#b98a4a] [font-size:12px] font-semibold uppercase tracking-[2px]">
              Visit us
            </p>

            <h1 className="text-white [font-size:24px] font-bold">
              Hours & Location
            </h1>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] [padding:18px]">
            <h2 className="mb-4 text-white [font-size:16px] font-semibold">
              Business Hours
            </h2>

            <div className="flex flex-col [gap:12px] text-white/70 [font-size:14px]">
              <div className="flex justify-between [gap:12px]">
                <span>Monday - Friday</span>
                <span className="text-white">9:00 AM - 5:00 PM</span>
              </div>

              <div className="flex justify-between [gap:12px]">
                <span>Saturday</span>
                <span className="text-white">9:00 AM - 3:00 PM</span>
              </div>

              <div className="flex justify-between [gap:12px]">
                <span>Sunday</span>
                <span className="text-white">Closed</span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] [padding:18px]">
            <h2 className="mb-3 text-white [font-size:16px] font-semibold">
              Location
            </h2>

            <p className="text-white/70 [font-size:14px] leading-relaxed">
              1005 E Pescadero Ave #155, Tracy, CA 95304
            </p>
          </div>

        </div>
      </section>
        
      <section id="about" className="[padding:24px_16px_32px]">
        <div className="mx-auto flex w-full max-w-[480px] min-w-0 box-border flex-col rounded-2xl border border-white/10 bg-[#111821]/90 [padding:28px_20px] shadow-lg">

          <p className="mb-2 text-[#b98a4a] [font-size:12px] font-semibold uppercase tracking-[2px]">
            Our Story
          </p>

          <h1 className="text-white [font-size:24px] font-bold">
            About JSL Barber
          </h1>

          <p className="mt-4 text-white/70 [font-size:14px] leading-[1.8]">
            At Fresh Cuts, we are passionate about delivering top-notch grooming experiences. Our skilled barbers combine artistry and precision to ensure you leave looking and feeling your best. With a commitment to quality and customer satisfaction, we strive to create a welcoming environment for all our clients.
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 [padding-top:18px]">
            <span className="text-white/60 [font-size:13px]">
              Follow us on Instagram
            </span>

            <a
              href="https://www.instagram.com/jsl_barber"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] [padding:10px] transition-colors hover:bg-white/10"
            >
              <Image
                src="/instagramiconwhite.png"
                alt="Instagram"
                width={22}
                height={22}
              />
            </a>
          </div>

        </div>
      </section>
      <CustomerBottomNav />
    </main>
  );
}
