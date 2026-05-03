"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Lead Developer",
    text: "The performance and aesthetics of this landing page are simply unmatched. It's the new standard.",
    avatar: "AR"
  },
  {
    name: "Sarah Chen",
    role: "UX Designer",
    text: "Clean, bold, and incredibly intuitive. The animations are smooth and purposeful.",
    avatar: "SC"
  },
  {
    name: "Marcus Thorne",
    role: "CEO, TechFlow",
    text: "Converted more leads in the first week than our old site did in a month. Pure magic.",
    avatar: "MT"
  }
]

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bebas leading-none">
              TRUSTED BY THE <br />
              <span className="text-magenta">VISIONARIES</span>
            </h2>
          </div>
          <p className="text-white/40 uppercase tracking-[0.2em] text-xs font-semibold">
            Real feedback from real experts
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
              className="relative p-8 border border-white/10 rounded-sm hover:border-neon-yellow/50 transition-colors"
            >
              <Quote className="text-neon-yellow/20 absolute top-6 right-8" size={40} />
              <p className="text-lg italic mb-8 relative z-10 text-white/80">
                "{t.text}"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-yellow to-magenta rounded-full flex items-center justify-center font-bold text-black text-sm">
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
  )
}
