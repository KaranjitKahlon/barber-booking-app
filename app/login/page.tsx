"use client"

import CustomerBottomNav from "@/components/CustomerBottomNav"
import LoginCard from "@/components/LoginCard"

export default function LoginPage() {
    return (
        <main className="flex flex-col items-center justify-center [min-height:100vh] [padding:24px]">
            <div className="relative [top:-200px] w-full flex justify-center">
                <LoginCard />
            </div>

            <CustomerBottomNav />
        </main>
    )
}
