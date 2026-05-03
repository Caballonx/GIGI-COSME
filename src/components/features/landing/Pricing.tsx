"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, Sparkles } from 'lucide-react'

const plans = [
  {
    name: "Pestañas",
    price: "RD$1,200",
    image: "/images/lashes.png",
    features: [
      "Pelo a pelo clásica",
      "Efecto Rímel",
      "Volumen Ruso",
      "Lifting de pestañas",
      "Retoque a las 2 semanas"
    ],
    popular: true,
    buttonText: "RESERVAR AHORA"
  },
  {
    name: "Cejas",
    price: "RD$500",
    image: "/images/brows.png",
    features: [
      "Diseño y perfilado",
      "Laminado de cejas",
      "Tintado con Henna",
      "Depilación con cera",
      "Asesoría de visagismo"
    ],
    popular: false,
    buttonText: "RESERVAR AHORA"
  },
  {
    name: "Depilación",
    price: "RD$300",
    image: "/images/waxing.png",
    features: [
      "Bozzo facial",
      "Axilas suaves",
      "Piernas completas",
      "Cera de baja temperatura",
      "Cuidado post-depilatorio"
    ],
    popular: false,
    buttonText: "RESERVAR AHORA"
  }
];

export const Pricing = () => {
  return (
    <section id="precios" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bebas tracking-tight text-neutral-900 mb-6"
          >
            MENÚ DE <span className="text-brand-deep-pink">SERVICIOS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-500 max-w-xl mx-auto font-outfit"
          >
            Elige el tratamiento perfecto para ti. Calidad premium a precios competitivos.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-[50px] flex flex-col transition-all duration-500 overflow-hidden ${
                plan.popular 
                   ? 'bg-neutral-900 text-white scale-105 z-10 shadow-2xl shadow-neutral-900/20' 
                   : 'bg-brand-light border border-brand-pink/20 hover:border-brand-deep-pink/30 hover:bg-white'
              }`}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={plan.image} 
                  alt={plan.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${plan.popular ? 'from-neutral-900' : 'from-brand-light'} to-transparent opacity-60`} />
              </div>

              <div className="p-10 pt-6 flex flex-col flex-grow">
              <div className="mb-8">
                {plan.popular && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-deep-pink text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                    <Sparkles size={12} /> RECOMENDADO
                  </div>
                )}
                <h3 className="text-4xl font-bebas tracking-wider mb-2 uppercase">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className={`text-4xl font-bebas ${plan.popular ? 'text-brand-deep-pink' : 'text-neutral-900'}`}>
                    {plan.price}
                  </span>
                  <span className="ml-2 text-xs font-bold uppercase tracking-widest text-neutral-400">Base</span>
                </div>
              </div>

              <div className="flex-grow space-y-5 mb-12">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center space-x-4">
                    <div className={`p-1 rounded-full ${plan.popular ? 'bg-brand-deep-pink/20' : 'bg-brand-pink/20'}`}>
                      <Check size={14} className={plan.popular ? 'text-brand-deep-pink' : 'text-brand-deep-pink'} />
                    </div>
                    <span className={`text-sm font-medium ${plan.popular ? 'text-neutral-300' : 'text-neutral-600'}`}>{f}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.popular ? 'default' : 'outline'} 
                className={`w-full font-bebas tracking-[0.2em] py-8 rounded-[30px] text-xl transition-all ${
                  plan.popular 
                    ? 'bg-brand-deep-pink hover:bg-brand-deep-pink/90 text-white border-none' 
                    : 'border-2 border-brand-pink/30 text-neutral-900 hover:bg-brand-pink/10'
                }`}
                onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {plan.buttonText}
              </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
