
import Link from "next/link"
import {
  Home,
  Scissors,
  CalendarPlus,
} from "lucide-react"

export default function CustomerBottomNav() {
  return (
    <nav className="fixed [bottom:0] [left:0] [right:0] [z-index:50] grid [grid-template-columns:1fr_1fr_1fr] items-center border-t border-[#303944] bg-[#111821] [padding:10px_16px_calc(32px_+_env(safe-area-inset-bottom))] md:hidden">

      {/* Home */}
      <Link
        href="/"
        className="flex flex-col items-center justify-center [gap:4px] text-[#ffffff] [font-size:11px] no-underline"
      >
        <Home size={22} strokeWidth={1.8} />
        <span>Home</span>
      </Link>

      {/* Book */}
      <Link
        href="/booking"
        className="flex flex-col items-center justify-center [gap:4px] text-[#B98A4A] [font-size:11px] font-semibold no-underline"
      >
        <div className="flex items-center justify-center bg-[#B98A4A] text-[#111821] [width:46px] [height:42px] [border-radius:12px]">
            <CalendarPlus size={23} strokeWidth={2} />
        </div>
        <span>Book</span>
      </Link>

      {/* Services */}
      <Link
        href="/#services"
        className="flex flex-col items-center justify-center [gap:4px] text-[#ffffff] [font-size:11px] no-underline"
      >
        <Scissors size={22} strokeWidth={1.8} />
        <span>Services</span>
      </Link>

    </nav>
  )
}
