"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: "Pestañas",
    price: "Desde RD$1,200",
    features: [
      "Pelo a pelo clásica",
      "Efecto Rímel",
      "Volumen Ruso",
      "Lifting de pestañas",
      "Retoque a las 2 semanas"
    ],
    popular: true,
    buttonText: "Elegir Pestañas"
  },
  {
    name: "Cejas",
    price: "Desde RD$500",
    features: [
      "Diseño y perfilado",
      "Depilación con cera",
      "Laminado de cejas",
      "Tintado con Henna",
      "Asesoría de visagismo"
    ],
    popular: false,
    buttonText: "Elegir Cejas"
  },
  {
    name: "Combos",
    price: "Desde RD$2,500",
    features: [
      "Pestañas + Cejas Pro",
      "Limpieza Facial Express",
      "Descuento por fidelidad",
      "Atención preferencial",
      "Seguimiento post-servicio"
    ],
    popular: false,
    buttonText: "Ver Combos"
  }
];

export const Pricing = () => {
  return (
    <section id="precios" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-playfair mb-4 text-brand-charcoal">
            Menú de <span className="italic text-brand-dusty">Servicios</span>
          </h2>
          <div className="w-16 h-[1px] bg-brand-dusty mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-none flex flex-col ${
                plan.popular 
                  ? 'bg-background border border-brand-dusty/40 relative scale-105 z-10 elegant-shadow' 
                  : 'bg-white border border-transparent hover:border-brand-dusty/20 transition-colors'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-dusty text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-none shadow-sm">
                  RECOMENDADO
                </div>
              )}
              
              <h3 className="text-2xl font-playfair mb-2 text-brand-charcoal">{plan.name}</h3>
              <div className="flex items-baseline mb-8">
                <span className="text-2xl font-playfair font-semibold text-brand-dusty">
                  {plan.price}
                </span>
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center space-x-3 text-sm text-brand-muted font-poppins font-light">
                    <Check size={16} className="text-brand-dusty" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.popular ? 'primary' : 'outline'} 
                className={`w-full font-poppins uppercase tracking-widest py-6 rounded-none ${
                  plan.popular 
                    ? 'bg-brand-dusty hover:bg-brand-pink text-white border-transparent' 
                    : 'text-brand-charcoal border-brand-charcoal hover:bg-brand-charcoal hover:text-white'
                }`}
                onClick={() => window.open('https://wa.me/18297748007', '_blank')}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
