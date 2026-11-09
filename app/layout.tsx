import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"
import { DM_Sans, Oswald } from "next/font/google";
import InstallProvider from "@/components/install/InstallProvider";
import LaunchRedirect from "@/components/install/LaunchRedirect";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "JSL Barber",
  description: "JSL Barber Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${oswald.variable}`} style={{ height: '100%' }} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
              var s = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
              if (!s) return;
              if (sessionStorage.getItem('jsl-launch-handled')) return;
              if (location.pathname !== '/') return;
              var d = document.documentElement;
              d.setAttribute('data-launching','1');
              setTimeout(function(){ d.removeAttribute('data-launching') }, 4000);
            }catch(e){}})();`,
          }}
        />
      </head>
      <body style={{ height: '100%', overscrollBehavior: 'none' }}>
        <div id="launch-cover" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/jslSplashScreen.png" alt="" />
        </div>
        <InstallProvider>
          <LaunchRedirect />
          <Navbar />
          <div className="h-[92px] md:h-[132px]" />

          <main className="pb-[100px] md:pb-[24px]">
            {children}
          </main>

          <footer className="flex flex-col items-center text-center [padding:60px_24px]">
            <p className="[font-size:12px]">
              &copy; 2026 JSL Barber. All rights reserved.
            </p>
          </footer>
        </InstallProvider>
      </body>
    </html>
  );
}
