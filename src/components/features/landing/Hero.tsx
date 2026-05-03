"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight } from 'lucide-react'

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-brand-light">
      {/* Background Sophisticated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-brand-pink/30 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[140px]" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 bg-white border border-brand-pink/30 px-6 py-2.5 rounded-full mb-10 shadow-sm"
          >
            <Sparkles className="text-brand-deep-pink" size={16} />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500">
              Belleza de Vanguardia • Santo Domingo
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-7xl md:text-[120px] font-bebas leading-[0.85] tracking-tight mb-8 text-neutral-900 uppercase">
              Realza tu <span className="text-brand-deep-pink">Mirada</span> <br />
              <span className="text-neutral-400">Define tu</span> Estilo
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-500 mb-12 font-outfit max-w-2xl mx-auto leading-relaxed">
              Lashista y Cosmetóloga profesional. Transformamos tu belleza natural con 
              técnicas avanzadas en pestañas, cejas y cuidado facial.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                className="group relative overflow-hidden rounded-full px-12 h-16 bg-neutral-900 text-white font-bebas tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-2xl shadow-neutral-900/20"
                onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center gap-3">
                  AGENDAR CITA <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button 
                variant="ghost" 
                className="group rounded-full px-10 h-16 border-2 border-brand-pink/30 font-bebas tracking-[0.2em] text-xl text-neutral-900 hover:bg-brand-pink/10 transition-all"
                onClick={() => document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' })}
              >
                VER MENÚ
              </Button>
            </div>
          </motion.div>

          {/* Social Proof Mini */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-brand-pink overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="Client" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">+500 Clientes Felices</p>
          </motion.div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-0.5 h-10 bg-neutral-900 rounded-full" />
      </motion.div>
    </section>
  )
}
