"use client"

import { supabase } from "@/lib/supabase"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

type AdminSidebarProps = {
  showReturnToDashboard?: boolean
}

export function AdminSidebar({
    showReturnToDashboard = false,
}: AdminSidebarProps) {
  return (
        <Sidebar className="[width:250px]">
        <SidebarHeader>
            <div className="[padding:16px]">
                <h2 className="[font-size:18px] [font-weight:700]">JSL Barber</h2>
            </div>
        </SidebarHeader>

        <SidebarContent className="[flex:1]">
            <h3 className="[padding:16px] [font-size:16px] [font-weight:600]">Admin Dashboard</h3>
            <SidebarGroup />

                <a href="/admin" className="[padding:16px] [font-size:14px] [font-weight:400] text-[#ffffff] hover:bg-[#adb5bd] transition-colors">
                    Dashboard
                </a>
                <a href="/availability" className="[padding:16px] [font-size:14px] [font-weight:400] text-[#ffffff] hover:bg-[#adb5bd] transition-colors">
                    Manage Availability
                </a>
                <a href="/pricingAndServices" className="[padding:16px] [font-size:14px] [font-weight:400] text-[#ffffff] hover:bg-[#adb5bd] transition-colors">
                    Edit Services
                </a>
            
            <Button
            onClick={async () => {
                await supabase.auth.signOut()
                window.location.href = "/login"
            }}
            className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:14px_32px] [margin:64px] cursor-pointer"
            >
            Logout
            </Button>
            <SidebarGroup />
        </SidebarContent>
        </Sidebar>
  )
}
