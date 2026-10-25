import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerOrderData } from '../types/store';
import { STORE_CONFIG } from '../config/storeConfig';
import { X, MessageSquare, Send, CheckCircle2, ShieldCheck, ShoppingBag } from 'lucide-react';

export const WhatsAppCheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    buildWhatsAppOrderUrl,
    clearCart,
    addToast,
  } = useStore();

  const [formData, setFormData] = useState<CustomerOrderData>({
    fullName: '',
    phone: '',
    cityOrDistrict: '',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerOrderData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSentSuccess, setOrderSentSuccess] = useState(false);

  if (!isCheckoutOpen) return null;

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CustomerOrderData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Por favor ingresa tu nombre completo';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Por favor ingresa tu número telefónico';
    } else if (formData.phone.replace(/\D/g, '').length < 9) {
      errs.phone = 'Ingresa un número válido de 9 dígitos';
    }
    if (!formData.cityOrDistrict.trim()) {
      errs.cityOrDistrict = 'Ingresa tu distrito o ciudad';
    }
    if (!formData.address.trim()) {
      errs.address = 'Ingresa tu dirección o referencia';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const whatsappUrl = buildWhatsAppOrderUrl(formData);

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    setOrderSentSuccess(true);
    setIsSubmitting(false);
    addToast('Redirigiendo a WhatsApp para finalizar tu pedido...', 'success');
  };

  const handleFinish = (shouldClearCart: boolean) => {
    if (shouldClearCart) {
      clearCart();
    }
    setOrderSentSuccess(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-[#EEDFDE] overflow-hidden my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EEDFDE] flex items-center justify-between bg-[#FDFBFB]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#128C7E]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[#2E2426]">
                Finalizar Pedido por WhatsApp
              </h3>
              <p className="text-[11px] text-[#7A696D]">
                Atención directa con {STORE_CONFIG.owner} ({STORE_CONFIG.phoneDisplay})
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#7A696D] hover:text-[#2E2426] rounded-full hover:bg-[#F5EBEB] transition-colors"
            aria-label="Cerrar ventana de pedido"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!orderSentSuccess ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* Quick Order Summary Box */}
            <div className="p-4 rounded-2xl bg-[#FCF8F8] border border-[#F0E2E3] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#6B5A5E] font-medium">
                <span className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#B5828C]" />
                  <span>Resumen de tu selección ({cart.length} productos):</span>
                </span>
                <span className="font-serif text-sm font-bold text-[#2E2426] tabular-nums">
                  {STORE_CONFIG.currency} {cartSubtotal.toFixed(2)}
                </span>
              </div>

              <div className="max-h-24 overflow-y-auto text-xs text-[#7A696D] space-y-1 pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span className="line-clamp-1">{item.quantity}x {item.product.name}</span>
                    <span className="tabular-nums font-medium shrink-0 ml-2">
                      {STORE_CONFIG.currency} {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information Fields */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-[#2D2326] uppercase tracking-wider">
                Datos para la entrega y comprobante
              </h4>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-[#4D3F42] mb-1">
                  Nombre completo <span className="text-[#A84A5B]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. María Elena Delgado"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full bg-[#FAF7F7] border rounded-xl px-3.5 py-2.5 text-xs text-[#2D2326] focus:outline-none focus:ring-1 transition-all ${
                    errors.fullName
                      ? 'border-[#D97787] focus:ring-[#D97787]'
                      : 'border-[#E5D7D8] focus:border-[#B5828C] focus:ring-[#B5828C]'
                  }`}
                />
                {errors.fullName && (
                  <span className="text-[11px] text-[#A84A5B] mt-1 block">{errors.fullName}</span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-[#4D3F42] mb-1">
                  Número de WhatsApp / Celular <span className="text-[#A84A5B]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Ej. 987654321"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full bg-[#FAF7F7] border rounded-xl px-3.5 py-2.5 text-xs text-[#2D2326] focus:outline-none focus:ring-1 transition-all ${
                    errors.phone
                      ? 'border-[#D97787] focus:ring-[#D97787]'
                      : 'border-[#E5D7D8] focus:border-[#B5828C] focus:ring-[#B5828C]'
                  }`}
                />
                {errors.phone && (
                  <span className="text-[11px] text-[#A84A5B] mt-1 block">{errors.phone}</span>
                )}
              </div>

              {/* District & City */}
              <div>
                <label className="block text-xs font-medium text-[#4D3F42] mb-1">
                  Distrito / Provincia de entrega <span className="text-[#A84A5B]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. Miraflores, Lima / Cusco / Arequipa"
                  value={formData.cityOrDistrict}
                  onChange={(e) => setFormData({ ...formData, cityOrDistrict: e.target.value })}
                  className={`w-full bg-[#FAF7F7] border rounded-xl px-3.5 py-2.5 text-xs text-[#2D2326] focus:outline-none focus:ring-1 transition-all ${
                    errors.cityOrDistrict
                      ? 'border-[#D97787] focus:ring-[#D97787]'
                      : 'border-[#E5D7D8] focus:border-[#B5828C] focus:ring-[#B5828C]'
                  }`}
                />
                {errors.cityOrDistrict && (
                  <span className="text-[11px] text-[#A84A5B] mt-1 block">{errors.cityOrDistrict}</span>
                )}
              </div>

              {/* Exact Address */}
              <div>
                <label className="block text-xs font-medium text-[#4D3F42] mb-1">
                  Dirección exacta de entrega y referencias <span className="text-[#A84A5B]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej. Av. Larco 1234 dpto 402, alt. parque Kennedy"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full bg-[#FAF7F7] border rounded-xl px-3.5 py-2.5 text-xs text-[#2D2326] focus:outline-none focus:ring-1 transition-all ${
                    errors.address
                      ? 'border-[#D97787] focus:ring-[#D97787]'
                      : 'border-[#E5D7D8] focus:border-[#B5828C] focus:ring-[#B5828C]'
                  }`}
                />
                {errors.address && (
                  <span className="text-[11px] text-[#A84A5B] mt-1 block">{errors.address}</span>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-[#4D3F42] mb-1">
                  Notas u observaciones para el pedido (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej. Es para regalo de cumpleaños con dedicatoria especial..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAF7F7] border border-[#E5D7D8] rounded-xl px-3.5 py-2 text-xs text-[#2D2326] focus:outline-none focus:border-[#B5828C] focus:ring-1 focus:ring-[#B5828C] transition-all resize-none"
                />
              </div>
            </div>

            {/* Honest Commercial Notice as required */}
            <div className="p-3.5 rounded-xl bg-[#F8F2F3] border border-[#EED9DC] flex items-start gap-2.5 text-xs text-[#6E5A5E] leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-[#B5828C] shrink-0 mt-0.5" />
              <span>
                <strong>Aviso de compra:</strong> Al pulsar enviar, se abrirá WhatsApp con el mensaje estructurado para que Andrea Velasquez Pari confirme disponibilidad. El costo de envío y medio de pago (Yape/Plin o transferencia) se definen de común acuerdo en el chat.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-4 rounded-2xl text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido a WhatsApp</span>
            </button>
          </form>
        ) : (
          /* Order Sent Confirmation Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#E8F8EE] flex items-center justify-center text-[#25D366]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="font-serif text-2xl text-[#2E2426]">
              ¡Mensaje preparado con éxito!
            </h4>

            <p className="text-xs sm:text-sm text-[#6E5C60] max-w-md mx-auto leading-relaxed">
              Se abrió WhatsApp con el detalle completo de tus productos y datos. Si tu navegador bloqueó la ventana, puedes enviar tu mensaje usando el enlace directo.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => handleFinish(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#2E2426] text-white rounded-xl text-xs font-medium hover:bg-[#47383B] transition-colors"
              >
                Limpiar bolsa y seguir explorando
              </button>

              <button
                onClick={() => handleFinish(false)}
                className="w-full sm:w-auto px-5 py-2.5 bg-white border border-[#E0D0D2] text-[#4A3B3E] rounded-xl text-xs font-medium hover:bg-[#FAF3F3] transition-colors"
              >
                Conservar artículos en la bolsa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
