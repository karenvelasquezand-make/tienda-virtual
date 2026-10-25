import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    setIsCheckoutOpen,
    openProductDetail,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Drawer Overlay */}
      <div
        className="w-full max-w-md bg-[#FCF9F8] h-full shadow-2xl flex flex-col justify-between border-l border-[#EEDFDE] animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EEDFDE] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B5828C]" />
            <h3 className="font-serif text-xl font-medium text-[#2E2426]">
              Tu Bolsa de Compras
            </h3>
            <span className="text-xs bg-[#F7EBEB] text-[#703D48] px-2 py-0.5 rounded-full font-semibold tabular-nums">
              {cartCount}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#7A696D] hover:text-[#2E2426] rounded-full hover:bg-[#F5EBEB] transition-colors"
            aria-label="Cerrar bolsa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List / Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 ? (
            <>
              <div className="flex items-center justify-between text-xs text-[#7A696D] pb-2 border-b border-[#EEDFDE]">
                <span>Artículos seleccionados</span>
                <button
                  onClick={clearCart}
                  className="hover:text-[#A84A5B] transition-colors underline"
                >
                  Vaciar bolsa
                </button>
              </div>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3.5 bg-white p-3 rounded-2xl border border-[#EFE5E6] shadow-2xs"
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-20 h-20 rounded-xl overflow-hidden bg-[#FAF3F2] shrink-0 cursor-pointer"
                      onClick={() => {
                        openProductDetail(item.product);
                        setIsCartOpen(false);
                      }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4
                            onClick={() => {
                              openProductDetail(item.product);
                              setIsCartOpen(false);
                            }}
                            className="font-serif text-sm font-semibold text-[#2E2426] hover:text-[#B5828C] cursor-pointer line-clamp-1"
                          >
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-[#8C7A7E]">
                            {item.product.category}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-[#A39296] hover:text-[#B54A5D] transition-colors"
                          aria-label="Eliminar producto"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Stepper & Subtotal */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#FAF1F1]">
                        <div className="flex items-center border border-[#E5D7D8] rounded-lg bg-[#FAF5F5]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-[#594B4E] hover:text-[#2E2426]"
                            aria-label="Restar 1 unidad"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums text-[#2E2426]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-[#594B4E] hover:text-[#2E2426]"
                            aria-label="Sumar 1 unidad"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-[#2E2426] tabular-nums">
                            {STORE_CONFIG.currency} {(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#F9EFEF] flex items-center justify-center text-[#B5828C]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl text-[#2E2426]">
                Tu bolsa está vacía
              </h4>
              <p className="text-xs text-[#7A696D] max-w-xs mx-auto font-light leading-relaxed">
                Aún no has agregado ninguna pieza a tu selección. Explora nuestro catálogo y enamórate de tus favoritas.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-2 bg-[#2E2426] hover:bg-[#4A3B3E] text-white px-5 py-2.5 rounded-full text-xs font-medium transition-colors"
              >
                <span>Descubrir catálogo</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer with Subtotal & WhatsApp Checkout trigger */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#EEDFDE] space-y-4 shadow-md">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs text-[#7A696D]">
                <span>Subtotal ({cartCount} artículos):</span>
                <span className="tabular-nums font-semibold text-[#2E2426]">
                  {STORE_CONFIG.currency} {cartSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#7A696D]">
                <span>Costo de envío:</span>
                <span className="text-[11px] text-[#A86473] font-medium">
                  Se coordina vía WhatsApp
                </span>
              </div>
              <div className="pt-2 border-t border-[#F5EAEB] flex justify-between items-baseline">
                <span className="text-sm font-semibold text-[#2E2426]">Total estimado:</span>
                <span className="font-serif text-2xl font-bold text-[#2E2426] tabular-nums">
                  {STORE_CONFIG.currency} {cartSubtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#2E2426] hover:bg-[#47393C] text-white py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-semibold shadow-md transition-all group"
            >
              <span>Continuar pedido por WhatsApp</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#E8C5C8]" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C7A7E]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B5828C]" />
              <span>Coordinación directa con {STORE_CONFIG.owner}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
