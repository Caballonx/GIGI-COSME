"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-light rounded-full blur-[120px] animate-pulse opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-dusty rounded-full blur-[120px] animate-pulse delay-1000 opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-brand-dusty/20 px-5 py-2 mb-8 rounded-none"
        >
          <Sparkles className="text-brand-dusty" size={16} />
          <span className="text-xs uppercase tracking-[0.2em] font-medium text-brand-charcoal">Expertos en Belleza Facial</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-playfair leading-tight mb-6 text-brand-charcoal">
            Realza tu mirada <br /> con <span className="italic text-brand-dusty">Gigi Style</span>
          </h1>
          
          <p className="text-lg md:text-xl text-brand-muted mb-10 font-poppins max-w-2xl mx-auto font-light">
            Lashista y Cosmetóloga profesional en Santo Domingo. Especialista en extensiones de pestañas, diseño de cejas y cuidado de la piel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="text-sm px-8 py-6 font-poppins tracking-widest uppercase bg-brand-dusty hover:bg-brand-pink text-white rounded-none border border-brand-dusty"
              onClick={() => window.open('https://wa.me/18297748007', '_blank')}
            >
              Reservar Ahora
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-sm px-8 py-6 font-poppins tracking-widest uppercase text-brand-charcoal border-brand-charcoal hover:bg-brand-charcoal hover:text-white rounded-none transition-colors"
              onClick={() => {
                const el = document.getElementById('servicios');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Servicios
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
