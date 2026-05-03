"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Camera, MessageCircle } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-dark-bg">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 bg-gradient-to-br from-brand-pink/20 to-brand-light/5 border border-white/10 rounded-3xl p-12 md:p-20 text-center backdrop-blur-xl"
        >
          <h2 className="text-5xl md:text-7xl font-bebas mb-6 leading-none">
            ¿LISTA PARA <br />
            <span className="text-brand-pink">BRILLAR?</span>
          </h2>
          <p className="text-xl text-white/60 font-poppins max-w-xl mx-auto mb-10">
            Agenda tu cita hoy mismo y descubre por qué somos la opción favorita en Santo Domingo para el cuidado de tu mirada.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              className="text-lg px-10 py-8"
              onClick={() => window.open('https://wa.me/18297748007', '_blank')}
            >
              <MessageCircle className="mr-2" />
              RESERVAR POR WHATSAPP
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-10 py-8"
              onClick={() => window.open('https://www.instagram.com/gigi_style_lashes', '_blank')}
            >
              <Camera className="mr-2" />
              VER INSTAGRAM
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-pink/10 blur-[150px] -z-0" />
    </section>
  );
};
