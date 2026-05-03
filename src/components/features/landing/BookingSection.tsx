"use client"

import React from "react"
import { motion } from "framer-motion"
import { BookingWidget } from "@/components/features/BookingWidget"

export const BookingSection = () => {
  return (
    <section id="reservar" className="py-24 bg-brand-light relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink/20 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bebas tracking-tight text-neutral-900 mb-4"
          >
            RESERVA TU <span className="text-brand-deep-pink">EXPERIENCIA</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-500 max-w-2xl mx-auto font-outfit"
          >
            Agenda tu cita en segundos y prepárate para lucir tu mejor versión. 
            Nuestras especialistas están listas para cuidarte.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <BookingWidget />
        </motion.div>
      </div>
    </section>
  )
}
