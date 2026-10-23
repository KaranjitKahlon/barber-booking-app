"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CalendarDays, LayoutDashboard, LogOut, Scissors, Sidebar } from "lucide-react";
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

type Service = {
  id: string
  title: string
  description: string
  price: number
  duration_minutes: number
}

export default function ServicesAndPricingPage() {
    const [services, setServices] = useState<Service[]>([])

    useEffect(() => {
        async function fetchServices() {
            const { data, error } = await supabase
                .from("services")
                .select("*")
            
            if (error) {
                console.error(error)
            } else {
                setServices(data)
            }
        }
        fetchServices()
    }, [])

    return (
        <SidebarProvider>
            <AdminSidebar />
            <div className="flex [width:100%]">
                <main className="flex-1 [padding:24px]">
                    <section className="md:hidden flex items-center justify-around [background:#111821] [padding:12px_16px] [margin-bottom:24px] [position:sticky] [top:0] [z-index:40]">
                        <a href="/admin" className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px]">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                        </a>
                        <a href="/availability" className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px]">
                        <CalendarDays size={20} />
                        <span>Availability</span>
                        </a>
                        <a href="/pricingAndServices" className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px]">
                        <Scissors size={20} />
                        <span>Edit Services</span>
                        </a>
                        <button 
                        onClick={async () => {
                            await supabase.auth.signOut()
                            window.location.href = "/login"
                        }}
                        className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px] [background:none] [border:none] cursor-pointer underline"
                        >
                        <LogOut size={20} />
                        <span>Logout</span>
                        </button>
                    </section>

                    <p className="[font-size:11px] [font-weight:600] [letter-spacing:0.15em] [color:#b98a4a] [text-transform:uppercase]">
                        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    </p>
                    <h1 className="[font-size:28px] [font-weight:600] [margin-top:8px]">Services & Pricing</h1>
                    <p className="[font-size:14px] [color:#7c858e] [margin-top:8px]">Edit your service offerings, descriptions, and pricing.</p>

                    {/* services list */}
                    <section className="[border-radius:16px] [border:1px_solid_#e3ddd3] [background:#ffffff] [overflow:hidden] [margin-top:32px]">

                        <div className="[padding:24px_32px] [border-bottom:1px_solid_#efede8] flex items-center justify-between">
                        <div>
                            <h2 className="[color:#000000] [font-size:17px] [font-weight:600]">Services</h2>
                            <p className="[font-size:12px] [color:#89919a] [margin-top:6px]">Manage your service offerings and pricing.</p>
                        </div>
                        </div>

                        {/* column headers */}
                        <div className="hidden md:grid [grid-template-columns:1fr_120px_100px_80px] [gap:20px] [background:#fcfbf9] [padding:14px_32px] [border-bottom:1px_solid_#efede8]">
                        <span className="[font-size:10px] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.1em] [color:#969da4]">Service</span>
                        <span className="[font-size:10px] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.1em] [color:#969da4]">Duration</span>
                        <span className="[font-size:10px] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.1em] [color:#969da4]">Price</span>
                        <span className="[font-size:10px] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.1em] [color:#969da4] [text-align:right]">Edit</span>
                        </div>

                        {/* service rows */}
                        <div className="divide-y [border-color:#f0eee9]">
                        {services.map((service) => (
                            <article key={service.id} className="flex flex-col md:grid md:[grid-template-columns:1fr_120px_100px_80px] [gap:12px] md:[gap:20px] [padding:20px_24px] md:[padding:20px_32px] items-center">
                            <div>
                                <p className="[font-size:13px] [font-weight:600] [color:#303b46]">{service.title}</p>
                                <p className="[font-size:11px] [color:#89919a] [margin-top:4px]">{service.description}</p>
                            </div>
                            <p className="[font-size:13px] [color:#737d87]">{service.duration_minutes} min</p>
                            <p className="[font-size:13px] [font-weight:600] [color:#303b46]">${service.price}</p>
                            <div className="md:[text-align:right]">
                                <Button className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:8px_16px] [font-size:12px]">
                                Edit
                                </Button>
                            </div>
                            </article>
                        ))}

                        {services.length === 0 && (
                            <div className="[padding:40px_32px] [text-align:center]">
                            <p className="[font-size:14px] [color:#89919a]">No services found.</p>
                            </div>
                        )}
                        </div>

                    </section>
                </main>
            </div>
        </SidebarProvider>
    )
}
