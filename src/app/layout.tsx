import type { Metadata, Viewport } from "next";
import { Poppins, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { PWARegistration } from "@/components/features/landing/PWARegistration";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Gigi Style Lashes | Lashista & Cosmetóloga",
  description: "Realza tu mirada con las mejores extensiones de pestañas, diseño de cejas y tratamientos faciales en Santo Domingo.",
  keywords: ["pestañas", "cejas", "cosmetología", "Santo Domingo", "Gigi Style Lashes", "belleza"],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://premium-landing.vercel.app",
    title: "Premium Experience | Modern Landing Page",
    description: "High-performance modern landing page",
    siteName: "Premium Landing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Experience",
    description: "High-performance modern landing page",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${bebasNeue.variable} scroll-smooth`}>
      <body className="bg-dark-bg text-white selection:bg-neon-yellow selection:text-black">
        <PWARegistration />
        {children}
      </body>
    </html>
  );
}
