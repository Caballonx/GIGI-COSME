"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: "Starter",
    price: "0",
    features: ["Basic Components", "Standard Support", "Community Access", "1 Project"],
    highlight: false
  },
  {
    name: "Pro",
    price: "49",
    features: ["Advanced Components", "Priority Support", "Private Slack", "Unlimited Projects"],
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Custom Solutions", "24/7 Dedicated Support", "SLA Guarantee", "On-site Training"],
    highlight: false
  }
]

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bebas mb-4">CHOOSE YOUR <span className="text-gradient">LEVEL</span></h2>
          <p className="text-white/40 uppercase tracking-[0.2em] text-xs">Transparent pricing for every scale</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-sm flex flex-col ${
                plan.highlight 
                  ? 'bg-white/5 border-2 border-neon-yellow relative scale-105 z-10' 
                  : 'border border-white/10'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-yellow text-black text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-3xl font-bebas mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bebas text-neon-yellow">
                  {plan.price !== "Custom" ? `$${plan.price}` : plan.price}
                </span>
                {plan.price !== "Custom" && <span className="text-white/40 ml-2 uppercase text-xs tracking-widest">/ Month</span>}
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center space-x-3 text-sm text-white/70 font-poppins">
                    <Check size={16} className="text-neon-yellow" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant={plan.highlight ? 'primary' : 'outline'} 
                className="w-full"
              >
                {plan.price === "Custom" ? "Contact Us" : "Get Started"}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
