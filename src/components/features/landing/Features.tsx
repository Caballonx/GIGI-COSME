"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Eye, Smile, User } from 'lucide-react'

const features = [
  {
    title: "Extensiones de Pestañas",
    desc: "Técnicas personalizadas para una mirada impactante y natural. Pelo a pelo, volumen ruso y más.",
    icon: <Sparkles size={32} strokeWidth={1.5} />,
    color: "brand-dusty"
  },
  {
    title: "Diseño de Cejas",
    desc: "Perfilado, laminado y tintado para enmarcar tu rostro con la forma perfecta.",
    icon: <Eye size={32} strokeWidth={1.5} />,
    color: "brand-dusty"
  },
  {
    title: "Depilación con Cera",
    desc: "Piel suave y libre de vello con productos de alta calidad para tu comodidad.",
    icon: <Smile size={32} strokeWidth={1.5} />,
    color: "brand-dusty"
  },
  {
    title: "Cuidado Facial",
    desc: "Tratamientos de cosmetología profesional para una piel radiante y saludable.",
    icon: <User size={32} strokeWidth={1.5} />,
    color: "brand-dusty"
  }
]

export const Features = () => {
  return (
    <section id="servicios" className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair mb-4 text-center text-brand-charcoal">
            Nuestros <span className="italic text-brand-dusty">Servicios</span>
          </h2>
          <p className="text-brand-muted font-poppins text-center max-w-xl mx-auto font-light">
            Ofrecemos soluciones estéticas de vanguardia para resaltar tu belleza única.
          </p>
          <div className="w-16 h-[1px] bg-brand-dusty mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-background p-8 rounded-none elegant-shadow group relative overflow-hidden border border-transparent hover:border-brand-dusty/20 transition-all duration-300"
            >
              <div className="mb-6 text-brand-dusty transition-transform duration-500 group-hover:scale-110">
                {f.icon}
              </div>
              <h3 className="text-xl font-playfair mb-4 text-brand-charcoal">
                {f.title}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed font-poppins font-light">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
