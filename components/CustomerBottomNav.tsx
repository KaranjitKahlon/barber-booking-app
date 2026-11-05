

import Link from "next/link"
import {
  Home,
  Scissors,
  CalendarPlus,
  Menu,
} from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function CustomerBottomNav() {
  return (
    <nav className="fixed [bottom:0] [left:0] [right:0] [z-index:50] grid [grid-template-columns:repeat(4,minmax(0,1fr))] items-center border-t border-[#303944] bg-[#111821] [padding:10px_12px_calc(10px_+_env(safe-area-inset-bottom))] md:hidden">

      {/* Home */}
      <Link
        href="/"
        className="flex flex-col items-center justify-center [gap:4px] text-[#ffffff] [font-size:11px]"
      >
        <Home size={22} strokeWidth={1.8} />
        <span>Home</span>
      </Link>

      {/* Services */}
      <Link
        href="/#services"
        className="flex flex-col items-center justify-center [gap:4px] text-[#ffffff] [font-size:11px]"
      >
        <Scissors size={22} strokeWidth={1.8} />
        <span>Services</span>
      </Link>

      {/* Book */}
      <Link
        href="/booking"
        className="flex flex-col items-center justify-center [gap:4px] text-[#B98A4A] [font-size:11px] font-semibold"
      >
        <CalendarPlus size={22} strokeWidth={2} />
        <span>Book</span>
      </Link>

      {/* More */}
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex flex-col items-center justify-center [gap:4px] [background:none] [border:none] text-[#ffffff] [font-size:11px] cursor-pointer"
          >
            <Menu size={22} strokeWidth={1.8} />
            <span>More</span>
          </button>
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="bg-[#111821] border-t border-[#303944] text-[#ffffff] [padding:24px] [padding-bottom:calc(24px_+_env(safe-area-inset-bottom))]"
        >
          <SheetHeader>
            <SheetTitle className="text-[#B98A4A]">More</SheetTitle>
          </SheetHeader>

          <div className="mt-4 flex flex-col gap-2">
            <SheetClose asChild>
              <Link
                href="/#hours-location"
                className="rounded-md text-sm text-[#ffffff] hover:bg-[#26313d] transition-colors [padding:14px_16px]"
              >
                Hours & Location
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/#about"
                className="rounded-md text-sm text-[#ffffff] hover:bg-[#26313d] transition-colors [padding:14px_16px]"
              >
                About
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                href="/login"
                className="rounded-md text-sm text-[#ffffff] hover:bg-[#26313d] transition-colors [padding:14px_16px]"
              >
                Barber Login
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

    </nav>
  )
}
