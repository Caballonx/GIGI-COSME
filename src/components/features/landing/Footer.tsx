import React from 'react';
import { Send, MessageCircle, Camera, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bebas mb-6">
              <span className="text-brand-pink">GIGI</span>
              <span className="text-brand-light">STYLE</span>
            </div>
            <p className="text-white/40 font-poppins max-w-sm mb-8">
              Expertos en realzar tu mirada y cuidar tu piel. Ubicados en el corazón de Santo Domingo, República Dominicana.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/gigi_style_lashes" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-pink/20 transition-colors group">
                <Camera size={18} className="text-white/60 group-hover:text-brand-pink transition-colors" />
              </a>
              <a href="https://wa.me/18297748007" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-pink/20 transition-colors group">
                <MessageCircle size={18} className="text-white/60 group-hover:text-brand-pink transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bebas text-xl mb-6 uppercase tracking-widest">Navegación</h4>
            <ul className="space-y-4 text-sm text-white/40 font-poppins">
              <li><a href="#inicio" className="hover:text-brand-pink transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-brand-pink transition-colors">Servicios</a></li>
              <li><a href="#precios" className="hover:text-brand-pink transition-colors">Menú</a></li>
              <li><a href="#contacto" className="hover:text-brand-pink transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bebas text-xl mb-6 uppercase tracking-widest">Contacto</h4>
            <ul className="space-y-4 text-sm text-white/40 font-poppins">
              <li className="flex items-center"><MapPin size={14} className="mr-2" /> Santo Domingo, RD</li>
              <li className="flex items-center"><MessageCircle size={14} className="mr-2" /> +1 (829) 774-8007</li>
              <li className="flex items-center"><Send size={14} className="mr-2" /> gigi.style.lashes@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-poppins">
            © {new Date().getFullYear()} GIGI STYLE LASHES. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <p className="text-white/20 text-xs font-poppins">
            DISEÑADO CON PASIÓN EN RD.
          </p>
        </div>
      </div>
    </footer>
  );
};
