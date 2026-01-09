// app/layout.tsx
import type { Metadata } from "next";
import { Nunito_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import LoadingScreen from "../component/loading_screen";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "IDEAL MENA | Transform • Lead • Inspire",
  description: "Empowering people, strengthening institutions, inspiring change across the MENA region",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preload only the logo (background image removed) */}
        <link 
          rel="preload" 
          href="/Ideal-Logo.png" 
          as="image" 
          type="image/png" 
        />
      </head>
      <body
        className={`${nunitoSans.variable} ${dmSans.variable} antialiased text-white overflow-hidden font-sans`}
        suppressHydrationWarning
      >
        {/* Loading Screen */}
        <LoadingScreen isLoading={true} duration={3500} />
        
        {/* Main Content with Simple Brand Background */}
        <div className="relative z-10 min-h-screen">
          {/* Simple dark background with brand gradient overlay */}
          <div className="fixed inset-0 -z-50 bg-black">
            {/* Brand gradient overlay (subtle) */}
            <div className="absolute inset-0 bg-linear-to-br from-[#14284F]/20 via-[#2C3BEE]/10 to-[#7979E0]/15"></div>
            
            {/* Minimal glow elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#2C3BEE]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7979E0]/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative">
            {children}
          </div>
        </div>
        
        {/* Brand Footer */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="flex items-center gap-2 text-xs font-mono opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-[#AAD2FF]">IDEAL</span>
            <span className="text-white/60">MENA</span>
            <span className="text-[#7979E0]">© 2026</span>
          </div>
        </div>
      </body>
    </html>
  );
}