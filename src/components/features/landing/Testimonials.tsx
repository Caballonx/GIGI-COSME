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
    <section id="testimonios" className="py-24 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bebas leading-none">
              LO QUE DICEN <br />
              <span className="text-brand-pink">NUESTRAS CLIENTAS</span>
            </h2>
          </div>
          <p className="text-white/40 uppercase tracking-[0.2em] text-xs font-semibold">
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
              className="relative p-8 border border-white/10 rounded-3xl hover:border-brand-pink/50 transition-colors bg-white/[0.03] backdrop-blur-sm"
            >
              <Quote className="text-brand-pink/20 absolute top-6 right-8" size={40} />
              <p className="text-lg italic mb-8 relative z-10 text-white/80 font-poppins">
                "{t.text}"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-pink to-brand-light rounded-full flex items-center justify-center font-bold text-white text-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bebas text-xl tracking-wide">{t.name}</h4>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

