"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useInstall } from "@/components/install/InstallProvider"

const FLAG = "jsl-launch-handled"

export default function LaunchRedirect() {
  const { ready, isStandalone } = useInstall()
  const pathname = usePathname()
  const router = useRouter()
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (!ready || !isStandalone) return

    // this runs only on the first load of app
    let first = true
    try {
      first = !sessionStorage.getItem(FLAG)
      sessionStorage.setItem(FLAG, "1")
    } catch {}
    if (!first || pathname !== "/") return

    setChecking(true)
    ;(async () => {
      const { data } = await supabase.rpc("is_admin")
      if (data === true) router.replace("/admin")
      else setChecking(false)
    })()
  }, [ready, isStandalone, pathname, router])

  // prevent flashing while checking for admin status
  if (!checking || pathname !== "/") return null
  return <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#111821" }} />
}
