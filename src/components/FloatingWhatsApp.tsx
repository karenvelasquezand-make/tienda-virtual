import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${STORE_CONFIG.phoneInternational}?text=${encodeURIComponent(
    '¡Hola Andrea! Estuve visitando la boutique A-BLISS y me gustaría hacer una consulta.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-2.5">
      {/* Small dismissible greeting bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-lg border border-[#EEDFDE] text-xs text-[#2D2326] animate-fadeIn">
          <span>¿Dudas con tu compra? <strong>Chatea con Andrea</strong></span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#9E8B90] hover:text-[#2D2326] p-0.5"
            aria-label="Cerrar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Primary WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl hover:scale-108 transition-all duration-300 group"
        aria-label="Contactar a A-BLISS por WhatsApp"
        title="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 transition-transform group-hover:rotate-6" />
      </a>
    </div>
  );
};
