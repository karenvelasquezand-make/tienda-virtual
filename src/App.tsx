import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { GiftPromoSection } from './components/GiftPromoSection';
import { AboutSection } from './components/AboutSection';
import { InformationalSections } from './components/InformationalSections';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ToastNotification } from './components/ToastNotification';

const AppContent: React.FC = () => {
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F8] text-[#2E2426]">
      {/* Top Header */}
      <Header onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        <div id="hero">
          <Hero
            onDiscover={() => handleNavigate('catalogo')}
            onExploreGifts={() => handleNavigate('regalos')}
          />
        </div>

        <CategoryShowcase onSelectCategory={() => handleNavigate('catalogo')} />

        <ProductCatalog />

        <GiftPromoSection />

        <AboutSection />

        <InformationalSections />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Overlays & Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistModal />
      <WhatsAppCheckoutModal />
      <FloatingWhatsApp />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
