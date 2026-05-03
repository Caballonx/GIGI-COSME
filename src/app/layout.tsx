import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PWARegistration } from "@/components/features/landing/PWARegistration";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    locale: "en_US",
    url: "https://premium-landing.vercel.app",
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
    <html lang="en" className={`${poppins.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-background text-foreground selection:bg-brand-light selection:text-brand-charcoal">
        <PWARegistration />
        {children}
      </body>
    </html>
  );
}
