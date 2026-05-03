import React from 'react';
import { Send, MessageCircle, Camera, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-20 border-t border-brand-dusty/10 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-playfair font-semibold mb-6">
              <span className="text-brand-charcoal">GIGI</span>
              <span className="text-brand-dusty italic ml-1">Style</span>
            </div>
            <p className="text-brand-muted font-poppins font-light max-w-sm mb-8">
              Expertos en realzar tu mirada y cuidar tu piel. Ubicados en el corazón de Santo Domingo, República Dominicana.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/gigi_style_lashes" target="_blank" className="w-10 h-10 rounded-full bg-background border border-brand-dusty/20 flex items-center justify-center hover:bg-brand-dusty/10 transition-colors group">
                <Camera size={18} className="text-brand-muted group-hover:text-brand-dusty transition-colors" />
              </a>
              <a href="https://wa.me/18297748007" target="_blank" className="w-10 h-10 rounded-full bg-background border border-brand-dusty/20 flex items-center justify-center hover:bg-brand-dusty/10 transition-colors group">
                <MessageCircle size={18} className="text-brand-muted group-hover:text-brand-dusty transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-brand-charcoal font-playfair font-semibold text-xl mb-6 tracking-wide">Navegación</h4>
            <ul className="space-y-4 text-sm text-brand-muted font-poppins font-light">
              <li><a href="#inicio" className="hover:text-brand-dusty transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-brand-dusty transition-colors">Servicios</a></li>
              <li><a href="#precios" className="hover:text-brand-dusty transition-colors">Menú</a></li>
              <li><a href="#contacto" className="hover:text-brand-dusty transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-charcoal font-playfair font-semibold text-xl mb-6 tracking-wide">Contacto</h4>
            <ul className="space-y-4 text-sm text-brand-muted font-poppins font-light">
              <li className="flex items-center"><MapPin size={14} className="mr-2 text-brand-dusty" /> Santo Domingo, RD</li>
              <li className="flex items-center"><MessageCircle size={14} className="mr-2 text-brand-dusty" /> +1 (829) 774-8007</li>
              <li className="flex items-center"><Send size={14} className="mr-2 text-brand-dusty" /> gigi.style.lashes@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-dusty/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-muted/70 text-xs font-poppins tracking-widest uppercase">
            © {new Date().getFullYear()} Gigi Style Lashes. Todos los derechos reservados.
          </p>
          <p className="text-brand-muted/70 text-xs font-poppins tracking-widest uppercase">
            Diseñado con pasión en RD.
          </p>
        </div>
      </div>
    </footer>
  );
};
