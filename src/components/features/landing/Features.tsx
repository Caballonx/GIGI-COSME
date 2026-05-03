"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Monitor, Smartphone, Zap, Shield } from 'lucide-react'

const features = [
  {
    icon: <Monitor size={32} />,
    title: "Responsive Design",
    desc: "Seamless experience across all devices from desktop to ultra-wide monitors.",
    color: "neon-yellow"
  },
  {
    icon: <Zap size={32} />,
    title: "Lightning Fast",
    desc: "Optimized for core web vitals with ultra-low latency and instant transitions.",
    color: "magenta"
  },
  {
    icon: <Shield size={32} />,
    title: "Secure Core",
    desc: "Built with the latest security standards to keep your data safe and protected.",
    color: "neon-yellow"
  },
  {
    icon: <Smartphone size={32} />,
    title: "PWA Ready",
    desc: "Installable on any device with offline support and native app-like experience.",
    color: "magenta"
  }
]

export const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bebas mb-4"
          >
            ENGINEERED FOR <span className="text-neon-yellow">PERFECTION</span>
          </motion.h2>
          <div className="w-20 h-1 bg-magenta mx-auto" />
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
