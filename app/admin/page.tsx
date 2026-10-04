"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Scissors,
  Settings2,
  UsersRound,
} from "lucide-react"

const appointments = [
  { time: "9:00 AM", end: "9:45 AM", name: "Marcus Johnson", service: "Signature haircut", barber: "James", price: "$38", status: "Confirmed", initials: "MJ", color: "bg-[#e7d8c2] text-[#75552e]" },
  { time: "10:00 AM", end: "10:30 AM", name: "Ethan Williams", service: "Beard trim", barber: "James", price: "$22", status: "Confirmed", initials: "EW", color: "bg-[#d7e0e5] text-[#425866]" },
  { time: "11:00 AM", end: "12:00 PM", name: "Andre Thompson", service: "Haircut + beard", barber: "You", price: "$55", status: "Checked in", initials: "AT", color: "bg-[#e8d9d4] text-[#805448]" },
  { time: "12:30 PM", end: "1:15 PM", name: "Noah Martinez", service: "Signature haircut", barber: "You", price: "$38", status: "Confirmed", initials: "NM", color: "bg-[#d9e3d7] text-[#4d674c]" },
  { time: "2:00 PM", end: "2:30 PM", name: "Caleb Anderson", service: "Beard trim", barber: "James", price: "$22", status: "Pending", initials: "CA", color: "bg-[#e4dff0] text-[#62547e]" },
  { time: "3:00 PM", end: "4:00 PM", name: "Isaiah Brown", service: "Haircut + beard", barber: "You", price: "$55", status: "Confirmed", initials: "IB", color: "bg-[#efe0c9] text-[#876535]" },
]

const week = [
  { day: "Mon", date: "12", count: 8 },
  { day: "Tue", date: "13", count: 6 },
  { day: "Wed", date: "14", count: 9 },
  { day: "Thu", date: "15", count: 7 },
  { day: "Fri", date: "16", count: 11 },
  { day: "Sat", date: "17", count: 14 },
  { day: "Sun", date: "18", count: 0 },
]

const stats = [
  { label: "Appointments today", value: "8", detail: "2 more than yesterday", up: true, icon: CalendarDays },
  { label: "Expected revenue", value: "$326", detail: "From 8 appointments", up: true, icon: ArrowUpRight },
  { label: "New clients", value: "3", detail: "This week", up: false, icon: UsersRound },
]

export default function AdminPage() {
  const [activeFilter, setActiveFilter] = useState("All")
  const filters = ["All", "Confirmed", "Pending", "Checked in"]
  const visibleAppointments = activeFilter === "All" ? appointments : appointments.filter((appointment) => appointment.status === activeFilter)

  return (
    <main className="min-h-screen bg-[#f5f3ef] text-[#202a34]">
      <div className="mx-auto flex min-h-screen max-w-full">
        <aside className="hidden w-[238px] shrink-0 flex-col bg-[#111821] px-6 py-9 text-white/60 lg:flex">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.17em] bg-transparent text-[#ffffff] ml-[8px]">Manage</p>
          <nav aria-label="Business settings" className="space-y-[16px] ml-[16px]">
            <a href="#appointments" className="flex min-h-12 items-center gap-3 rounded-lg px-4 text-sm mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.17em] bg-transparent text-[#ffffff]"><Clock3 size={17} /> Appointments</a>
            <Link href="/availability" className="flex min-h-12 items-center gap-3 rounded-lg px-4 text-sm mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.17em] bg-transparent text-[#ffffff]"><Settings2 size={17} /> Availability</Link>
            <Link href="/availability" className="flex min-h-12 items-center gap-3 rounded-lg px-4 text-sm mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.17em] bg-transparent text-[#ffffff]"><Scissors size={17} /> Home Page</Link>
          </nav>
        </aside>

        <div className="min-w-0 flex-1 ml-[18px]">
          <header className="border-b border-[#e7e2d9] bg-[#fbfaf8]">

            <div className="flex h-[68px] items-center justify-between px-[24px] sm:h-[74px] sm:px-[40px]">

              <Link
                href="/"
                className="flex items-center gap-[10px] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b98a4a] lg:hidden"
              >
                <span className="grid size-[32px] place-items-center rounded-lg bg-[#111821] text-[#d5aa6b]">
                  <Scissors size={16} />
                </span>

                <span className="text-xs font-semibold tracking-[0.12em]">
                  JSL Barber
                </span>
              </Link>

              <div className="hidden items-center gap-[8px] text-sm text-[#87909a] lg:flex">
                <span>Workspace</span>
                <ChevronRight size={15} />
                <span className="font-medium text-[#273443]">
                  Overview
                </span>
              </div>

              <div className="flex items-center gap-[16px] sm:gap-[24px]">

                <span className="hidden text-xs text-[#818a93] md:inline">
                  Saturday, October 17, 2026
                </span>

                <span className="h-[24px] w-px bg-[#e7e3dc]" />

                <span className="grid size-[36px] place-items-center rounded-full bg-[#111821] text-[11px] font-semibold text-white">
                  JD
                </span>

                <span className="hidden text-sm font-medium sm:block">
                  James Davis
                </span>

              </div>

            </div>

            <nav
              aria-label="Mobile admin navigation"
              className="flex items-stretch gap-[4px] overflow-x-auto border-t border-[#efede8] px-[12px] py-[8px] lg:hidden"
            >

              <a
                href="#dashboard"
                className="flex min-h-[40px] shrink-0 items-center gap-[8px] rounded-lg bg-[#111821] px-[12px] text-xs font-medium text-white"
              >
                <CalendarDays size={15} />
                Overview
              </a>

              <a
                href="#appointments"
                className="flex min-h-[40px] shrink-0 items-center gap-[8px] rounded-lg px-[12px] text-xs font-medium text-[#606b75] transition-colors hover:bg-[#f1eee8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b98a4a]"
              >
                <Clock3 size={15} />
                Appointments
              </a>

              <Link
                href="/availability"
                className="flex min-h-[40px] shrink-0 items-center gap-[8px] rounded-lg px-[12px] text-xs font-medium text-[#606b75] transition-colors hover:bg-[#f1eee8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b98a4a]"
              >
                <Settings2 size={15} />
                Availability
              </Link>

            </nav>

          </header>

          <div id="dashboard" className="mx-auto max-w-[1360px] px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
            <div className="mb-9 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
              <div><p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9b723d]">Saturday, October 17, 2026</p><h1 className="text-[28px] font-semibold leading-tight tracking-[-0.035em] text-[#202a34] sm:text-[35px]">Good morning, James</h1><p className="mt-2 text-sm text-[#7c858e]">Here’s what’s happening at your shop today.</p></div>
            </div>

            <section aria-label="Business summary" className="mb-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {stats.map(({ label, value, detail, up, icon: Icon }) => <article key={label} className="rounded-xl border border-[#e3ddd3] bg-white p-6 shadow-[0_3px_9px_rgba(31,41,55,0.04)] sm:p-7"><div className="flex items-start justify-between gap-3"><span className="pt-1 text-[13px] font-medium text-[#737d87]">{label}</span><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#f5f0e8] text-[#9b723d]"><Icon size={16} /></span></div><div className="mt-5 flex flex-wrap items-end justify-between gap-x-3 gap-y-1.5"><strong className="text-[32px] font-semibold leading-none tracking-[-0.04em] text-[#1f2933]">{value}</strong><span className={`inline-flex items-center gap-1 text-[11px] ${up ? "text-[#56836c]" : "text-[#7b858f]"}`}>{up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{detail}</span></div></article>)}
            </section>

            <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.8fr)_minmax(285px,0.76fr)]">
              <section id="appointments" className="min-w-0 overflow-hidden rounded-2xl border border-[#ded8cd] bg-white shadow-[0_4px_14px_rgba(31,41,55,0.045)]">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#efede8] px-5 py-6 sm:px-8 sm:py-7">
                  <div><div className="flex flex-wrap items-center gap-3"><h2 className="text-[17px] font-semibold tracking-[-0.01em]">Today’s appointments</h2><span className="rounded-full bg-[#f4f1ec] px-2.5 py-1 text-[10px] font-semibold text-[#737b82]">8 scheduled</span></div><p className="mt-1.5 text-xs text-[#89919a]">Saturday, October 17</p></div>
                  <span className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#e8e3da] px-3 text-xs font-medium text-[#626d77]"><CalendarDays size={14} /> Today</span>
                </div>
                <div className="flex gap-2 overflow-x-auto border-b border-[#efede8] px-5 py-3 sm:px-8">{filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter} className={`min-h-10 shrink-0 rounded-lg px-3.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b98a4a] ${activeFilter === filter ? "bg-[#111821] text-white" : "text-[#78818a] hover:bg-[#f5f3ef] hover:text-[#34404b]"}`}>{filter}</button>)}</div>
                <div className="hidden grid-cols-[92px_minmax(0,1fr)_88px_72px_108px] gap-5 bg-[#fcfbf9] px-8 py-3.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#969da4] sm:grid"><span>Time</span><span>Client & service</span><span>Barber</span><span>Price</span><span className="text-right">Status</span></div>
                <div className="divide-y divide-[#f0eee9]">
                  {visibleAppointments.map((appointment) => <article key={appointment.time} className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 px-5 py-[18px] sm:grid-cols-[92px_minmax(0,1fr)_88px_72px_108px] sm:gap-5 sm:px-8 sm:py-5">
                    <div className="row-span-2 self-center sm:row-span-1"><p className="text-[13px] font-semibold tracking-[0.01em] text-[#26323d] sm:text-sm">{appointment.time}</p><p className="mt-2 text-[10px] text-[#959ca2] sm:text-[11px]">to {appointment.end}</p></div>
                    <div className="flex min-w-0 items-center gap-3.5 sm:gap-4"><span className={`grid size-11 shrink-0 place-items-center rounded-full text-[10px] font-semibold ${appointment.color}`}>{appointment.initials}</span><span className="min-w-0"><span className="block truncate text-[13px] font-semibold leading-5 text-[#303b46] sm:text-sm">{appointment.name}</span><span className="mt-1 block truncate text-[11px] text-[#89919a] sm:text-xs">{appointment.service}</span></span></div>
                    <span className="col-start-2 text-[10px] text-[#89919a] sm:col-auto sm:text-xs sm:text-[#737d87]">{appointment.barber === "You" ? "You" : appointment.barber}</span>
                    <span className="col-start-3 row-start-1 self-center text-right text-[13px] font-semibold text-[#35404b] sm:col-auto sm:row-auto sm:text-left">{appointment.price}</span>
                    <span className={`col-start-3 row-start-2 justify-self-end rounded-full px-3.5 py-1.5 text-[10px] font-semibold sm:col-auto sm:row-auto ${appointment.status === "Confirmed" ? "bg-[#eaf2ec] text-[#4f7a60]" : appointment.status === "Pending" ? "bg-[#fbf2df] text-[#92702f]" : "bg-[#f0eee9] text-[#686f75]"}`}>{appointment.status}</span>
                  </article>)}
                  {visibleAppointments.length === 0 && <p className="px-6 py-10 text-center text-sm text-[#89919a]">No {activeFilter.toLowerCase()} appointments today.</p>}
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-[#efede8] bg-[#fcfbf9] px-4 py-3.5 sm:px-5"><span className="text-[11px] text-[#8a929a]">Showing {visibleAppointments.length} of 8 appointments</span><span className="text-[11px] font-medium text-[#727b83]">Updated just now</span></div>
              </section>

              <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-1">
                <section className="rounded-xl border border-[#e7e2d9] bg-white p-6 shadow-[0_2px_7px_rgba(31,41,55,0.025)] sm:p-7">
                  <div className="mb-6"><h2 className="text-base font-semibold">Upcoming schedule</h2><p className="mt-1.5 text-xs text-[#89919a]">October 12 – 18, 2026</p></div>
                  <div className="mb-6 grid grid-cols-7 gap-1.5">{week.map(({ day, date, count }) => <div key={day} className={`flex min-w-0 flex-col items-center gap-2 rounded-lg py-3 ${date === "17" ? "bg-[#f5f0e8]" : ""}`}><span className="text-[10px] text-[#969da4]">{day}</span><span className={`grid size-8 place-items-center rounded-full text-[11px] ${date === "17" ? "bg-[#111821] font-semibold text-white" : "text-[#56616c]"}`}>{date}</span><span className="text-[9px] leading-none text-[#a27b48]">{count || "–"}</span></div>)}</div>
                  <div className="flex items-center justify-between border-t border-[#efede8] pt-3"><span className="text-xs text-[#818a93]">Bookings this week</span><strong className="text-sm font-semibold">55</strong></div>
                </section>

                <section className="rounded-xl border border-[#e7e2d9] bg-white p-6 shadow-[0_2px_7px_rgba(31,41,55,0.025)] sm:p-7">
                  <div className="mb-6 flex items-start justify-between"><div><h2 className="text-base font-semibold">Today at a glance</h2><p className="mt-1.5 text-xs text-[#89919a]">Shop activity</p></div><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#f5f0e8] text-[#9b723d]"><Clock3 size={16} /></span></div>
                  <div className="space-y-5"><div className="flex items-center justify-between gap-2"><span className="text-xs text-[#77818a]">Completed</span><span className="flex items-center gap-1.5 text-xs font-semibold text-[#4f7a60]"><Check size={14} /> 3 appointments</span></div><div className="h-px bg-[#efede8]" /><div className="flex items-center justify-between gap-2"><span className="text-xs text-[#77818a]">Next appointment</span><span className="text-xs font-semibold text-[#4d5964]">10:00 AM</span></div><div className="h-px bg-[#efede8]" /><div className="flex items-center justify-between gap-2"><span className="text-xs text-[#77818a]">Open slots</span><span className="text-xs font-semibold text-[#4d5964]">4 available</span></div></div>
                  <Link href="/availability" className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#ded7cb] px-4 text-xs font-semibold text-[#35404b] transition-colors hover:border-[#b98a4a] hover:bg-[#faf7f1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b98a4a]"><Settings2 size={15} className="text-[#9b723d]" /> Manage availability</Link>
                </section>
              </div>
            </div>
            <footer className="py-6 text-center text-[10px] text-[#9ba1a5]">Fresh Cuts Studio <span className="mx-1.5">·</span> Admin dashboard</footer>
          </div>
        </div>
      </div>
    </main>
  )
}
