"use client"

import { useState, useEffect } from "react";
import BookCalendar from "@/components/BookCalendar";
import InputBasic from "@/components/InputBasic";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import ConfirmAnimation from "@/components/ConfirmAnimation"
import Link from "next/link"
import { supabase } from "@/lib/supabase";
import { getAvailableSlots } from "@/lib/availability"
import { formatTime } from "@/lib/timeSlots";


export default function BookingPage() {
    const [step, setStep] = useState(1) /* for progressive booking steps*/
    const [services, setServices] = useState<any[]>([])
    
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [date, setDate] = useState<Date | null>(null)
    const [time, setTime] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)
    const [availableSlots, setAvailableSlots] = useState<string[]>([])
    const [blockedDates, setBlockedDates] = useState<string[]>([])

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

    useEffect(() => {
        async function fetchBlockedDates() {
            const { data, error } = await supabase
                .from("availability_exceptions")
                .select("date")
                .eq("all_day", true)

            if (error) {
                console.error("Error fetching fully blocked dates: ", error)
                return
            }

            setBlockedDates(data.map((row) => row.date))
        }
        fetchBlockedDates()
    }, [])

    useEffect(() => {
            if (!date || !selectedService) return

            async function fetchSlots() {
                const slots = await getAvailableSlots(date!, selectedService!)
                setAvailableSlots(slots)
            }
            fetchSlots()
            }, [date, selectedService])

    async function handleConfirm(): Promise<boolean> {
        if (!date || !selectedService || !time || !name) return false

        const { data: serviceData, error: serviceError } = await supabase
            .from("services")
            .select("duration_minutes")
            .eq("id", selectedService)
            .single()

        if (serviceError || !serviceData) {
            console.error("Error fetching service duration:", serviceError)
            return false
        }

        const [hour, minute] = time.split(":").map(Number)
        const endMinutes = hour * 60 + minute + serviceData.duration_minutes
        const endTime =
            `${Math.floor(endMinutes / 60).toString().padStart(2, "0")}:` +
            `${(endMinutes % 60).toString().padStart(2, "0")}`

        const dateString =
            `${date.getFullYear()}-` +
            `${(date.getMonth() + 1).toString().padStart(2, "0")}-` +
            `${date.getDate().toString().padStart(2, "0")}`

        const { error } = await supabase.from("bookings").insert([
            {
                service_id: selectedService,
                date: dateString,        // was `date`, which sent a full timestamp
                start_time: time,
                end_time: endTime,
                name: name,
            },
        ])

        if (error) {
            console.error(error)
            return false
        }

        return true
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
                <Button onClick={() => setStep(2)} disabled={!selectedService} className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:14px_32px] [margin-top:32px] cursor-pointer">Continue</Button>
            </section>
            )}

            {step === 2 && (
                <section className="flex flex-col items-center text-center [padding:60px_24px]">
                <h2>Choose Date and Time</h2>
                <BookCalendar className="[transform:scale(1.4)] [margin-top:32px]" selected={date} blockedDates={blockedDates} onSelect={(d) => { setDate(d ?? null); setTime(null); }} />
                
                {date && (
                    <div className="w-full [max-width:600px] [margin-top:70px]">
                        <h3 className="mb-4 text-left text-sm font-medium text-[#dee2e6]">
                            Available Times
                        </h3>

                        <div className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            <div className="flex w-max [gap:12px] [padding-bottom:8px]">
                                {availableSlots.map((slot) => (
                                    <Button
                                        key={slot}
                                        onClick={() => setTime(slot)}
                                        className={`shrink-0 rounded-none [min-width:100px] [padding:12px_16px] text-sm ${
                                            time === slot
                                                ? "bg-[#b98a4a] text-[#111821] hover:bg-[#cda064]"
                                                : "bg-[#dee2e6] text-[#111821] hover:bg-[#adb5bd]"
                                        }`}
                                    >
                                        {formatTime(slot)}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-row md:flex-row [gap:24px] mt-8 [margin-top:32px]">
                    <Button onClick={() => { setStep(1); setDate(null); setTime(null); }} className="bg-[#dee2e6] text-[#111821] hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:32px]">Back</Button>
                    <Button onClick={() => setStep(3)} disabled={!time} className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:14px_32px] [margin-top:32px]">Continue</Button>
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
                    <Button onClick={() => { setStep(2); setName(null); }} className="bg-[#dee2e6] text-[#111821] hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:24px]">Back</Button>
                    <Button
                        className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:14px_32px] [margin-top:24px]"
                        disabled={!name}
                        onClick={async () => {
                            const success = await handleConfirm()
                            if (success) {
                                setStep(4)
                            }
                        }}
                    >
                        Confirm
                    </Button>
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
                        at {time && formatTime(time)}
                    </p>
                    <Link href="/"><Button className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:14px_32px] [margin-top:32px]">Return Home</Button></Link>
                </section>
            )}

        </main>
    )
}
