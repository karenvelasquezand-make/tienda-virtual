import React from 'react';
import { ASSETS, STORE_CONFIG } from '../config/storeConfig';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Gift } from 'lucide-react';

interface HeroProps {
  onDiscover: () => void;
  onExploreGifts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscover, onExploreGifts }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDF8F6] via-[#FAF3F2] to-[#FCF9F8] border-b border-[#EEDFDE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5E2E4] text-[#874A58] text-xs font-medium tracking-wide rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nueva Colección Boutique 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2B2124] leading-[1.12] tracking-tight">
              {STORE_CONFIG.slogan}.
            </h1>

            <p className="text-base sm:text-lg text-[#615155] leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              Bienvenida a <strong className="font-semibold text-[#2B2124]">A-BLISS</strong>. 
              Una curaduría exquisita de bolsos, joyería en oro, cosmética botánica y regalos pensados para acompañar tus momentos más memorables con gracia y distinción.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onDiscover}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2E2426] hover:bg-[#4A3B3E] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg group"
              >
                <span>Descubrir colección</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreGifts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F8EFEF] text-[#4A3B3E] border border-[#E2CDCF] px-6 py-3.5 rounded-full text-sm font-medium transition-all"
              >
                <Gift className="w-4 h-4 text-[#B5828C]" />
                <span>Boxes para regalo</span>
              </button>
            </div>

            {/* Direct owner quote */}
            <div className="pt-4 border-t border-[#EBDCDD] flex items-center justify-center lg:justify-start gap-3 text-xs text-[#7A696D]">
              <span className="font-serif italic text-sm text-[#423235]">“Diseñamos cada detalle para celebrar a la mujer auténtica.”</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium">{STORE_CONFIG.owner}</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#EED6D8] via-[#FCEAEB] to-[#F1DEB8]/40 rounded-3xl blur-md opacity-70"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-[#F7EFEF]">
                <img
                  src={ASSETS.heroBanner}
                  alt="A-BLISS Boutique Interior y Accesorios de Moda"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating pill badge (clean subtle styling) */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/60 shadow-md flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-[#2B2124]">Atención Personalizada</p>
                    <p className="text-[11px] text-[#7A696D]">Directo con Andrea vía WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Proof Bar below Hero */}
        <div className="mt-14 pt-8 border-t border-[#EBDCDD] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-1.5 p-3 rounded-xl bg-white/50 border border-[#F3E7E8]">
            <Truck className="w-5 h-5 text-[#B5828C]" />
            <span className="text-xs font-semibold text-[#2B2124]">Envíos a todo el Perú</span>
            <span className="text-[11px] text-[#7A696D]">Lima y provincias seguras</span>
          </div>

          <div className="flex flex-col items-center space-y-1.5 p-3 rounded-xl bg-white/50 border border-[#F3E7E8]">
            <ShieldCheck className="w-5 h-5 text-[#B5828C]" />
            <span className="text-xs font-semibold text-[#2B2124]">Calidad Garantizada</span>
            <span className="text-[11px] text-[#7A696D]">Acabados y materiales premium</span>
          </div>

          <div className="flex flex-col items-center space-y-1.5 p-3 rounded-xl bg-white/50 border border-[#F3E7E8]">
            <Gift className="w-5 h-5 text-[#B5828C]" />
            <span className="text-xs font-semibold text-[#2B2124]">Empaque de Cortesía</span>
            <span className="text-[11px] text-[#7A696D]">Listo para obsequiar</span>
          </div>

          <div className="flex flex-col items-center space-y-1.5 p-3 rounded-xl bg-white/50 border border-[#F3E7E8]">
            <Sparkles className="w-5 h-5 text-[#B5828C]" />
            <span className="text-xs font-semibold text-[#2B2124]">Pagos Fáciles</span>
            <span className="text-[11px] text-[#7A696D]">Yape, Plin y Transferencias</span>
          </div>
        </div>

      </div>
    </section>
  );
};
