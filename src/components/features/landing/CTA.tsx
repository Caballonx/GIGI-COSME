"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-magenta/20 to-neon-yellow/20 opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-12 md:p-20 rounded-sm text-center max-w-5xl mx-auto border-2 border-white/5"
        >
          <h2 className="text-5xl md:text-7xl font-bebas leading-none mb-8">
            READY TO <br />
            <span className="text-gradient">EVOLVE?</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-poppins">
            Join thousands of developers and designers creating the next generation of digital experiences. 
            Start your journey with us today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto h-16 group">
              Start Free Trial
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
            </Button>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-dark-bg bg-white/10" />
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-dark-bg bg-neon-yellow text-black flex items-center justify-center text-xs font-bold">
                +2k
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
