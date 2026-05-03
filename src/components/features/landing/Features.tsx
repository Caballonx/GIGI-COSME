"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Eye, Smile, User, Heart, Star } from 'lucide-react'

const features = [
  {
    title: "Pestañas",
    desc: "Técnicas personalizadas para una mirada impactante. Pelo a pelo, volumen ruso y diseño de autor.",
    icon: <Sparkles size={32} />,
    color: "text-brand-deep-pink"
  },
  {
    title: "Cejas Pro",
    desc: "Laminado y perfilado con visagismo experto. Enmarcamos tu rostro con la forma ideal.",
    icon: <Eye size={32} />,
    color: "text-brand-deep-pink"
  },
  {
    title: "Depilación",
    desc: "Piel de seda con productos hipoalergénicos. Comodidad y suavidad en cada sesión.",
    icon: <Smile size={32} />,
    color: "text-brand-deep-pink"
  },
  {
    title: "Skin Care",
    desc: "Cosmetología avanzada para una piel radiante. Limpiezas profundas y nutrición facial.",
    icon: <Heart size={32} />,
    color: "text-brand-deep-pink"
  }
]

export const Features = () => {
  return (
    <section id="servicios" className="py-32 relative overflow-hidden bg-white">
      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-pink/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bebas tracking-tight text-neutral-900 mb-6"
          >
            LO QUE <span className="text-brand-deep-pink">HACEMOS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-500 max-w-xl mx-auto font-outfit"
          >
            Combinamos arte y ciencia para resaltar tu belleza. Resultados profesionales con un toque de magia.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className="group p-10 rounded-[40px] bg-white border border-brand-pink/10 shadow-sm hover:shadow-2xl hover:shadow-brand-pink/20 transition-all duration-500 relative"
            >
              <div className={`mb-8 p-5 inline-block rounded-3xl bg-brand-pink/20 ${f.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                {f.icon}
              </div>
              <h3 className="text-3xl font-bebas mb-4 text-neutral-900 group-hover:text-brand-deep-pink transition-colors tracking-wide">
                {f.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed font-outfit">
                {f.desc}
              </p>
              
              <div className="mt-8 flex items-center text-[10px] font-bold text-brand-deep-pink uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                Saber más <Star size={10} className="ml-2 fill-brand-deep-pink" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
