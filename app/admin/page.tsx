"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/AdminSidebar"
import { Home, CalendarDays, LogOut } from "lucide-react"

export default function AdminPage() {
  return (
    <SidebarProvider>
      <div className="flex [width:100%]">
        <AdminSidebar />
        <main className="flex-1 [padding:24px]">

          {/* mobile action bar */}
          <section className="md:hidden flex items-center justify-around [background:#111821] [padding:12px_16px] [border-radius:12px] [margin-bottom:24px]">
            <a href="/" className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px]">
              <Home size={20} />
              <span>Home</span>
            </a>
            <a href="/availability" className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px]">
              <CalendarDays size={20} />
              <span>Availability</span>
            </a>
            <button className="flex flex-col items-center [gap:4px] [color:#ffffff] [font-size:11px] [background:none] [border:none] cursor-pointer">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </section>

          <section className="[margin-bottom:32px]">
            <p className="[font-size:11px] [font-weight:600] [letter-spacing:0.15em] [color:#b98a4a] [text-transform:uppercase]">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
            <h2 className="[font-size:28px] [font-weight:600] [margin-top:8px]">Good morning, JSL</h2>
            <p className="[font-size:14px] [color:#7c858e] [margin-top:8px]">Here's what's happening at your shop today.</p>
          </section>

          <section className="grid [grid-template-columns:repeat(1,1fr)] md:[grid-template-columns:repeat(3,1fr)] [gap:16px] [margin-bottom:32px]">
            <article className="[border-radius:12px] [border:1px_solid_#e3ddd3] [background:#ffffff] [padding:24px]">
              <p className="[font-size:13px] [font-weight:500] [color:#737d87]">Today's Appointments</p>
              <strong className="[font-size:32px] [font-weight:600] [color:#1f2933] [display:block] [margin-top:16px]">0</strong>
            </article>
            <article className="[border-radius:12px] [border:1px_solid_#e3ddd3] [background:#ffffff] [padding:24px]">
              <p className="[font-size:13px] [font-weight:500] [color:#737d87]">This Week</p>
              <strong className="[font-size:32px] [font-weight:600] [color:#1f2933] [display:block] [margin-top:16px]">0</strong>
            </article>
            <article className="[border-radius:12px] [border:1px_solid_#e3ddd3] [background:#ffffff] [padding:24px]">
              <p className="[font-size:13px] [font-weight:500] [color:#737d87]">Open Slots Today</p>
              <strong className="[font-size:32px] [font-weight:600] [color:#1f2933] [display:block] [margin-top:16px]">0</strong>
            </article>
          </section>

          <div className="flex flex-col md:flex-row [gap:24px]">

            <div className="[flex:1.8]">
              <section className="[border-radius:16px] [border:1px_solid_#e3ddd3] [background:#ffffff] [overflow:hidden]">

                <div className="[padding:24px_32px] [border-bottom:1px_solid_#efede8]">
                  <h2 className="[font-size:17px] [font-weight:600]">Today's Appointments</h2>
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
                  <article className="flex flex-col md:grid md:[grid-template-columns:100px_1fr_120px] [gap:12px] md:[gap:20px] [padding:20px_24px] md:[padding:20px_32px]">
                    <div className="flex items-center justify-between md:block">
                      <p className="[font-size:13px] [font-weight:600] [color:#26323d]">9:00 AM</p>
                      <span className="md:hidden [background:#eaf2ec] [color:#4f7a60] [font-size:10px] [font-weight:600] [padding:6px_12px] [border-radius:999px]">Confirmed</span>
                    </div>
                    <div>
                      <p className="[font-size:13px] [font-weight:600] [color:#303b46]">John Doe</p>
                      <p className="[font-size:11px] [color:#89919a] [margin-top:4px]">Haircut (45 min)</p>
                    </div>
                    <div className="hidden md:block [text-align:right]">
                      <span className="[background:#eaf2ec] [color:#4f7a60] [font-size:10px] [font-weight:600] [padding:6px_12px] [border-radius:999px]">Confirmed</span>
                    </div>
                  </article>
                </div>

              </section>
            </div>

            <div className="[flex:1] flex flex-col [gap:24px]">

              <section className="[border-radius:16px] [border:1px_solid_#e3ddd3] [background:#ffffff] [padding:24px]">
                <h2 className="[font-size:16px] [font-weight:600]">Today at a Glance</h2>
                <p className="[font-size:12px] [color:#89919a] [margin-top:6px]">Shop activity</p>
              </section>

              <section className="[border-radius:16px] [border:1px_solid_#e3ddd3] [background:#ffffff] [padding:24px]">
                <h2 className="[font-size:16px] [font-weight:600]">Upcoming Schedule</h2>
                <p className="[font-size:12px] [color:#89919a] [margin-top:6px]">This week</p>
              </section>

            </div>

          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
