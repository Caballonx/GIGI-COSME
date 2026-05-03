import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";
import { PWARegistration } from "@/components/features/landing/PWARegistration";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
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
    locale: "es_DO",
    url: "https://gigi-cosme.vercel.app",
    title: "Gigi Style Lashes",
    description: "Realza tu mirada con las mejores extensiones de pestañas y tratamientos.",
    siteName: "Gigi Style Lashes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gigi Style Lashes",
    description: "Realza tu mirada con las mejores extensiones de pestañas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${outfit.variable} scroll-smooth`}>
      <body className="bg-brand-light text-neutral-900 font-outfit antialiased selection:bg-brand-pink/30 selection:text-brand-deep-pink">
        <PWARegistration />
        {children}
      </body>
    </html>
  );
}
