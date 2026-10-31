"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/AdminSidebar"
import { Home, CalendarDays, LogOut, Scissors, LayoutDashboard } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { toLocalDateString } from "@/lib/dates"
import { formatTime } from "@/lib/timeSlots"

type Booking = {
  id: string
  service_id: string
  date: string
  start_time: string
  end_time: string | null
  name: string
}

export default function AdminPage() {
  const [weekBookings, setWeekBookings] = useState<Booking[]>([])
  const [serviceNames, setServiceNames] = useState<Record<string, string>>({})
  const today = toLocalDateString(new Date())

  useEffect(() => {
    async function loadDashboard() {
      const now = new Date()
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - now.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)

      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("id, service_id, date, start_time, end_time, name")
        .gte("date", toLocalDateString(weekStart))
        .lte("date", toLocalDateString(weekEnd))
        .order("date")
        .order("start_time")

      if (error) console.error(error)
      else setWeekBookings(bookings)

      const { data: services } = await supabase
        .from("services")
        .select("id, title")

      if (services) {
        setServiceNames(Object.fromEntries(services.map((s) => [s.id, s.title])))
      }
    }
    loadDashboard()
  }, [])

  const todayBookings = weekBookings.filter((b) => b.date === today)

  const upcomingBookings = weekBookings.filter((b) => b.date > today)

  const upcomingByDay = upcomingBookings.reduce<Record<string, Booking[]>>((groups, b) => {
    if (!groups[b.date]) groups[b.date] = []
    groups[b.date].push(b)
    return groups
  }, {})

  return (
    <SidebarProvider>
      <div className="flex [width:100%]">
        <AdminSidebar />
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

          <section className="[margin-bottom:32px]">
            <p className="[font-size:11px] [font-weight:600] [letter-spacing:0.15em] [color:#b98a4a] [text-transform:uppercase]">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
            <h2 className="[font-size:28px] [font-weight:600] [margin-top:8px]">Welcome Back, Jay</h2>
            <p className="[font-size:14px] [color:#7c858e] [margin-top:8px]">Here's what's happening at your shop today.</p>
          </section>

          <section className="grid [grid-template-columns:repeat(1,1fr)] md:[grid-template-columns:repeat(3,1fr)] [gap:16px] [margin-bottom:32px]">
            <article className="[border-radius:12px] [border:1px_solid_#e3ddd3] [background:#ffffff] [padding:24px]">
              <p className="[font-size:13px] [font-weight:500] [color:#737d87]">Today's Appointments</p>
              <strong className="[font-size:32px] [font-weight:600] [color:#1f2933] [display:block] [margin-top:16px]">{todayBookings.length}</strong>
            </article>
            <article className="[border-radius:12px] [border:1px_solid_#e3ddd3] [background:#ffffff] [padding:24px]">
              <p className="[font-size:13px] [font-weight:500] [color:#737d87]">This Week</p>
              <strong className="[font-size:32px] [font-weight:600] [color:#1f2933] [display:block] [margin-top:16px]">{weekBookings.length}</strong>
            </article>
            <article className="[border-radius:12px] [border:1px_solid_#e3ddd3] [background:#ffffff] [padding:24px]">
              <p className="[font-size:13px] [font-weight:500] [color:#737d87]">Open Slots Today</p>
              <strong className="[font-size:32px] [font-weight:600] [color:#1f2933] [display:block] [margin-top:16px]">12</strong>
            </article>
          </section>

          <div className="flex flex-col md:flex-row [gap:24px]">

            <div className="[flex:1.8]">
              <section className="[border-radius:16px] [border:1px_solid_#e3ddd3] [background:#ffffff] [overflow:hidden]">

                <div className="[padding:24px_32px] [border-bottom:1px_solid_#efede8]">
                  <h2 className="[color:#000000] [font-size:17px] [font-weight:600]">Today's Appointments</h2>
                  <p className="[font-size:12px] [color:#89919a] [margin-top:6px]">
                    {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </p>
                </div>

                <div className="hidden md:grid [grid-template-columns:100px_1fr_120px] [gap:20px] [background:#fcfbf9] [padding:14px_32px] [border-bottom:1px_solid_#efede8]">
                  <span className="[font-size:10px] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.1em] [color:#969da4]">Time</span>
                  <span className="[font-size:10px] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.1em] [color:#969da4]">Client & Service</span>
                  <span className="[font-size:10px] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.1em] [color:#969da4] [text-align:right]">Status</span>
                </div>

                <div className="divide-y [border-color:#f0eee9]">
                  {todayBookings.map((b) => (
                    <article
                      key={b.id}
                      className="flex flex-col md:grid md:[grid-template-columns:100px_1fr_120px] [gap:12px] md:[gap:20px] [padding:20px_24px] md:[padding:20px_32px]"
                    >
                      <div className="flex items-center justify-between md:block">
                        <div>
                          <p className="[font-size:13px] [font-weight:600] [color:#26323d]">
                            {formatTime(b.start_time.slice(0, 5))}
                          </p>
                          {b.end_time && (
                            <p className="[font-size:11px] [color:#959ca2] [margin-top:4px]">
                              to {formatTime(b.end_time.slice(0, 5))}
                            </p>
                          )}
                        </div>
                        <span className="md:hidden [background:#eaf2ec] [color:#4f7a60] [font-size:10px] [font-weight:600] [padding:6px_12px] [border-radius:999px]">
                          Confirmed
                        </span>
                      </div>
                      <div>
                        <p className="[font-size:13px] [font-weight:600] [color:#303b46]">{b.name}</p>
                        <p className="[font-size:11px] [color:#89919a] [margin-top:4px]">
                          {serviceNames[b.service_id] ?? "Deleted service"}
                        </p>
                      </div>
                      <div className="hidden md:block [text-align:right]">
                        <span className="[background:#eaf2ec] [color:#4f7a60] [font-size:10px] [font-weight:600] [padding:6px_12px] [border-radius:999px]">
                          Confirmed
                        </span>
                      </div>
                    </article>
                  ))}

                  {todayBookings.length === 0 && (
                    <div className="[padding:40px_32px] [text-align:center]">
                      <p className="[font-size:14px] [color:#89919a]">No appointments today.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="[flex:1] flex flex-col [gap:24px]">

              <section className="[border-radius:16px] [border:1px_solid_#e3ddd3] [background:#ffffff] [padding:24px]">
                <h2 className="[color:#000000] [font-size:16px] [font-weight:600]">Today at a Glance</h2>
                <p className="[font-size:12px] [color:#89919a] [margin-top:6px]">Shop activity</p>
              </section>

              <section className="[border-radius:16px] [border:1px_solid_#e3ddd3] [background:#ffffff] [padding:24px]">
                <h2 className="[color:#000000] [font-size:16px] [font-weight:600]">Upcoming Schedule</h2>
                <p className="[font-size:12px] [color:#89919a] [margin-top:6px]">Rest of this week</p>
                <div className="[margin-top:16px] flex flex-col [gap:16px]">
                  {Object.entries(upcomingByDay).map(([date, bookings]) => (
                    <div key={date}>
                      <p className="[font-size:11px] [font-weight:600] [letter-spacing:0.1em] [text-transform:uppercase] [color:#b98a4a]">
                        {new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                      </p>
                      <div className="[margin-top:8px] flex flex-col [gap:6px]">
                        {bookings.map((b) => (
                          <div key={b.id} className="flex items-center justify-between">
                            <span className="[font-size:13px] [color:#303b46]">{b.name}</span>
                            <span className="[font-size:12px] [color:#89919a]">{formatTime(b.start_time.slice(0, 5))}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {upcomingBookings.length === 0 && (
                    <p className="[font-size:13px] [color:#89919a]">No more appointments this week.</p>
                  )}
                </div>
              </section>

            </div>

          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
