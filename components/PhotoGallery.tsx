import Image from "next/image"

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
  return (
    <div className="mt-2 w-full min-w-0">
      <div className="grid w-full grid-flow-col [grid-auto-columns:calc((100%-16px)/3)] [gap:8px] overflow-x-auto [scrollbar-width:none]">
        {photos.map((photo, index) => (
          <div
            key={photo}
            className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-[#1b2632]"
          >
            <Image
              src={photo}
              alt={`JSL Barber haircut ${index + 1}`}
              fill
              sizes="(max-width: 480px) 30vw, 112px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
