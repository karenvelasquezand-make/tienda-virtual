import React, { useState } from 'react';
import { STORE_CONFIG, FAQ_LIST } from '../config/storeConfig';
import { useStore } from '../context/StoreContext';
import {
  ChevronDown,
  ChevronUp,
  Truck,
  RotateCcw,
  Shield,
  FileText,
  Mail,
  Phone,
  Send,
  MessageCircle,
} from 'lucide-react';

export const InformationalSections: React.FC = () => {
  const { addToast } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activePolicyTab, setActivePolicyTab] = useState<'envios' | 'cambios' | 'privacidad' | 'terminos'>('envios');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMessage.trim()) {
      addToast('Por favor completa tu nombre y el mensaje.', 'info');
      return;
    }

    const text = encodeURIComponent(
      `¡Hola Andrea! Mi nombre es *${contactName}* (${contactPhone || 'Sin teléfono'}).\n*Asunto:* ${contactSubject || 'Consulta general'}\n*Mensaje:* ${contactMessage}`
    );

    window.open(`https://wa.me/${STORE_CONFIG.phoneInternational}?text=${text}`, '_blank');
    addToast('Abriendo WhatsApp para enviar tu consulta...');
    setContactMessage('');
  };

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-[#FAF6F6] border-t border-[#EEDFDE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. FAQ Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B5828C]">
              Resolvemos tus Inquietudes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2326] mt-1.5">
              Preguntas Frecuentes
            </h2>
            <p className="text-xs sm:text-sm text-[#736367] mt-1 font-light">
              Todo lo que necesitas saber sobre envíos, pagos y compras en A-BLISS.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#EDE0E1] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-[#2E2426]">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full bg-[#FAF0F1] text-[#A86473] shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#665559] leading-relaxed border-t border-[#FAF1F1] pt-3 font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Informative Policies Tabs */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EBD6D8] shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B5828C]">
              Transparencia & Confianza
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2326] mt-1">
              Políticas de la Tienda
            </h3>
          </div>

          {/* Policy Selector Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            <button
              onClick={() => setActivePolicyTab('envios')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activePolicyTab === 'envios'
                  ? 'bg-[#2E2426] text-white shadow-xs'
                  : 'bg-[#F9F0F1] text-[#635356] hover:bg-[#F2E4E6]'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Envíos y Entregas</span>
            </button>

            <button
              onClick={() => setActivePolicyTab('cambios')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activePolicyTab === 'cambios'
                  ? 'bg-[#2E2426] text-white shadow-xs'
                  : 'bg-[#F9F0F1] text-[#635356] hover:bg-[#F2E4E6]'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Cambios y Devoluciones</span>
            </button>

            <button
              onClick={() => setActivePolicyTab('privacidad')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activePolicyTab === 'privacidad'
                  ? 'bg-[#2E2426] text-white shadow-xs'
                  : 'bg-[#F9F0F1] text-[#635356] hover:bg-[#F2E4E6]'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Privacidad</span>
            </button>

            <button
              onClick={() => setActivePolicyTab('terminos')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                activePolicyTab === 'terminos'
                  ? 'bg-[#2E2426] text-white shadow-xs'
                  : 'bg-[#F9F0F1] text-[#635356] hover:bg-[#F2E4E6]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Términos</span>
            </button>
          </div>

          {/* Active Policy Content */}
          <div className="max-w-2xl mx-auto text-xs sm:text-sm text-[#5E4D51] leading-relaxed font-light space-y-3 bg-[#FAF6F6] p-6 rounded-2xl border border-[#EFE2E3]">
            {activePolicyTab === 'envios' && (
              <>
                <h4 className="font-serif text-lg font-bold text-[#2D2326]">Información de Envíos en Perú</h4>
                <p>• <strong>Lima Metropolitana:</strong> Las órdenes se despachan mediante courier particular con código de seguimiento en un plazo de 24 a 48 horas hábiles luego de confirmado el pago.</p>
                <p>• <strong>Provincias:</strong> Envíos a todo el territorio nacional a través de empresas reconocidas como Olva Courier o encomienda vía Shalom/Marvisur (tiempo estimado: 2 a 4 días hábiles).</p>
                <p>• <strong>Tarifa:</strong> El costo exacto se calcula y se confirma de manera transparente en la conversación de WhatsApp según tu dirección o agencia de recojo elegida.</p>
              </>
            )}

            {activePolicyTab === 'cambios' && (
              <>
                <h4 className="font-serif text-lg font-bold text-[#2D2326]">Política de Cambios y Garantía</h4>
                <p>• Se aceptan solicitudes de cambio de producto dentro de los <strong>7 días calendario</strong> contados a partir de la recepción del pedido.</p>
                <p>• Los productos deben encontrarse sin uso, en su empaque original, con todas las etiquetas, accesorios y envolturas intactas.</p>
                <p>• Por motivos de higiene y salud personal, los aretes y productos de cosmética abiertos no admiten cambio una vez roto el precinto protector.</p>
              </>
            )}

            {activePolicyTab === 'privacidad' && (
              <>
                <h4 className="font-serif text-lg font-bold text-[#2D2326]">Compromiso de Privacidad de Datos</h4>
                <p>• En A-BLISS respetamos tu privacidad. Tus datos de contacto, nombres y direcciones se solicitan únicamente para procesar y despachar tu pedido por WhatsApp.</p>
                <p>• No compartimos ni comercializamos tu información personal con terceros bajo ninguna circunstancia ajena a la entrega del paquete.</p>
              </>
            )}

            {activePolicyTab === 'terminos' && (
              <>
                <h4 className="font-serif text-lg font-bold text-[#2D2326]">Términos y Condiciones de Compra</h4>
                <p>• Todos los precios mostrados están expresados en Soles peruanos (S/.) e incluyen el empaque de cortesía boutique.</p>
                <p>• La disponibilidad de stock se confirma directamente con Andrea Velasquez Pari vía WhatsApp antes de concretar la transferencia o pago por Yape/Plin.</p>
                <p>• Las fotografías corresponden a muestras reales seleccionadas con los más altos estándares visuales.</p>
              </>
            )}
          </div>
        </div>

        {/* 3. Direct Contact Section & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B5828C]">
                Atención Inmediata
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2326] mt-1">
                Ponte en Contacto con Nosotros
              </h3>
              <p className="text-xs sm:text-sm text-[#736367] mt-2 font-light leading-relaxed">
                ¿Deseas una consulta especial sobre una talla, armar una caja de regalo personalizada o tienes dudas con un envío? Estamos para ayudarte con la mayor calidez.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={`https://wa.me/${STORE_CONFIG.phoneInternational}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#EED7D9] hover:border-[#B5828C] transition-all shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#9E8B90] block font-medium">
                    WhatsApp Boutique
                  </span>
                  <span className="text-sm font-semibold text-[#2D2326] group-hover:text-[#A86473] transition-colors">
                    {STORE_CONFIG.phoneDisplay}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${STORE_CONFIG.email}`}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#EED7D9] hover:border-[#B5828C] transition-all shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF0F1] text-[#B5828C] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[11px] uppercase tracking-wider text-[#9E8B90] block font-medium">
                    Correo Electrónico
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#2D2326] truncate block group-hover:text-[#A86473] transition-colors">
                    {STORE_CONFIG.email}
                  </span>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-white border border-[#EED7D9] flex items-center gap-3.5 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0F1] text-[#B5828C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#9E8B90] block font-medium">
                    Atención Titular
                  </span>
                  <span className="text-sm font-semibold text-[#2D2326]">
                    {STORE_CONFIG.owner}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EBD6D8] shadow-sm">
            <h4 className="font-serif text-xl text-[#2D2326] mb-1">
              Envíanos un Mensaje Directo
            </h4>
            <p className="text-xs text-[#7A696D] mb-5">
              Tu consulta será canalizada directamente a Andrea Velasquez Pari vía WhatsApp.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#4D3F42] mb-1">
                    Tu nombre <span className="text-[#A84A5B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sofía Mendoza"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#FAF7F7] border border-[#E5D7D8] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2326] focus:outline-none focus:border-[#B5828C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4D3F42] mb-1">
                    WhatsApp o teléfono
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 987654321"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-[#FAF7F7] border border-[#E5D7D8] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2326] focus:outline-none focus:border-[#B5828C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4D3F42] mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  placeholder="Ej. Consulta por cartera Aurora o armado de regalo"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full bg-[#FAF7F7] border border-[#E5D7D8] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2326] focus:outline-none focus:border-[#B5828C]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4D3F42] mb-1">
                  Mensaje <span className="text-[#A84A5B]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full bg-[#FAF7F7] border border-[#E5D7D8] rounded-xl px-3.5 py-2.5 text-xs text-[#2D2326] focus:outline-none focus:border-[#B5828C] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2D2326] hover:bg-[#47383B] text-white px-7 py-3 rounded-full text-xs font-semibold transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar mensaje a WhatsApp</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
