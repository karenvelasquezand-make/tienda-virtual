import React from 'react';
import { ASSETS, STORE_CONFIG } from '../config/storeConfig';
import { useStore } from '../context/StoreContext';
import { Gift, Heart, Sparkles, MessageCircle } from 'lucide-react';

export const GiftPromoSection: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const handleGoToGifts = () => {
    setSelectedCategory('Regalos');
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppGift = () => {
    const text = encodeURIComponent(
      `¡Hola Andrea! Me interesa armar una caja de regalo personalizada en A-BLISS. ¿Qué opciones tienen disponibles?`
    );
    window.open(`https://wa.me/${STORE_CONFIG.phoneInternational}?text=${text}`, '_blank');
  };

  return (
    <section id="regalos" className="py-16 sm:py-24 bg-gradient-to-b from-[#FCF9F8] to-[#F9F0F1] border-y border-[#EEDFDE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EBD6D8] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Image */}
          <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative overflow-hidden bg-[#FAF3F2]">
            <img
              src={ASSETS.categoryGift}
              alt="Caja de regalo exclusiva A-BLISS con lazo de satén"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-[#874A58] flex items-center gap-1.5 shadow-xs">
              <Gift className="w-3.5 h-3.5" />
              <span>Detalles Inolvidables</span>
            </div>
          </div>

          {/* Copy and Actions */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B5828C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Experiencia Boutique para Regalar</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2124] leading-tight">
              Regalos con Alma: Cajas de Lujo & Envolturas de Ensueño
            </h2>

            <p className="text-xs sm:text-sm text-[#665559] leading-relaxed font-light">
              Ya sea para un cumpleaños, aniversario, agradecimiento o consentirte a ti misma, en <strong className="font-semibold text-[#2B2124]">A-BLISS</strong> cada obsequio se viste de gala. Nuestras cajas rígidas incluyen papel de seda perfumado, ramillete de flores preservadas y una tarjeta caligrafiada con tu dedicatoria especial.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF6F6] border border-[#F0E4E5]">
                <Heart className="w-4 h-4 text-[#B5828C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#2D2326]">Dedicatoria Caligrafiada</h4>
                  <p className="text-[11px] text-[#7A696D]">Escribimos tu mensaje a mano con caligrafía fina.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF6F6] border border-[#F0E4E5]">
                <Sparkles className="w-4 h-4 text-[#B5828C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#2D2326]">Boxes Personalizadas</h4>
                  <p className="text-[11px] text-[#7A696D]">Combina carteras, joyas y cosmética a tu gusto.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleGoToGifts}
                className="w-full sm:w-auto px-6 py-3 bg-[#2D2326] hover:bg-[#47383B] text-white rounded-full text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                Ver colección de regalos
              </button>

              <button
                onClick={handleWhatsAppGift}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-[#25D366]/40 text-[#128C7E] hover:bg-[#25D366]/10 rounded-full text-xs sm:text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Armar box por WhatsApp</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
