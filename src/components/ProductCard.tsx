import React, { useState } from 'react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openProductDetail } = useStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative bg-white rounded-2xl border border-[#EFE4E3] p-3 sm:p-4 flex flex-col justify-between hover:shadow-lg hover:border-[#E2C5C8] transition-all duration-300">
      
      {/* Top Image Container */}
      <div 
        className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#F8F1F0] cursor-pointer"
        onClick={() => openProductDetail(product)}
      >
        {/* Placeholder / Loading shimmer */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-[#F6EEED] animate-pulse" />
        )}

        {/* Fallback container if image fails */}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#F8EFF0] to-[#EFE1E3]">
            <Sparkles className="w-8 h-8 text-[#B5828C] mb-2 opacity-60" />
            <span className="font-serif text-sm font-semibold text-[#4A3B3E]">{product.name}</span>
            <span className="text-[11px] text-[#8C7A7E] mt-1">{product.category}</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Status Tag (Quiet, tasteful metadata label) */}
        {product.tag && (
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-block px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase rounded-md bg-white/95 text-[#633942] shadow-xs backdrop-blur-xs border border-[#EAD8DA]">
              {product.tag} {discountPercent && product.tag === 'Oferta' ? `-${discountPercent}%` : ''}
            </span>
          </div>
        )}

        {/* Top-Right Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
            isFavorited
              ? 'bg-[#B5828C] text-white'
              : 'bg-white/80 text-[#594B4E] hover:bg-white hover:text-[#B5828C]'
          }`}
          aria-label={isFavorited ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          title="Favoritos"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductDetail(product);
            }}
            className="w-full bg-white/95 hover:bg-white text-[#2B2124] text-xs font-medium py-2 px-3 rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista rápida</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="pt-3.5 flex flex-col flex-grow justify-between">
        <div>
          {/* Category */}
          <span className="text-[11px] uppercase tracking-wider text-[#917E83] font-medium">
            {product.category}
          </span>

          {/* Title */}
          <h4
            onClick={() => openProductDetail(product)}
            className="font-serif text-base sm:text-lg font-medium text-[#2E2426] line-clamp-1 hover:text-[#A86473] cursor-pointer transition-colors mt-0.5"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* Description snippet */}
          <p className="text-xs text-[#705F63] line-clamp-2 mt-1 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-[#F5EAE9] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-base sm:text-lg text-[#2E2426] tabular-nums">
                {STORE_CONFIG.currency} {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#9B888D] line-through tabular-nums">
                  {STORE_CONFIG.currency} {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#87767A]">Envío coordinado</span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="p-2 sm:px-3 sm:py-2 bg-[#F6ECEE] hover:bg-[#EBD6DA] text-[#613640] hover:text-[#2E2426] rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0"
            aria-label={`Agregar ${product.name} al carrito`}
            title="Agregar al carrito"
          >
            <ShoppingBag className="w-4 h-4 text-[#8C4857]" />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        </div>
      </div>

    </div>
  );
};
