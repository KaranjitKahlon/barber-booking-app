"use client"

import Image from "next/image";


  
export default function ConfirmAnimation() {
    return (
        <Image 
        src="/Checkmark.gif"
        alt="Confirmation Animation"
        width={200}
        height={200}
        className="[margin-top:32px]"
        />
    )
}