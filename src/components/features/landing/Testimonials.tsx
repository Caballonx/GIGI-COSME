"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "María Rodríguez",
    role: "Cliente Frecuente",
    text: "Las mejores pestañas de Santo Domingo. La atención es impecable y el resultado siempre supera mis expectativas.",
    avatar: "https://i.pravatar.cc/150?u=maria"
  },
  {
    name: "Laura Jiménez",
    role: "Maquillista Profesional",
    text: "Gigi tiene una mano increíble para las cejas. El laminado me cambió el rostro por completo. ¡Súper recomendada!",
    avatar: "https://i.pravatar.cc/150?u=laura"
  },
  {
    name: "Ana Sofía",
    role: "Modelo",
    text: "Confío plenamente en Gigi para el cuidado de mi mirada. Sus extensiones se sienten ligeras y se ven muy naturales.",
    avatar: "https://i.pravatar.cc/150?u=ana"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonios" className="py-32 bg-brand-pink/10 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px] -mr-48 -mt-48" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 bg-white rounded-full border border-brand-pink/30 mb-6"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="fill-brand-deep-pink text-brand-deep-pink" />)}
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Excelencia Garantizada</span>
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bebas tracking-tight text-neutral-900"
          >
            VOCES DE <span className="text-brand-deep-pink">BELLEZA</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 hover:shadow-xl hover:shadow-brand-pink/10 transition-all duration-500 group relative"
            >
              <Quote className="text-brand-pink/30 absolute top-8 right-8 group-hover:rotate-12 transition-transform" size={48} />
              <p className="text-lg leading-relaxed mb-10 relative z-10 text-neutral-600 font-outfit italic">
                "{t.text}"
              </p>
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden bg-brand-pink">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bebas text-2xl text-neutral-900 tracking-wide">{t.name}</h4>
                  <p className="text-[10px] text-brand-deep-pink font-bold uppercase tracking-[0.2em]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
