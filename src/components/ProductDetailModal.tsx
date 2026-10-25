import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { X, Heart, ShoppingBag, MessageCircle, Check, Sparkles, Share2 } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    products,
    openProductDetail,
    buildProductWhatsAppUrl,
    addToast,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);
  const discountPercent = selectedProduct.originalPrice
    ? Math.round(
        ((selectedProduct.originalPrice - selectedProduct.price) /
          selectedProduct.originalPrice) *
          100
      )
    : null;

  const relatedProducts = products
    .filter(
      (p) =>
        p.category === selectedProduct.category && p.id !== selectedProduct.id
    )
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct.name,
        text: `Mira ${selectedProduct.name} en A-BLISS Boutique`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Enlace de la tienda copiado al portapapeles.');
    }
  };

  const handleWhatsAppInquiry = () => {
    const url = buildProductWhatsAppUrl(selectedProduct);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#EEDFDE] overflow-hidden my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#4A3B3E] hover:text-[#2E2426] rounded-full shadow-md backdrop-blur-md transition-all"
          aria-label="Cerrar detalle de producto"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Big Product Image */}
          <div className="md:col-span-6 bg-[#FAF3F2] relative flex items-center justify-center p-6 md:p-8 min-h-[300px]">
            {imageError ? (
              <div className="flex flex-col items-center justify-center text-center p-6">
                <Sparkles className="w-12 h-12 text-[#B5828C] mb-3 opacity-70" />
                <span className="font-serif text-lg font-semibold text-[#2D2326]">
                  {selectedProduct.name}
                </span>
                <span className="text-xs text-[#806E72] mt-1">
                  {selectedProduct.category}
                </span>
              </div>
            ) : (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-inner bg-white">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </div>
            )}

            {selectedProduct.tag && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-[#2E2426] text-white shadow-sm">
                  {selectedProduct.tag} {discountPercent ? `-${discountPercent}%` : ''}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Product Content & Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B5828C] font-semibold">
                  {selectedProduct.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2D2326] mt-1 font-medium leading-snug">
                  {selectedProduct.name}
                </h3>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-semibold text-[#2D2326] tabular-nums">
                  {STORE_CONFIG.currency} {selectedProduct.price.toFixed(2)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-base text-[#9E8B90] line-through tabular-nums">
                    {STORE_CONFIG.currency} {selectedProduct.originalPrice.toFixed(2)}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-xs font-semibold text-[#A84A5B] bg-[#FCECEE] px-2 py-0.5 rounded-full">
                    Ahorras {STORE_CONFIG.currency} {(selectedProduct.originalPrice! - selectedProduct.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5C4C50] leading-relaxed font-light">
                {selectedProduct.longDescription || selectedProduct.description}
              </p>

              {/* Bulleted Specifications / Details */}
              {selectedProduct.details && selectedProduct.details.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-[#2D2326] uppercase tracking-wider mb-2">
                    Detalles y cuidados:
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedProduct.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#6B5A5E]">
                        <Check className="w-3.5 h-3.5 text-[#B5828C] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quantity Selector & Add to Cart Action */}
            <div className="space-y-3 pt-4 border-t border-[#EFE4E3]">
              
              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center border border-[#DECED0] rounded-xl bg-[#FAF5F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#4A3B3E] hover:text-[#2D2326] font-bold"
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-semibold text-[#2D2326] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#4A3B3E] hover:text-[#2D2326] font-bold"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart(selectedProduct, quantity);
                    closeProductDetail();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#2D2326] hover:bg-[#47383B] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E8C5C8]" />
                  <span>Agregar al carrito ({STORE_CONFIG.currency} {(selectedProduct.price * quantity).toFixed(2)})</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    isFavorited
                      ? 'bg-[#FBECEE] border-[#E8BAC0] text-[#B5828C]'
                      : 'bg-white border-[#DECED0] text-[#594B4E] hover:text-[#B5828C]'
                  }`}
                  aria-label="Guardar en favoritos"
                  title="Guardar en favoritos"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Direct WhatsApp Consultation Button */}
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Consultar disponibilidad por WhatsApp</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#8C7A7E] pt-2">
                <span>Atención: {STORE_CONFIG.owner}</span>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1 hover:text-[#2D2326]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartir producto</span>
                </button>
              </div>
            </div>

            {/* Related Products strip */}
            {relatedProducts.length > 0 && (
              <div className="pt-4 border-t border-[#EFE4E3]">
                <h4 className="text-xs font-semibold text-[#2D2326] uppercase tracking-wider mb-3">
                  También te podría gustar:
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        setQuantity(1);
                        openProductDetail(rel);
                      }}
                      className="group cursor-pointer text-left space-y-1"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-[#FAF3F2] border border-[#EFE4E3]">
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-[11px] font-medium text-[#2D2326] line-clamp-1 group-hover:text-[#B5828C]">
                        {rel.name}
                      </p>
                      <p className="text-[10px] text-[#7A696D] tabular-nums font-semibold">
                        {STORE_CONFIG.currency} {rel.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
