"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Instagram, MessageCircle, Sparkles } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-brand-light">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-white border border-brand-pink/20 rounded-[60px] p-12 md:p-24 text-center shadow-2xl shadow-brand-pink/10"
        >
          {/* Abstract Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/20 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-[80px] -ml-32 -mb-32" />

          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-10"
          >
            <div className="w-20 h-20 bg-brand-pink/30 rounded-3xl flex items-center justify-center">
              <Sparkles className="text-brand-deep-pink" size={40} />
            </div>
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-bebas mb-8 leading-[0.9] text-neutral-900">
            ¿LISTA PARA <br />
            <span className="text-brand-deep-pink text-glow">BRILLAR?</span>
          </h2>
          <p className="text-xl text-neutral-500 font-outfit max-w-xl mx-auto mb-14 leading-relaxed">
            No dejes para mañana la mirada que puedes tener hoy. 
            Agenda tu cita y vive la experiencia GIGI STYLE.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              className="w-full sm:w-auto rounded-full px-12 h-20 bg-neutral-900 text-white font-bebas tracking-[0.2em] text-2xl hover:scale-105 transition-all shadow-xl shadow-neutral-900/20"
              onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageCircle className="mr-3" />
              RESERVAR AHORA
            </Button>
            <Button 
              variant="ghost" 
              className="w-full sm:w-auto rounded-full px-10 h-20 border-2 border-brand-pink/30 text-neutral-900 font-bebas tracking-[0.2em] text-2xl hover:bg-brand-pink/10 transition-all"
              onClick={() => window.open('https://www.instagram.com/gigi_style_lashes', '_blank')}
            >
              <Instagram className="mr-3" />
              SÍGUENOS
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
