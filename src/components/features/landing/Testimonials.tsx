"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "María Rodríguez",
    role: "Cliente Frecuente",
    text: "Las mejores pestañas de Santo Domingo. La atención es impecable y el resultado siempre supera mis expectativas.",
    avatar: "MR"
  },
  {
    name: "Laura Jiménez",
    role: "Maquillista Profesional",
    text: "Gigi tiene una mano increíble para las cejas. El laminado me cambió el rostro por completo. ¡Súper recomendada!",
    avatar: "LJ"
  },
  {
    name: "Ana Sofía",
    role: "Modelo",
    text: "Confío plenamente en Gigi para el cuidado de mi mirada. Sus extensiones se sienten ligeras y se ven muy naturales.",
    avatar: "AS"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonios" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-playfair leading-tight text-brand-charcoal">
              Lo que dicen <br />
              <span className="italic text-brand-dusty">nuestras clientas</span>
            </h2>
          </div>
          <p className="text-brand-muted uppercase tracking-[0.2em] text-xs font-semibold">
            Testimonios reales de belleza real
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 border border-transparent rounded-none hover:border-brand-dusty/30 transition-all bg-white elegant-shadow"
            >
              <Quote className="text-brand-dusty/20 absolute top-6 right-8" size={40} />
              <p className="text-lg italic mb-8 relative z-10 text-brand-muted font-playfair leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-dusty to-brand-light rounded-full flex items-center justify-center font-playfair font-semibold text-white text-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-xl tracking-wide text-brand-charcoal">{t.name}</h4>
                  <p className="text-xs text-brand-muted uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

