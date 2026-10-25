import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistModal: React.FC = () => {
  const {
    wishlist,
    products,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    openProductDetail,
    addToast,
  } = useStore();

  if (!isWishlistOpen) return null;

  const favoritedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    favoritedProducts.forEach((p) => addToCart(p, 1));
    addToast('Todos tus favoritos se agregaron a la bolsa.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#EEDFDE] overflow-hidden my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EEDFDE] flex items-center justify-between bg-[#FDFBFB]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FCECEE] flex items-center justify-center text-[#B5828C]">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-medium text-[#2E2426]">
                Tus Piezas Favoritas
              </h3>
              <p className="text-[11px] text-[#7A696D]">
                {favoritedProducts.length} {favoritedProducts.length === 1 ? 'artículo guardado' : 'artículos guardados'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-[#7A696D] hover:text-[#2E2426] rounded-full hover:bg-[#F5EBEB] transition-colors"
            aria-label="Cerrar favoritos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
          {favoritedProducts.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#EEDFDE] text-xs text-[#7A696D]">
                <span>Productos guardados</span>
                <button
                  onClick={handleAddAllToCart}
                  className="text-[#9E4F5E] hover:text-[#2E2426] font-semibold underline flex items-center gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Agregar todos a la bolsa</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {favoritedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-3 bg-[#FAF7F7] p-3 rounded-2xl border border-[#EDE0E1] relative group"
                  >
                    <div
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white shrink-0 cursor-pointer"
                      onClick={() => {
                        openProductDetail(product);
                        setIsWishlistOpen(false);
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-[#9E8B90] tracking-wider">
                          {product.category}
                        </span>
                        <h4
                          onClick={() => {
                            openProductDetail(product);
                            setIsWishlistOpen(false);
                          }}
                          className="font-serif text-sm font-semibold text-[#2E2426] hover:text-[#B5828C] cursor-pointer line-clamp-1"
                        >
                          {product.name}
                        </h4>
                        <span className="text-xs font-bold text-[#2E2426] tabular-nums mt-0.5 block">
                          {STORE_CONFIG.currency} {product.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="flex-1 py-1.5 px-2.5 bg-[#2E2426] hover:bg-[#47383B] text-white text-[11px] font-medium rounded-lg flex items-center justify-center gap-1 transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3 text-[#E8C5C8]" />
                          <span>Agregar</span>
                        </button>

                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="p-1.5 text-[#A39296] hover:text-[#B54A5D] hover:bg-white rounded-lg transition-colors"
                          aria-label="Eliminar de favoritos"
                          title="Quitar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF0F1] flex items-center justify-center text-[#B5828C]">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl text-[#2E2426]">
                Aún no tienes favoritos
              </h4>
              <p className="text-xs text-[#7A696D] max-w-xs mx-auto font-light leading-relaxed">
                Guarda los productos que más te gustan haciendo clic en el icono del corazón para encontrarlos fácilmente cuando desees.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="inline-flex items-center gap-2 bg-[#2E2426] hover:bg-[#4A3B3E] text-white px-5 py-2.5 rounded-full text-xs font-medium transition-colors"
              >
                <span>Explorar boutique</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {favoritedProducts.length > 0 && (
          <div className="p-4 bg-[#FBF7F7] border-t border-[#EEDFDE] flex justify-end">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="text-xs font-semibold text-[#2E2426] hover:text-[#B5828C] flex items-center gap-1"
            >
              <span>Continuar navegando</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
