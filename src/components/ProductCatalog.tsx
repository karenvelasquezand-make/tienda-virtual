import React, { useState } from 'react';
import { useStore, SortOption } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { STORE_CONFIG } from '../config/storeConfig';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTag,
    setSelectedTag,
    priceRange,
    setPriceRange,
    sortOption,
    setSortOption,
    resetFilters,
    maxCatalogPrice,
  } = useStore();

  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const categories = ['all', ...STORE_CONFIG.categories.map((c) => c.name)];
  const tags = [
    { id: 'all', label: 'Todos' },
    { id: 'Oferta', label: 'Ofertas' },
    { id: 'Nuevo', label: 'Novedades' },
    { id: 'Más vendido', label: 'Más vendidos' },
  ];

  return (
    <section id="catalogo" className="py-14 sm:py-20 bg-[#FDFBFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Introduction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-[#EEDFDE]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B5828C]">
              Catálogo Oficial A-BLISS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2326] mt-1">
              Colección Boutique
            </h2>
            <p className="text-xs sm:text-sm text-[#736367] mt-1 font-light">
              Selección exclusiva de accesorios, joyería fina, carteras y detalles de ensueño.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#7A696D]">
              Mostrando <strong className="font-semibold text-[#2D2326] tabular-nums">{filteredProducts.length}</strong> productos
            </span>

            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E0D0D2] rounded-xl text-xs font-medium text-[#4A3B3E]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B5828C]" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row (Desktop & Tablet) */}
        <div className="space-y-5 mb-8">
          
          {/* Top row: Search input + Category pill tabs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A7E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o descripción..."
                className="w-full bg-white border border-[#E5D5D7] rounded-xl pl-10 pr-9 py-2.5 text-xs text-[#2D2326] focus:outline-none focus:border-[#B5828C] focus:ring-1 focus:ring-[#B5828C] transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A7E] hover:text-[#2D2326]"
                  aria-label="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <label htmlFor="sort-select" className="text-xs text-[#7A696D] whitespace-nowrap">
                Ordenar por:
              </label>
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="bg-white border border-[#E5D5D7] rounded-xl px-3 py-2 text-xs text-[#2D2326] focus:outline-none focus:border-[#B5828C] cursor-pointer shadow-2xs"
              >
                <option value="featured">Destacados / Recomendados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name-asc">Nombre: A a Z</option>
                <option value="name-desc">Nombre: Z a A</option>
              </select>
            </div>
          </div>

          {/* Category Tabs: Clean Segmented Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#2E2426] text-white shadow-xs'
                      : 'bg-white text-[#5E4E52] border border-[#E8DADC] hover:bg-[#F9ECEE] hover:text-[#2E2426]'
                  }`}
                >
                  {cat === 'all' ? 'Todas las categorías' : cat}
                </button>
              );
            })}
          </div>

          {/* Secondary Filter Bar: Tags & Price range (Collapsible on mobile) */}
          <div className={`p-4 bg-white/70 border border-[#EFE5E6] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${showFilterDrawer ? 'block' : 'hidden md:flex'}`}>
            
            {/* Tag Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#806E72] mr-1">Filtrar por:</span>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag.id)}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    selectedTag === tag.id
                      ? 'bg-[#EBD2D6] text-[#542B34] font-semibold'
                      : 'bg-white text-[#635356] border border-[#EBDCDD] hover:bg-[#F7EFEF]'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Price Range Filter */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#806E72] whitespace-nowrap">
                Hasta: <strong className="text-[#2D2326] font-semibold">{STORE_CONFIG.currency} {priceRange[1]}</strong>
              </span>
              <input
                type="range"
                min="0"
                max={maxCatalogPrice}
                step="5"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-28 sm:w-36 accent-[#B5828C] cursor-pointer"
              />

              {/* Reset Filters button */}
              {(searchQuery || selectedCategory !== 'all' || selectedTag !== 'all' || priceRange[1] < maxCatalogPrice || sortOption !== 'featured') && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-[#9E5362] hover:text-[#2D2326] underline ml-2 shrink-0"
                  title="Restablecer filtros"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpiar</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#EBDCDD] p-10 text-center max-w-lg mx-auto space-y-4 my-8">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF0F1] flex items-center justify-center text-[#B5828C]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#2D2326]">
              No se encontraron productos
            </h3>
            <p className="text-xs sm:text-sm text-[#736367] font-light leading-relaxed">
              No encontramos coincidencias para los filtros seleccionados o la búsqueda &ldquo;{searchQuery}&rdquo;. Intenta ajustar los parámetros de búsqueda o restablecer los filtros.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-[#2D2326] hover:bg-[#4A3B3E] text-white px-5 py-2.5 rounded-full text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ver todos los productos</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
