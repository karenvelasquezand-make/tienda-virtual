import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { Heart, Sparkles, Mail, Phone, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Story */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B5828C]">
                Conoce A-BLISS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2326] mt-1.5">
                Nuestra Historia & Pasión por los Detalles
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5E4D51] font-light leading-relaxed">
              <strong className="text-[#2D2326] font-semibold">{STORE_CONFIG.name}</strong> nació bajo la visión de su fundadora, <strong className="text-[#2D2326] font-medium">{STORE_CONFIG.owner}</strong>, con un propósito claro: ofrecer a la mujer moderna una propuesta de moda, accesorios y joyería fina que conjugue delicadeza, autenticidad y sofisticación.
            </p>

            <p className="text-sm sm:text-base text-[#5E4D51] font-light leading-relaxed">
              Nuestro eslogan, <em className="font-serif text-[#783C49] font-medium">“{STORE_CONFIG.slogan}”</em>, resume nuestra filosofía. No creemos en tendencias efímeras que opacan la personalidad de quien las lleva; creemos en piezas selectas que potencian tu luz propia y te hacen sentir cómoda, segura y deslumbrante en cualquier ocasión.
            </p>

            {/* Three Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FCF8F8] border border-[#F0E4E5] space-y-1.5">
                <Sparkles className="w-4 h-4 text-[#B5828C]" />
                <h4 className="text-xs font-semibold text-[#2D2326]">Curaduría Fina</h4>
                <p className="text-[11px] text-[#78676B]">Cada accesorio es evaluado rigurosamente en calidad y acabados.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FCF8F8] border border-[#F0E4E5] space-y-1.5">
                <Heart className="w-4 h-4 text-[#B5828C]" />
                <h4 className="text-xs font-semibold text-[#2D2326]">Atención Humana</h4>
                <p className="text-[11px] text-[#78676B]">Trato personalizado 1 a 1 para asesorarte en cada detalle.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FCF8F8] border border-[#F0E4E5] space-y-1.5">
                <MapPin className="w-4 h-4 text-[#B5828C]" />
                <h4 className="text-xs font-semibold text-[#2D2326]">Envíos Perú</h4>
                <p className="text-[11px] text-[#78676B]">Llegamos a cada rincón del país con couriers confiables.</p>
              </div>
            </div>

            {/* Founder Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#FAF2F3] to-[#FDF8F8] border border-[#EED7D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#A86473] font-semibold">
                  Fundadora & Propietaria
                </p>
                <p className="font-serif text-lg font-bold text-[#2D2326]">
                  {STORE_CONFIG.owner}
                </p>
                <p className="text-xs text-[#7A696D]">
                  Comprometida con la excelencia y la satisfacción de cada clienta en el Perú.
                </p>
              </div>

              <div className="flex flex-col sm:items-end text-xs text-[#5E4D51] space-y-1 shrink-0">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#B5828C]" />
                  <span>{STORE_CONFIG.phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#B5828C]" />
                  <span className="text-[11px]">{STORE_CONFIG.email}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-white bg-[#FAF2F3]">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
                  alt="A-BLISS Estilo y Esencia Femenina"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-5 rounded-2xl border border-[#EBD6D8] shadow-lg max-w-xs">
                <span className="font-serif text-2xl font-bold text-[#A86473] block">100%</span>
                <span className="text-xs font-semibold text-[#2D2326] block">Dedicación y Empatía</span>
                <p className="text-[11px] text-[#7A696D] mt-0.5">
                  Empacado con aroma exclusivo y tarjeta dedicatoria en cada pedido.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
