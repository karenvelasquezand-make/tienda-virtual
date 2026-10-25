import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { Phone, Mail, Heart, ShieldCheck, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#261E20] text-[#D4C3C5] border-t border-[#3B2F32] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3E3134]">
          
          {/* Brand Column (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-3xl font-semibold tracking-widest text-[#FDF8F8] block">
                {STORE_CONFIG.name}
              </span>
              <span className="font-serif italic text-sm text-[#D89FA9]">
                “{STORE_CONFIG.slogan}”
              </span>
            </div>

            <p className="text-xs text-[#B5A1A5] font-light leading-relaxed max-w-sm">
              Boutique peruana especializada en moda, joyería fina, accesorios y bienestar. Diseñado para realzar tu belleza y celebrar momentos especiales con sofisticación y calidez.
            </p>

            <div className="pt-2 text-xs text-[#E8C5C8] space-y-1">
              <p>• <strong>Propietaria:</strong> {STORE_CONFIG.owner}</p>
              <p>• <strong>Moneda oficial:</strong> Soles peruanos ({STORE_CONFIG.currency})</p>
              <p>• <strong>Envíos:</strong> A todo el Perú (Lima y Provincias)</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FDF8F8]">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A1A5]">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogo')}
                  className="hover:text-white transition-colors"
                >
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categorias')}
                  className="hover:text-white transition-colors"
                >
                  Categorías
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('regalos')}
                  className="hover:text-white transition-colors"
                >
                  Boxes de Regalo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('nosotros')}
                  className="hover:text-white transition-colors"
                >
                  Sobre Andrea Velasquez
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FDF8F8]">
              Colecciones
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A1A5]">
              {STORE_CONFIG.categories.map((c) => (
                <li key={c.name}>
                  <button
                    onClick={() => onNavigate('catalogo')}
                    className="hover:text-white transition-colors text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#FDF8F8]">
              Contacto & Pedidos
            </h4>
            <div className="space-y-2.5 text-xs text-[#B5A1A5]">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D89FA9] mt-0.5 shrink-0" />
                <a
                  href={`https://wa.me/${STORE_CONFIG.phoneInternational}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {STORE_CONFIG.phoneDisplay}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D89FA9] mt-0.5 shrink-0" />
                <a
                  href={`mailto:${STORE_CONFIG.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {STORE_CONFIG.email}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D89FA9] mt-0.5 shrink-0" />
                <span>Lima / Envío a provincias</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-[#A69397] block mb-1">Medios de pago coordinados:</span>
              <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-[#D89FA9]">
                <span className="px-2 py-0.5 rounded bg-[#352A2D]">Yape</span>
                <span className="px-2 py-0.5 rounded bg-[#352A2D]">Plin</span>
                <span className="px-2 py-0.5 rounded bg-[#352A2D]">BCP</span>
                <span className="px-2 py-0.5 rounded bg-[#352A2D]">Interbank</span>
                <span className="px-2 py-0.5 rounded bg-[#352A2D]">BBVA</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Respect */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F7D81]">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.name} — Todos los derechos reservados.</p>
          
          <div className="flex items-center gap-1 text-[11px]">
            <span>Hecho con</span>
            <Heart className="w-3 h-3 text-[#D89FA9] fill-current" />
            <span>para {STORE_CONFIG.owner}</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D89FA9]" />
            <span>Compras seguras y transparentes</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
