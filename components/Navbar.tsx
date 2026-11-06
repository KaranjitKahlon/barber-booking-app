
import Link from "next/link"
import { Menu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="fixed [top:0] [left:0] [right:0] [width:100%] [box-sizing:border-box] [z-index:50] flex items-center justify-between bg-[#111821] text-[#B98A4A] [height:72px] [padding:8px_16px] md:[height:auto] md:[opacity:0.9] md:[padding:16px_24px]">

      {/* Mobile branding */}
      <Link href="/" className="flex items-center [gap:16px] md:hidden">
        <Image
          src="/jslLogo.jpeg"
          alt="Barber-logo"
          width={44}
          height={44}
          className="rounded-full"
        />
        <Image
          src="/jslFullName.png"
          alt="Barber-Name"
          width={120}
          height={40}
          className="[height:36px] [width:auto] [transform:translateY(-3px)] object-contain"
        />
      </Link>

      {/* Desktop branding - original layout */}
      <Link href="/" className="hidden text-xl font-bold md:block">
        <Image
          src="/jslLogo.jpeg"
          alt="Barber-logo"
          width={60}
          height={60}
          className="rounded-full"
        />
      </Link>

      <Link href="/" className="hidden md:block">
        <Image
          src="/jslFullName.png"
          alt="Barber-Name"
          width={120}
          height={40}
          className="[height:60px] [width:auto] md:[height:100px] md:[margin-left:310px]"
        />
      </Link>

      {/* Desktop navbar */}
      <div className="hidden items-center md:flex">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="bg-transparent text-[#ffffff] hover:bg-transparent hover:text-inherit">
                <Link href="/#services">Services</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="bg-transparent text-[#ffffff] hover:bg-transparent hover:text-inherit">
                <Link href="/#hours-location" className="rounded-md text-sm font-semibold text-[#ffffff] hover:bg-[#adb5bd] transition-colors [padding:12px_24px]">Hours</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="bg-transparent text-[#ffffff] hover:bg-transparent hover:text-inherit [margin-right:24px]">
                <Link href="/#about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="bg-transparent text-[#ffffff] hover:bg-transparent hover:text-inherit [margin-right:24px]">
                <Link href="/login">Login</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className="bg-transparent text-[#ffffff] hover:bg-transparent hover:text-inherit">
                <Link href="/booking" className="no-underline"><Button className="flex items-center [gap:8px] bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-md [padding:14px_32px] cursor-pointer"> <CalendarIcon size={18} /> <span>Book Now</span> </Button></Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile navbar */}
      <div className="flex items-center md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open navigation menu"
              className="flex items-center justify-center [width:44px] [height:44px] rounded-xl border border-[#b98a4a]/60 bg-[#111821]/80 transition-colors hover:bg-[#b98a4a]/10 cursor-pointer"
            >
              <Menu size={23} strokeWidth={1.8} className="[stroke:#ffffff]" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="[top:0] [height:100dvh] w-[300px] border-l border-white/10 bg-[#111821] [padding:24px]"
          >
            <SheetHeader className="border-b border-white/10 [padding-bottom:20px]">
              <SheetTitle className="text-left [color:#ffffff] [font-size:20px] font-semibold">
                JSL Barber
              </SheetTitle>
              <p className="text-left [color:#ffffff] [font-size:13px]">
                Navigation
              </p>
            </SheetHeader>

            <div className="mt-7 flex flex-col [gap:8px]">

              <SheetClose asChild>
                <Link
                  href="/#services"
                  className="rounded-xl [color:#ffffff] no-underline text-[15px] font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white [padding:14px_16px]"
                >
                  Services
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/#hours-location"
                  className="rounded-xl [color:#ffffff] no-underline text-[15px] font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white [padding:14px_16px]"
                >
                  Hours & Location
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/#about"
                  className="rounded-xl [color:#ffffff] no-underline text-[15px] font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white [padding:14px_16px]"
                >
                  About
                </Link>
              </SheetClose>

              <div className="my-3 border-t border-white/10" />

              <SheetClose asChild>
                <Link
                  href="/login"
                  className="rounded-xl [color:#ffffff] no-underline text-[15px] font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white [padding:14px_16px]"
                >
                  Login
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  href="/booking"
                  className="no-underline mt-2 flex items-center justify-center rounded-xl bg-[#b98a4a] text-center text-[15px] font-semibold text-[#111821] transition-colors hover:bg-[#cda064] [padding:15px_16px]"
                >
                  Book Now
                </Link>
              </SheetClose>

            </div>
          </SheetContent>
        </Sheet>
      </div>

    </nav>
  )
}
