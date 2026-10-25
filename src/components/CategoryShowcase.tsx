import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

interface CategoryShowcaseProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const { setSelectedCategory } = useStore();

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
    onSelectCategory(catName);
  };

  return (
    <section id="categorias" className="py-16 sm:py-20 bg-[#FCF9F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B5828C]">
            Explora por Colección
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2D2326] mt-2 mb-3">
            Nuestras Categorías Exclusivas
          </h2>
          <p className="text-sm sm:text-base text-[#6E5C60] font-light">
            Descubre piezas diseñadas para complementar tu rutina diaria, eventos de gala y detalles memorables.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORE_CONFIG.categories.map((cat, index) => {
            const isLarge = index === 0;
            return (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-white border border-[#EEDFDE] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
                  isLarge ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Image Container with aspect ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F6EEED]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback in case of network issue
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2326]/60 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />
                  
                  {/* Subtle hover icon */}
                  <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-[#2D2326] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Title overlay at bottom of image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-wide drop-shadow-xs">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Description & Action */}
                <div className="p-4 sm:p-5 flex items-center justify-between">
                  <p className="text-xs text-[#705F63] line-clamp-2 pr-3">
                    {cat.description}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(cat.name);
                    }}
                    className="shrink-0 text-xs font-semibold text-[#8C4857] hover:text-[#2D2326] underline underline-offset-4"
                  >
                    Ver todo
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
