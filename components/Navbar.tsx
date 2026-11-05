
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

export default function Navbar() {
  return (
    <nav className="fixed [top:0] [left:0] [right:0] [width:100%] [box-sizing:border-box] [z-index:50] flex items-center justify-between bg-[#111821] text-[#B98A4A] [height:72px] [padding:8px_16px] md:[height:auto] md:[opacity:0.9] md:[padding:16px_24px]">

      {/* Mobile branding */}
      <Link href="/" className="flex items-center gap-2 md:hidden">
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
          className="[height:36px] [width:auto]"
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
                <Link href="/booking">
                  <Button className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:14px_32px] cursor-pointer">
                    Book Now
                  </Button>
                </Link>
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
              className="flex items-center justify-center [width:44px] [height:44px] [background:none] [border:1px_solid_#B98A4A] [border-radius:10px] cursor-pointer"
            >
              <Menu size={24} strokeWidth={1.8} className="text-[#ffffff]" />
            </button>
          </SheetTrigger>

          <SheetContent side="right" className="[top:0] [height:100vh] bg-[#18211B] [opacity:0.9] [padding:24px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="mt-4 flex flex-col gap-4">
              <SheetClose asChild>
                <Link href="/#services" className="rounded-md text-sm font-semibold text-[#ffffff] hover:bg-[#adb5bd] transition-colors [padding:12px_24px]">Services</Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/#hours-location" className="rounded-md text-sm font-semibold text-[#ffffff] hover:bg-[#adb5bd] transition-colors [padding:12px_24px]">Hours</Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/#about" className="rounded-md text-sm font-semibold text-[#ffffff] hover:bg-[#adb5bd] transition-colors [padding:12px_24px]">About</Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/login" className="rounded-md text-sm font-semibold text-[#ffffff] hover:bg-[#adb5bd] transition-colors [padding:12px_24px]">Login</Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/booking" className="rounded-md text-sm font-semibold text-[#ffffff] hover:bg-[#adb5bd] transition-colors [padding:12px_24px]">Book Now</Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>

    </nav>
  )
}
