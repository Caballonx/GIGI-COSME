"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-pink/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-light/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8"
        >
          <Sparkles className="text-brand-pink" size={16} />
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-white/70">Expertos en Belleza Facial</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bebas leading-none mb-6">
            GIGI STYLE <span className="text-brand-pink">LASHES</span> <br />
            TU <span className="text-brand-light">ESENCIA</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-10 font-poppins max-w-2xl mx-auto">
            Lashista y Cosmetóloga profesional en Santo Domingo. Especialista en pestañas, cejas y cuidado de la piel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-8 py-6">
              AGENDAR CITA
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              VER SERVICIOS
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Abstract Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
    </section>
  )
}
