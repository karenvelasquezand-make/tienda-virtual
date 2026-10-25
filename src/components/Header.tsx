import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONFIG } from '../config/storeConfig';
import { ShoppingBag, Heart, Search, Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleNavLink = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FCF9F8]/95 backdrop-blur-md border-b border-[#EEDFDE] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#413337] text-[#FAF5F5] text-xs py-1.5 px-4 text-center tracking-wider font-normal flex items-center justify-center gap-2">
        <span>Envíos a todo el Perú</span>
        <span aria-hidden="true">·</span>
        <span>Atención exclusiva por WhatsApp con Andrea</span>
        <span aria-hidden="true">·</span>
        <span className="hidden sm:inline">Tu estilo, tu esencia</span>
      </div>

      {/* Main Navigation Bar - Following 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavLink('hero')}
            className="group flex flex-col items-start text-left focus:outline-none"
            aria-label="A-BLISS Inicio"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-widest font-semibold text-[#2E2426] group-hover:text-[#B5828C] transition-colors whitespace-nowrap">
              {STORE_CONFIG.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A7E] -mt-1 font-sans">
              Boutique
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#594B4E]">
          <button
            onClick={() => handleNavLink('hero')}
            className="hover:text-[#B5828C] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#B5828C]"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavLink('catalogo')}
            className="hover:text-[#B5828C] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#B5828C]"
          >
            Tienda
          </button>
          <button
            onClick={() => handleNavLink('categorias')}
            className="hover:text-[#B5828C] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#B5828C]"
          >
            Categorías
          </button>
          <button
            onClick={() => handleNavLink('regalos')}
            className="hover:text-[#B5828C] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#B5828C]"
          >
            Regalos
          </button>
          <button
            onClick={() => handleNavLink('nosotros')}
            className="hover:text-[#B5828C] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#B5828C]"
          >
            Nosotros
          </button>
          <button
            onClick={() => handleNavLink('contacto')}
            className="hover:text-[#B5828C] transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#B5828C]"
          >
            Contacto
          </button>
        </nav>

        {/* Zone 3: Interactive Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Quick Search Toggle / Input */}
          <div className="relative flex items-center">
            {isSearchVisible ? (
              <div className="flex items-center bg-white border border-[#E8C5C8] rounded-full px-3 py-1.5 shadow-sm w-44 sm:w-64 transition-all">
                <Search className="w-4 h-4 text-[#8C7A7E] mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar joyas, bolsos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-xs bg-transparent focus:outline-none text-[#2E2426]"
                />
                <button
                  onClick={() => {
                    setIsSearchVisible(false);
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#8C7A7E] hover:text-[#2E2426] ml-1 p-0.5"
                  aria-label="Cerrar buscador"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsSearchVisible(true);
                  handleNavLink('catalogo');
                }}
                className="p-2 text-[#594B4E] hover:text-[#B5828C] hover:bg-[#F7EFEF] rounded-full transition-colors"
                aria-label="Buscar productos"
                title="Buscar productos"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-[#594B4E] hover:text-[#B5828C] hover:bg-[#F7EFEF] rounded-full transition-colors"
            aria-label={`Ver lista de favoritos (${wishlistCount} artículos)`}
            title="Favoritos"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#B5828C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#F3E5E6] hover:bg-[#EACFCF] text-[#423235] px-3.5 py-2 rounded-full transition-colors font-medium text-xs sm:text-sm"
            aria-label={`Abrir carrito de compras (${cartCount} artículos)`}
          >
            <ShoppingBag className="w-4 h-4 text-[#A86473]" />
            <span className="hidden sm:inline">Bolsa</span>
            <span className="bg-[#423235] text-white text-[11px] font-semibold px-1.5 py-0.2 rounded-full tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#594B4E] hover:text-[#B5828C] rounded-lg focus:outline-none"
            aria-label="Abrir menú de navegación móvil"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#EEDFDE] bg-[#FCF9F8] px-4 pt-4 pb-6 space-y-3 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#4D3F42]">
            <button
              onClick={() => handleNavLink('hero')}
              className="text-left py-2.5 px-3 rounded-md hover:bg-[#F5EBEB] transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavLink('catalogo')}
              className="text-left py-2.5 px-3 rounded-md hover:bg-[#F5EBEB] transition-colors"
            >
              Tienda & Catálogo Completo
            </button>
            <button
              onClick={() => handleNavLink('categorias')}
              className="text-left py-2.5 px-3 rounded-md hover:bg-[#F5EBEB] transition-colors"
            >
              Categorías Exclusivas
            </button>
            <button
              onClick={() => handleNavLink('regalos')}
              className="text-left py-2.5 px-3 rounded-md hover:bg-[#F5EBEB] transition-colors"
            >
              Sección Regalos & Cajas de Lujo
            </button>
            <button
              onClick={() => handleNavLink('nosotros')}
              className="text-left py-2.5 px-3 rounded-md hover:bg-[#F5EBEB] transition-colors"
            >
              Nuestra Historia & Andrea Velasquez
            </button>
            <button
              onClick={() => handleNavLink('contacto')}
              className="text-left py-2.5 px-3 rounded-md hover:bg-[#F5EBEB] transition-colors"
            >
              Contacto & Preguntas Frecuentes
            </button>
          </div>

          <div className="pt-3 border-t border-[#EEDFDE] flex items-center justify-between text-xs text-[#827175]">
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#B5828C]" />
              <span>WhatsApp: {STORE_CONFIG.phoneDisplay}</span>
            </div>
            <span>Moneda: Soles (S/.)</span>
          </div>
        </div>
      )}
    </header>
  );
};
