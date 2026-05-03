"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Camera, MessageCircle } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 bg-brand-dusty/5 border border-brand-dusty/20 rounded-none p-12 md:p-20 text-center backdrop-blur-md elegant-shadow"
        >
          <h2 className="text-4xl md:text-6xl font-playfair mb-6 leading-tight text-brand-charcoal">
            ¿Lista para <br />
            <span className="italic text-brand-dusty">brillar?</span>
          </h2>
          <p className="text-lg text-brand-muted font-poppins font-light max-w-xl mx-auto mb-10">
            Agenda tu cita hoy mismo y descubre por qué somos la opción favorita en Santo Domingo para el cuidado de tu mirada.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="text-sm px-8 py-6 font-poppins uppercase tracking-widest bg-brand-dusty hover:bg-brand-pink text-white rounded-none border border-transparent"
              onClick={() => window.open('https://wa.me/18297748007', '_blank')}
            >
              <MessageCircle className="mr-2" size={18} />
              Reservar por WhatsApp
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-sm px-8 py-6 font-poppins uppercase tracking-widest text-brand-charcoal border-brand-charcoal hover:bg-brand-charcoal hover:text-white rounded-none transition-colors bg-transparent"
              onClick={() => window.open('https://www.instagram.com/gigi_style_lashes', '_blank')}
            >
              <Camera className="mr-2" size={18} />
              Ver Instagram
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-light blur-[150px] opacity-30 -z-0" />
    </section>
  );
};
