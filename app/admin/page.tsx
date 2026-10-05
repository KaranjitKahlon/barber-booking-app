"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/AdminSidebar"

export default function AdminPage() {
  return (
      <SidebarProvider>
      <div className="flex [width:100%]">
        <AdminSidebar />
        <main className="flex-1 [padding:24px]">
          <header className="flex items-center [padding-bottom:16px] md:hidden">
            <SidebarTrigger />
            <h2 className="[font-size:18px] [font-weight:700] [margin-left:16px]">Admin Dashboard</h2>
          </header>

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

          <section className="[border-radius:16px] [border:1px_solid_#e3ddd3] [background:#ffffff] [overflow:hidden]">
            <div className="[padding:24px_32px] [border-bottom:1px_solid_#efede8]">
              <h2 className="[font-size:17px] [font-weight:600]">Today's Appointments</h2>
              <p className="[font-size:12px] [color:#89919a] [margin-top:6px]">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
            </div>

            <div className="[padding:24px_32px]">
              <p className="[font-size:14px] [color:#89919a] [text-align:center] [padding:40px_0]">No appointments today.</p>
            </div>
          </section>
        </main>
      </div>
    </SidebarProvider>
  )
}
