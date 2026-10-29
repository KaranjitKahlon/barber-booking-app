"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CalendarDays, LayoutDashboard, LogOut, Scissors, Sidebar } from "lucide-react";
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import ServiceDialog from "@/components/ServiceDialog"

type Service = {
  id: string
  title: string
  description: string
  price: number
  duration_minutes: number
}

export default function ServicesAndPricingPage() {
    const [services, setServices] = useState<Service[]>([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [serviceError, setServiceError] = useState<string | null>(null)

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

    async function handleSave(data: Omit<Service, "id">) {
        setServiceError(null)

        if (selectedService) {
            const { data: updated, error } = await supabase
                .from("services")
                .update(data)
                .eq("id", selectedService.id)
                .select()

            if (error || !updated || updated.length === 0) {
                setServiceError("Failed to save changes.")
            } else {
                setServices(services.map((s) => s.id === selectedService.id ? { ...s, ...data } : s))
                setDialogOpen(false)
                setSelectedService(null)
            }
        } else {
            const newId = data.title.toLowerCase().replace(/\s+/g, "-")

            const { data: inserted, error } = await supabase
                .from("services")
                .insert([{ id: newId, ...data }])
                .select()

            if (error || !inserted || inserted.length === 0) {
                setServiceError("Failed to add service.")
            } else {
                setServices([...services, { id: newId, ...data }])
                setDialogOpen(false)
            }
        }
    }

    async function handleDelete(id: string) {
        if (!window.confirm("Delete this service? Existing bookings will not be affected.")) return

        const { data: deleted, error } = await supabase
            .from("services")
            .delete()
            .eq("id", id)
            .select()

        if (error || !deleted || deleted.length === 0) {
            console.error("Delete failed", error)
        } else {
            setServices(services.filter((s) => s.id !== id))
        }
    }

    return (
        <SidebarProvider>
            <AdminSidebar />
            <div className="flex [width:100%]">
                <main className="flex-1 [padding:24px]">
                    <section className="md:hidden flex items-center justify-around [background:#111821] [padding:12px_16px] [margin-bottom:24px]">
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
                               <Button
                                onClick={() => { setSelectedService(service); setDialogOpen(true) }}
                                className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:8px_16px] [font-size:12px]"
                                >
                                Edit
                                </Button>
                            </div>
                            <div className="">
                                <button
                                onClick={() => handleDelete(service.id)}
                                className="[font-size:12px] [color:#e05c5c] hover:[color:#c0392b] [background:none] [border:none] cursor-pointer [font-weight:600]"
                                >
                                Delete
                                </button>
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

                    <section>
                        <div className="[padding:24px_32px] flex items-center justify-between">
                            <Button
                            onClick={() => { setSelectedService(null); setDialogOpen(true) }}
                            className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:8px_16px] [font-size:12px]"
                            >
                            + Add Service
                            </Button>
                        </div>
                    </section>
                </main>
            </div>

             <ServiceDialog
                open={dialogOpen}
                onClose={() => { setDialogOpen(false); setSelectedService(null); setServiceError(null) }}
                onSave={handleSave}
                service={selectedService}
                error={serviceError}
            />
        </SidebarProvider>
    )
}
