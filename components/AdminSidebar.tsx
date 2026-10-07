"use client"

import { supabase } from "@/lib/supabase"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

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

            {showReturnToDashboard ? (
                <a
                    href="/admin"
                    className="[padding:16px] [font-size:14px] [font-weight:400] text-[#ffffff] hover:bg-[#adb5bd] transition-colors"
                >
                    Return to Dashboard
                </a>
                ) : (
                <a
                    href="/availability"
                    className="[padding:16px] [font-size:14px] [font-weight:400] text-[#ffffff] hover:bg-[#adb5bd] transition-colors"
                >
                    Manage Availability
                </a>
            )}
            
            <a
            onClick={async () => {
                await supabase.auth.signOut()
                window.location.href = "/login"
            }}
            className="[padding:16px] [font-size:14px] [font-weight:400] text-[#ffffff] hover:bg-[#adb5bd] transition-colors"
            >
            Logout
            </a>
            <SidebarGroup />
        </SidebarContent>
        </Sidebar>
  )
}
