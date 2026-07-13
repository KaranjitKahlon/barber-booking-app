"use client"

import { useState, useEffect } from "react";
import LoginCard from "@/components/LoginCard"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
    return (
        <main className="flex flex-col items-center justify-center [min-height:100vh] [padding:24px]">
            <LoginCard />
        </main>
    )
}