"use client"

import { useState, useEffect } from "react";
import BookCalendar from "@/components/BookCalendar";
import InputBasic from "@/components/InputBasic";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import ConfirmAnimation from "@/components/ConfirmAnimation"
import Link from "next/link"
import { supabase } from "@/lib/supabase";


export default function BookingPage() {
    const [step, setStep] = useState(1) /* for progressive booking steps*/
    const [services, setServices] = useState<any[]>([])
    
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [date, setDate] = useState<Date | null>(null)
    const [time, setTime] = useState<string | null>(null)
    const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]
    const [name, setName] = useState<string | null>(null)

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


    async function handleConfirm() {
        const { data, error } = await supabase
            .from("bookings")
            .insert([
                {
                    service_id: selectedService,
                    date: date,
                    time: time,
                    name: name
                }
            ])
        if (error) {
            console.error(error)
        } else {
            console.log("Booking Saved!", data)
        }
    }

    return (
        <main className="">
            {step === 1 && (
                <section className="flex flex-col items-center text-center [padding:60px_24px]">
                <h1>Services</h1>
                <h2>Book your preferred service.</h2> { /*interpolated services so easier to append to db*/ }
                <div className="flex flex-col md:flex-row [gap:24px] mt-8">
                    {services.map((services) => (
                        <ServiceCard
                            key={services.id}
                            title={services.title}
                            description={services.description}
                            price={services.price}
                            onClick={() => setSelectedService(services.id)}
                            selectedService= {selectedService === services.id}
                        />
                    ))}
                </div>
                <Button onClick={() => setStep(2)} disabled={!selectedService} className="bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:32px] cursor-pointer">Continue</Button>
            </section>
            )}

            {step === 2 && (
                <section className="flex flex-col items-center text-center [padding:60px_24px]">
                <h2>Choose Date and Time</h2>
                <BookCalendar className="[transform:scale(1.4)] [margin-top:32px]" selected={date} onSelect={(d) => { setDate(d ?? null); setTime(null); }} />
                
                {date && (
                    <div className="flex flex-col flex-wrap md:flex-row [gap:12px] mt-8 [margin-top:72px]">
                        {timeSlots.map((slot) => (
                            <Button key={slot} onClick={() => setTime(slot)} className={`bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-full [padding:14px_32px] ${time === slot ? "bg-[#80ed99]" : ""}`}>
                                {slot}
                            </Button>
                        ))}
                    </div>
                )}

                <div className="flex flex-row md:flex-row [gap:24px] mt-8 [margin-top:32px]">
                    <Button onClick={() => { setStep(1); setDate(null); setTime(null); }} className="bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:32px]">Back</Button>
                    <Button onClick={() => setStep(3)} disabled={!time} className="bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:32px]">Continue</Button>
                </div>
            </section>
            )}

            {step === 3 && (
                <section className="flex flex-col items-center text-center [padding:60px_24px]">
                <h2>Enter Name for the Appointment</h2>
                <InputBasic 
                    value={name ?? ""}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="flex flex-row md:flex-row [gap:24px] mt-8 [margin-top:32px]">
                    <Button onClick={() => { setStep(2); setName(null); }} className="bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:24px]">Back</Button>
                    <Button disabled={!name} onClick={() => { setStep(4); handleConfirm(); }} className="bg-[#80ed99] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:24px]">Confirm</Button>
                </div>
            </section>
            )}

            {step === 4 && (
                <section className="flex flex-col items-center text-center [padding:60px_24px]">
                    <ConfirmAnimation />
                    <h2>Appointment Confirmed!</h2>
                    <p>
                        Your appointment has been confirmed for{" "}
                        {date?.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}{" "}
                        at {time}.
                    </p>
                    <Link href="/"><Button className="bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:32px]">Return Home</Button></Link>
                </section>
            )}

        </main>
    )
}