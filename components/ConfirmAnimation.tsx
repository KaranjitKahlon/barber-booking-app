"use client"

export default function ConfirmAnimation() {
  return (
    <div className="mt-8 flex h-[200px] w-[200px] items-center justify-center">
      <div className="success-circle">
        <svg
          className="check-svg"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            className="check-path"
            d="M25 52 L42 68 L75 32"
          />
        </svg>
      </div>
    </div>
  )
}