"use client"
import Image from "next/image"

export default function ConfirmAnimation() {
  return (
    <Image
      src="/circle.png"
      alt="Confirmation Animation"
      width={100}
      height={100}
    className="[margin-top:24px] [animation:popIn_0.5s_ease-out_forwards]">
    </Image>
  )
}