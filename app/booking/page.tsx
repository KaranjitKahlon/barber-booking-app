"use client"

import { useState } from "react";
import BookCalendar from "@/components/BookCalendar";
import InputBasic from "@/components/InputBasic";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";

/*testing git commit*/

export default function BookingPage() {
    const [step, setStep] = useState(1) /* for progressive booking steps*/
    const services = [
        { id: "haircutWithBeard", title: "Haircut With Beard (1 hr)", description: "Professional hair cutting service", price: "45.00" }, /*id's for each service*/
        { id: "haircut", title: "Haircut (45 min)", description: "Clean fade with precise blending", price: "40.00" },
        { id: "beardShapeUp", title: "Beard Shape Up (20 min)", description: "Shape and trim your beard", price: "25.00" }
    ]
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [date, setDate] = useState<Date | null>(null)
    const [time, setTime] = useState<string | null>(null)

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
                <BookCalendar className="[transform:scale(1.4)] [margin-top:32px]" selected={date} onSelect={(d) => setDate(d ?? null)} />
                <div className="flex flex-row md:flex-row [gap:24px] mt-8 [margin-top:32px]">
                    <Button onClick={() => setStep(1)} className="bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:32px]">Back</Button>
                    <Button onClick={() => setStep(3)} className="bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:32px]">Continue</Button>
                </div>
            </section>
            )}

            {step === 3 && (
                <section className="flex flex-col items-center text-center [padding:60px_24px]">
                <h2>Enter Name for the Appointment</h2>
                <InputBasic />
                <div className="flex flex-row md:flex-row [gap:24px] mt-8 [margin-top:32px]">
                    <Button onClick={() => setStep(2)} className="bg-[#dee2e6] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:24px]">Back</Button>
                    <Button className="bg-[#80ed99] text-white hover:bg-[#adb5bd] rounded-none [padding:14px_32px] [margin-top:24px]">Confirm</Button>
                </div>
            </section>
            )}

        </main>
    )
}