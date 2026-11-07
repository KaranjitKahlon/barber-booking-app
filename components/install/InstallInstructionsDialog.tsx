"use client"

import type { ReactNode } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Share, SquarePlus, Check } from "lucide-react"

type Props = {
  open: boolean
  onClose: () => void
  platform: "ios" | "android" | "other"
  inAppBrowser: boolean
}

function Step({ n, icon, children }: { n: number; icon?: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start [gap:12px]">
      <span className="grid place-items-center [width:28px] [height:28px] [flex-shrink:0] [border-radius:999px] [background:#b98a4a] [color:#111821] [font-size:13px] [font-weight:700]">
        {n}
      </span>
      <span className="[font-size:14px] [line-height:1.5] [color:#e9ecef] [padding-top:3px]">
        {children} {icon}
      </span>
    </li>
  )
}

export default function InstallInstructionsDialog({ open, onClose, platform, inAppBrowser }: Props) {
  const mode = inAppBrowser ? "inapp" : platform === "ios" ? "ios" : "android"

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="[background:#111821] [color:#ffffff] [border:1px_solid_#303944] [width:calc(100%-32px)] [max-width:400px] [padding:24px] [border-radius:16px]">
        <DialogHeader className="[margin-bottom:16px]">
          <DialogTitle className="[font-size:18px] [font-weight:600] [color:#ffffff]">
            {mode === "inapp" ? "Open in your browser first" : "Add JSL Barber to your Home Screen"}
          </DialogTitle>
          <DialogDescription className="[font-size:13px] [color:#adb5bd]">
            {mode === "inapp"
              ? "This link opened inside another app, which can't add JSL Barber to your Home Screen."
              : "It only takes a few taps, and you can book faster next time."}
          </DialogDescription>
        </DialogHeader>

        <ol className="flex flex-col [gap:16px] [list-style:none] [padding:0] [margin:0]">
          {mode === "ios" && (
            <>
              <Step n={1} icon={<Share size={16} className="inline [vertical-align:text-bottom] [color:#b98a4a]" />}>
                Tap the Share button in Safari.
              </Step>
              <Step n={2} icon={<SquarePlus size={16} className="inline [vertical-align:text-bottom] [color:#b98a4a]" />}>
                Scroll down and tap "Add to Home Screen".
              </Step>
              <Step n={3} icon={<Check size={16} className="inline [vertical-align:text-bottom] [color:#b98a4a]" />}>
                Tap "Add" in the top corner.
              </Step>
            </>
          )}
          {mode === "android" && (
            <>
              <Step n={1}>Tap the menu button (three dots) in Chrome.</Step>
              <Step n={2}>Tap "Install app" or "Add to Home screen".</Step>
              <Step n={3}>Tap "Install" to confirm.</Step>
            </>
          )}
          {mode === "inapp" && (
            <>
              <Step n={1}>Tap the three dots or the share icon in the corner.</Step>
              <Step n={2}>Choose "Open in Safari" or "Open in Chrome".</Step>
              <Step n={3}>Then tap Add to Home Screen again.</Step>
            </>
          )}
        </ol>

        {mode === "ios" && (
          <p className="[font-size:12px] [color:#89919a] [margin-top:16px]">
            Use Safari for these steps. Other iPhone browsers have a slightly different menu.
          </p>
        )}

        <Button
          onClick={onClose}
          className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:12px_24px] [margin-top:20px] [width:100%]"
        >
          Got it
        </Button>
      </DialogContent>
    </Dialog>
  )
}
