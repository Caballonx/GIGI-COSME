import React from 'react';
import { Send, MessageCircle, Instagram, MapPin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-24 border-t border-brand-pink/10 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="text-4xl font-bebas mb-8 tracking-tighter">
              <span className="text-brand-deep-pink">GIGI</span>
              <span className="text-neutral-900">STYLE</span>
            </div>
            <p className="text-neutral-500 font-outfit max-w-sm mb-10 leading-relaxed text-lg">
              Expertos en realzar tu mirada y cuidar tu piel. Un espacio diseñado para tu bienestar y belleza en el corazón de Santo Domingo.
            </p>
            <div className="flex space-x-5">
              <a href="https://www.instagram.com/gigi_style_lashes" target="_blank" className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center hover:bg-brand-deep-pink hover:text-white transition-all duration-300 group">
                <Instagram size={20} className="text-brand-deep-pink group-hover:text-white transition-colors" />
              </a>
              <a href="https://wa.me/18297748007" target="_blank" className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center hover:bg-brand-deep-pink hover:text-white transition-all duration-300 group">
                <MessageCircle size={20} className="text-brand-deep-pink group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-neutral-900 font-bebas text-2xl mb-8 uppercase tracking-widest">Explora</h4>
            <ul className="space-y-4 text-neutral-500 font-outfit">
              <li><a href="#inicio" className="hover:text-brand-deep-pink transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-brand-deep-pink transition-colors">Servicios</a></li>
              <li><a href="#precios" className="hover:text-brand-deep-pink transition-colors">Menú de Cuidado</a></li>
              <li><a href="#testimonios" className="hover:text-brand-deep-pink transition-colors">Testimonios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-neutral-900 font-bebas text-2xl mb-8 uppercase tracking-widest">Ubicación</h4>
            <ul className="space-y-6 text-neutral-500 font-outfit">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-brand-deep-pink shrink-0 mt-1" />
                <span>Distrito Nacional, <br />Santo Domingo, RD</span>
              </li>
              <li className="flex items-center">
                <MessageCircle size={18} className="mr-3 text-brand-deep-pink" />
                <span>+1 (829) 774-8007</span>
              </li>
              <li className="flex items-center">
                <Send size={18} className="mr-3 text-brand-deep-pink" />
                <span>gigi.style.lashes@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-brand-pink/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-neutral-400 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center">
            © {new Date().getFullYear()} GIGI STYLE LASHES <span className="mx-3 text-brand-pink opacity-50">|</span> HECHO CON <Heart size={10} className="mx-1.5 fill-brand-deep-pink text-brand-deep-pink inline" /> EN RD
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest hover:text-brand-deep-pink transition-colors">Privacidad</a>
            <a href="#" className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest hover:text-brand-deep-pink transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
