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
      <DialogContent className="[max-width:420px]">
        <DialogHeader>
          <DialogTitle>{service ? "Edit Service" : "Add Service"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col [gap:16px] [padding:8px_0]">
          <div>
            <p className="[font-size:13px] [font-weight:600] [margin-bottom:6px]">Service Name</p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Haircut (45 min)"
              className="[width:100%] [border:1px_solid_#e3ddd3] [border-radius:8px] [padding:10px_12px] [font-size:14px] [box-sizing:border-box]"
            />
          </div>
          <div>
            <p className="[font-size:13px] [font-weight:600] [margin-bottom:6px]">Description</p>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className="[width:100%] [border:1px_solid_#e3ddd3] [border-radius:8px] [padding:10px_12px] [font-size:14px] [box-sizing:border-box]"
            />
          </div>
          <div className="flex [gap:16px]">
            <div className="flex-1">
              <p className="[font-size:13px] [font-weight:600] [margin-bottom:6px]">Price ($)</p>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 45"
                type="number"
                className="[width:100%] [border:1px_solid_#e3ddd3] [border-radius:8px] [padding:10px_12px] [font-size:14px] [box-sizing:border-box]"
              />
            </div>
            <div className="flex-1">
              <p className="[font-size:13px] [font-weight:600] [margin-bottom:6px]">Duration (min)</p>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 45"
                type="number"
                className="[width:100%] [border:1px_solid_#e3ddd3] [border-radius:8px] [padding:10px_12px] [font-size:14px] [box-sizing:border-box]"
              />
            </div>
          </div>

          {error && <p className="[font-size:13px] [color:#e05c5c]">{error}</p>}
        </div>

        <DialogFooter className="flex [gap:12px]">
          <Button onClick={onClose} className="bg-[#dee2e6] text-[#111821] hover:bg-[#adb5bd] rounded-none [padding:10px_20px]">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title || !price || !duration}
            className="bg-[#b98a4a] text-[#111821] hover:bg-[#cda064] rounded-none [padding:10px_20px]"
          >
            {service ? "Save Changes" : "Add Service"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
