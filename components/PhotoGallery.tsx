"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const photos = [
    "/images/gallery/haircut-1.JPG",
    "/images/gallery/haircut-2.JPG",
    "/images/gallery/haircut-3.JPG",
    "/images/gallery/haircut-4.JPG",
    "/images/gallery/haircut-5.JPG",
    "/images/gallery/haircut-6.JPG",
    "/images/gallery/haircut-7.JPG",
    "/images/gallery/haircut-8.JPG",
    "/images/gallery/haircut-9.JPG",
]

export default function PhotoGallery() {
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

    function showPrevious() {
        setSelectedPhoto((current) =>
        current === null ? null : (current - 1 + photos.length) % photos.length
        )
    }

    function showNext() {
        setSelectedPhoto((current) =>
        current === null ? null : (current + 1) % photos.length
        )
    }

    return (
        <>
        <div className="mt-2 w-full min-w-0">
            <div className="grid w-full grid-flow-col [grid-auto-columns:calc((100%-16px)/3)] [gap:8px] overflow-x-auto [scrollbar-width:none]">
            {photos.map((photo, index) => (
                <button
                key={photo}
                type="button"
                onClick={() => setSelectedPhoto(index)}
                aria-label={`View haircut photo ${index + 1}`}
                className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-[#1b2632]"
                >
                <Image
                    src={photo}
                    alt={`JSL Barber haircut ${index + 1}`}
                    fill
                    sizes="(max-width: 480px) 30vw, 112px"
                    className="object-cover"
                />
                </button>
            ))}
            </div>
        </div>

        {selectedPhoto !== null && (
            <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 [padding:24px]"
            onClick={() => setSelectedPhoto(null)}
            >
            <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo viewer"
                className="absolute right-4 top-4 z-10 flex [width:44px] [height:44px] items-center justify-center rounded-full border border-white/20 bg-[#111821] text-white hover:bg-[#263442]"
            >
                <X size={23} />
            </button>

            <button
                type="button"
                onClick={(event) => {
                event.stopPropagation()
                showPrevious()
                }}
                aria-label="Previous photo"
                className="absolute left-2 z-10 flex [width:40px] [height:40px] items-center justify-center rounded-full border border-white/20 bg-[#111821]/90 text-white hover:bg-[#263442]"
            >
                <ChevronLeft size={24} />
            </button>

            <div
                className="relative h-[80vh] w-full max-w-[600px]"
                onClick={(event) => event.stopPropagation()}
            >
                <Image
                src={photos[selectedPhoto]}
                alt={`JSL Barber haircut ${selectedPhoto + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
                />
            </div>

            <button
                type="button"
                onClick={(event) => {
                event.stopPropagation()
                showNext()
                }}
                aria-label="Next photo"
                className="absolute right-2 z-10 flex [width:40px] [height:40px] items-center justify-center rounded-full border border-white/20 bg-[#111821]/90 text-white hover:bg-[#263442]"
            >
                <ChevronRight size={24} />
            </button>

            <p className="absolute bottom-4 text-white/70 [font-size:13px]">
                {selectedPhoto + 1} / {photos.length}
            </p>
            </div>
        )}
        </>
    )
}
