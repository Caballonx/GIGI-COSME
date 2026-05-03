import React from 'react'
import { Code, Send, Briefcase, Camera } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bebas tracking-tighter mb-6">
              <span className="text-neon-yellow">PREMIUM</span>
              <span className="text-magenta">CORE</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed font-poppins">
              Defining the future of digital presence through high-performance engineering and premium design aesthetics.
            </p>
          </div>

          <div>
            <h4 className="font-bebas text-lg tracking-widest mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-white/40 font-poppins">
              <li><a href="#" className="hover:text-neon-yellow transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-neon-yellow transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-neon-yellow transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-neon-yellow transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas text-lg tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/40 font-poppins">
              <li><a href="#" className="hover:text-neon-yellow transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-neon-yellow transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-neon-yellow transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-neon-yellow transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas text-lg tracking-widest mb-6">Connect</h4>
            <div className="flex space-x-4 mb-8">
              <a href="#" className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center hover:bg-neon-yellow hover:text-black transition-all duration-300">
                <Code size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center hover:bg-neon-yellow hover:text-black transition-all duration-300">
                <Send size={20} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center hover:bg-neon-yellow hover:text-black transition-all duration-300">
                <Briefcase size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <p className="text-xs text-white/20 uppercase tracking-[0.3em] font-medium font-poppins">
            © 2024 PREMIUM CORE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center space-x-6 text-[10px] text-white/20 uppercase tracking-widest font-bold font-poppins">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
