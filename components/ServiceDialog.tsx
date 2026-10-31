"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Service = {
  id: string
  title: string
  description: string
  price: number
  duration_minutes: number
}

type ServiceDialogProps = {
  open: boolean
  onClose: () => void
  onSave: (service: Omit<Service, "id">) => void
  service?: Service | null
  error?: string | null
}

export default function ServiceDialog({ open, onClose, onSave, service, error }: ServiceDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("")

  useEffect(() => {
    if (service) {
      setTitle(service.title)
      setDescription(service.description)
      setPrice(service.price.toString())
      setDuration(service.duration_minutes.toString())
    } else {
      setTitle("")
      setDescription("")
      setPrice("")
      setDuration("")
    }
  }, [service, open])

  function handleSave() {
    if (!title || !price || !duration) return
    onSave({
      title,
      description,
      price: parseFloat(price),
      duration_minutes: parseInt(duration),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="[max-width:440px] [width:calc(100%-32px)] [padding:28px] [gap:0] [border-radius:16px]">
        <DialogHeader className="[padding-bottom:20px] [border-bottom:1px_solid_#efede8] [margin-bottom:24px]">
          <DialogTitle className="[font-size:18px] [font-weight:600] [color:#111821]">
            {service ? "Edit Service" : "Add Service"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col [gap:20px]">
          <div className="flex flex-col [gap:8px]">
            <label htmlFor="service-name" className="[font-size:13px] [font-weight:600] [color:#303b46]">
              Service Name
            </label>
            <input
              id="service-name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Haircut (45 min)"
              className="[width:100%] [height:44px] [background:#ffffff] [color:#111821] [border:1px_solid_#dcd6cb] [border-radius:8px] [padding:0_14px] [font-size:14px] [box-sizing:border-box] [outline:none] focus:[border-color:#b98a4a]"
            />
          </div>

          <div className="flex flex-col [gap:8px]">
            <label htmlFor="service-description" className="[font-size:13px] [font-weight:600] [color:#303b46]">
              Description
            </label>
            <input
              id="service-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className="[width:100%] [height:44px] [background:#ffffff] [color:#111821] [border:1px_solid_#dcd6cb] [border-radius:8px] [padding:0_14px] [font-size:14px] [box-sizing:border-box] [outline:none] focus:[border-color:#b98a4a]"
            />
          </div>

          <div className="flex [gap:16px]">
            <div className="flex flex-col [gap:8px] flex-1">
              <label htmlFor="service-price" className="[font-size:13px] [font-weight:600] [color:#303b46]">
                Price ($)
              </label>
              <input
                id="service-price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 45"
                type="number"
                className="[width:100%] [height:44px] [background:#ffffff] [color:#111821] [border:1px_solid_#dcd6cb] [border-radius:8px] [padding:0_14px] [font-size:14px] [box-sizing:border-box] [outline:none] focus:[border-color:#b98a4a]"
              />
            </div>
            <div className="flex flex-col [gap:8px] flex-1">
              <label htmlFor="service-duration" className="[font-size:13px] [font-weight:600] [color:#303b46]">
                Duration (min)
              </label>
              <input
                id="service-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 45"
                type="number"
                className="[width:100%] [height:44px] [background:#ffffff] [color:#111821] [border:1px_solid_#dcd6cb] [border-radius:8px] [padding:0_14px] [font-size:14px] [box-sizing:border-box] [outline:none] focus:[border-color:#b98a4a]"
              />
            </div>
          </div>

          {error && <p className="[font-size:13px] [color:#e05c5c]">{error}</p>}
        </div>

        <DialogFooter className="flex [flex-direction:row] [justify-content:flex-end] [gap:12px] [margin-top:28px] [padding-top:20px] [border-top:1px_solid_#efede8]">
          <Button onClick={onClose} className="bg-[#dee2e6] text-[#111821] hover:bg-[#adb5bd] rounded-none [padding:12px_24px]">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title || !price || !duration}
            className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:12px_24px]"
          >
            {service ? "Save Changes" : "Add Service"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
