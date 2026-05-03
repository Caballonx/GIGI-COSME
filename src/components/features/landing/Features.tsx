"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Eye, Smile, User } from 'lucide-react'

const features = [
  {
    title: "Extensiones de Pestañas",
    desc: "Técnicas personalizadas para una mirada impactante y natural. Pelo a pelo, volumen ruso y más.",
    icon: <Sparkles size={32} />,
    color: "brand-pink"
  },
  {
    title: "Diseño de Cejas",
    desc: "Perfilado, laminado y tintado para enmarcar tu rostro con la forma perfecta.",
    icon: <Eye size={32} />,
    color: "brand-pink"
  },
  {
    title: "Depilación con Cera",
    desc: "Piel suave y libre de vello con productos de alta calidad para tu comodidad.",
    icon: <Smile size={32} />,
    color: "brand-pink"
  },
  {
    title: "Cuidado Facial",
    desc: "Tratamientos de cosmetología profesional para una piel radiante y saludable.",
    icon: <User size={32} />,
    color: "brand-pink"
  }
]

export const Features = () => {
  return (
    <section id="servicios" className="py-24 relative overflow-hidden bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bebas mb-4 text-center">NUESTROS <span className="text-brand-pink">SERVICIOS</span></h2>
          <p className="text-white/60 font-poppins text-center max-w-xl mx-auto">
            Ofrecemos soluciones estéticas de vanguardia para resaltar tu belleza única.
          </p>
          <div className="w-20 h-1 bg-brand-pink mx-auto mt-6" />
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
              className="glass p-8 rounded-sm group relative overflow-hidden"
            >
              {/* Highlight Effect */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-${f.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              
              <div className={`mb-6 text-${f.color} transition-transform duration-500 group-hover:scale-110`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-bebas mb-4 group-hover:text-neon-yellow transition-colors">
                {f.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed font-poppins">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
