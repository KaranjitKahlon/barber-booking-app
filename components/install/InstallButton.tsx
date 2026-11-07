"use client"

import { useState } from "react"
import { SquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInstall } from "@/components/install/InstallProvider"
import InstallInstructionsDialog from "@/components/install/InstallInstructionsDialog"

export default function InstallButton({ variant = "card" }: { variant?: "card" | "link" }) {
  const { ready, isStandalone, platform, canPromptNatively, inAppBrowser, promptInstall } = useInstall()
  const [open, setOpen] = useState(false)

  if (!ready || isStandalone) return null
  if (platform === "other" && !canPromptNatively) return null

  async function handleClick() {
    if (canPromptNatively && !inAppBrowser) {
      await promptInstall()
      return
    }
    setOpen(true)
  }

  return (
    <>
      {variant === "card" ? (
        <div className="[width:100%] [max-width:320px] [border-radius:16px] [border:1px_solid_#303944] [background:#111821] [padding:20px] [text-align:left] [margin-top:24px] [margin-left:auto] [margin-right:auto]">
          <p className="[font-size:15px] [font-weight:600] [color:#ffffff]">Add JSL Barber to your Home Screen</p>
          <p className="[font-size:13px] [color:#adb5bd] [margin-top:6px]">Open it like an app and book faster next time.</p>
          <Button
            onClick={handleClick}
            className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-md [padding:12px_24px] [margin-top:16px] [width:100%]"
          >
            Add to Home Screen
          </Button>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="flex items-center [gap:8px] [background:none] [border:none] [color:#b98a4a] [font-size:13px] [font-weight:600] cursor-pointer"
        >
          <SquarePlus size={16} />
          Add to Home Screen
        </button>
      )}

      <InstallInstructionsDialog open={open} onClose={() => setOpen(false)} platform={platform} inAppBrowser={inAppBrowser} />
    </>
  )
}
