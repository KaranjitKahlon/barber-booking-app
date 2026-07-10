"use client"

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ConfirmAnimation() {
    return (
        <div className="mt-8 w-[200px] h-[200px]">
            <DotLottieReact
                src="/Checkmark.lottie"
                autoplay
                loop={false}
            />
        </div>
    );
}