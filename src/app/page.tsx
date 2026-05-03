"use client"

import { Navbar } from "@/components/features/landing/Navbar";
import { Hero } from "@/components/features/landing/Hero";
import { Features } from "@/components/features/landing/Features";
import { Testimonials } from "@/components/features/landing/Testimonials";
import { Pricing } from "@/components/features/landing/Pricing";
import { CTA } from "@/components/features/landing/CTA";
import { Footer } from "@/components/features/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
