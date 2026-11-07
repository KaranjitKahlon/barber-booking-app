"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

type Platform = "ios" | "android" | "other"

type InstallState = {
  ready: boolean
  isStandalone: boolean
  platform: Platform
  canPromptNatively: boolean
  inAppBrowser: boolean
  promptInstall: () => Promise<"accepted" | "dismissed" | "unavailable">
}

const InstallContext = createContext<InstallState | null>(null)

export function useInstall() {
  const ctx = useContext(InstallContext)
  if (!ctx) throw new Error("useInstall must be used inside InstallProvider")
  return ctx
}

export default function InstallProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [platform, setPlatform] = useState<Platform>("other")
  const [inAppBrowser, setInAppBrowser] = useState(false)
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null)

  useEffect(() => {
    const ua = navigator.userAgent
    const iPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1

    setPlatform(/iPhone|iPad|iPod/.test(ua) || iPadOS ? "ios" : /Android/.test(ua) ? "android" : "other")
    setInAppBrowser(/Instagram|FBAN|FBAV/i.test(ua))

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    setIsStandalone(standalone)
    setReady(true)

    const onPrompt = (e: Event) => {
      e.preventDefault()
      setDeferred(e as InstallPromptEvent)
    }
    const onInstalled = () => {
      setDeferred(null)
      setIsStandalone(true)
    }

    window.addEventListener("beforeinstallprompt", onPrompt)
    window.addEventListener("appinstalled", onInstalled)
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt)
      window.removeEventListener("appinstalled", onInstalled)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (!deferred) return "unavailable" as const
    await deferred.prompt()
    const { outcome } = await deferred.userChoice
    setDeferred(null)   // the browser only allows each event to be used once
    return outcome
  }, [deferred])

  return (
    <InstallContext.Provider
      value={{ ready, isStandalone, platform, canPromptNatively: !!deferred, inAppBrowser, promptInstall }}
    >
      {children}
    </InstallContext.Provider>
  )
}
