"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Precios', href: '#precios' },
    { name: 'Reservar', href: '#reservar' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled ? "py-4 bg-white/80 backdrop-blur-md shadow-sm border-b border-brand-pink/10" : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-brand-deep-pink rounded-xl flex items-center justify-center shadow-lg shadow-brand-deep-pink/20 transition-transform group-hover:rotate-12">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bebas tracking-wider text-neutral-900">GIGI</span>
            <span className="text-[10px] font-bold text-brand-deep-pink tracking-[0.3em] uppercase">STYLE</span>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-brand-deep-pink transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-deep-pink transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <Button 
            className="rounded-full px-8 h-12 bg-neutral-900 text-white font-bebas tracking-widest text-lg hover:bg-neutral-800 shadow-xl shadow-neutral-900/10"
            onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}
          >
            RESERVAR AHORA
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-neutral-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-brand-pink/20 shadow-xl"
          >
            <div className="flex flex-col space-y-6 p-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-bebas tracking-widest text-neutral-900 hover:text-brand-deep-pink transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button 
                className="w-full rounded-full h-14 bg-neutral-900 text-white font-bebas tracking-[0.2em] text-xl shadow-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                RESERVAR AHORA
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
