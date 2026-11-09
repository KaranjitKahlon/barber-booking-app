"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useInstall } from "@/components/install/InstallProvider"

const FLAG = "jsl-launch-handled"

function uncover() {
  document.documentElement.removeAttribute("data-launching")
}

export default function LaunchRedirect() {
  const { ready, isStandalone } = useInstall()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!ready) return
    if (!isStandalone) { uncover(); return }

    let first = true
    try {
      first = !sessionStorage.getItem(FLAG)
      sessionStorage.setItem(FLAG, "1")
    } catch {}

    if (!first || pathname !== "/") { uncover(); return }

    ;(async () => {
      const { data } = await supabase.rpc("is_admin")
      if (data === true) router.replace("/admin")
      else uncover()
    })()
  }, [ready, isStandalone, pathname, router])

  // once the route has changed, the cover can fade out
  useEffect(() => {
    if (pathname !== "/") uncover()
  }, [pathname])

  return null
}
