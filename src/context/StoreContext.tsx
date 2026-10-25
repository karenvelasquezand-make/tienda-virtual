import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CustomerOrderData, ProductCategory } from '../types/store';
import { STORE_CONFIG, INITIAL_PRODUCTS } from '../config/storeConfig';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info';
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

interface StoreContextType {
  // Products & Filtering
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string; // 'all' or ProductCategory
  setSelectedCategory: (cat: string) => void;
  selectedTag: string; // 'all' | 'Oferta' | 'Nuevo' | 'Más vendido'
  setSelectedTag: (tag: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  resetFilters: () => void;
  maxCatalogPrice: number;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Modals & Navigation
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // WhatsApp helper
  buildWhatsAppOrderUrl: (customerData: CustomerOrderData) => string;
  buildProductWhatsAppUrl: (product: Product) => string;

  // Toast
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info') => void;
  removeToast: (id: string) => void;

  // Active view tab (optional for smooth in-page navigation: 'home' | 'catalog' | 'about' | 'contact' | 'faq' | 'policies')
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'abliss_cart_v1';
const WISHLIST_STORAGE_KEY = 'abliss_wishlist_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  
  const maxCatalogPrice = Math.ceil(Math.max(...INITIAL_PRODUCTS.map((p) => p.price)));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxCatalogPrice]);
  const [sortOption, setSortOption] = useState<SortOption>('featured');

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentSection, setCurrentSection] = useState('home');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Cart with local storage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist with local storage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  }, [wishlist]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity = 1) => {
    if (quantity <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`"${product.name}" se agregó a tu carrito de compras.`);
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (itemToRemove) {
      addToast(`"${itemToRemove.product.name}" eliminado del carrito.`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    const prod = products.find((p) => p.id === productId);
    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      if (prod) addToast(`"${prod.name}" se removió de tus favoritos.`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      if (prod) addToast(`"${prod.name}" se guardó en tus favoritos.`);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTag('all');
    setPriceRange([0, maxCatalogPrice]);
    setSortOption('featured');
  };

  // Filtered & sorted products computation
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    const matchesTag =
      selectedTag === 'all' ||
      (selectedTag === 'Oferta' && p.originalPrice) ||
      (selectedTag === 'Nuevo' && (p.tag === 'Nuevo' || p.isNewArrival)) ||
      (selectedTag === 'Más vendido' && (p.tag === 'Más vendido' || p.isFeatured));

    const matchesPrice =
      p.price >= priceRange[0] && p.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesTag && matchesPrice;
  }).sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
    if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
    return 0; // 'featured' keeps original ordering
  });

  // Helper: WhatsApp URL for order
  const buildWhatsAppOrderUrl = (customerData: CustomerOrderData): string => {
    const phone = STORE_CONFIG.phoneInternational;
    
    let message = `*NUEVO PEDIDO EN A-BLISS*\n`;
    message += `_Tu estilo, tu esencia_\n\n`;
    message += `¡Hola Andrea! Deseo solicitar el siguiente pedido desde la boutique online:\n\n`;
    message += `*DETALLE DE PRODUCTOS:*\n`;

    cart.forEach((item, idx) => {
      const subtotalItem = item.product.price * item.quantity;
      message += `${idx + 1}. *${item.product.name}*\n`;
      message += `   • Cantidad: ${item.quantity}\n`;
      message += `   • Precio unitario: ${STORE_CONFIG.currency} ${item.product.price.toFixed(2)}\n`;
      message += `   • Subtotal: ${STORE_CONFIG.currency} ${subtotalItem.toFixed(2)}\n`;
    });

    message += `\n*TOTAL ESTIMADO DEL PEDIDO:*\n`;
    message += `*${STORE_CONFIG.currency} ${cartSubtotal.toFixed(2)}*\n\n`;

    message += `*DATOS PARA LA ENTREGA:*\n`;
    message += `• *Nombre:* ${customerData.fullName}\n`;
    message += `• *Teléfono:* ${customerData.phone}\n`;
    message += `• *Distrito / Ciudad:* ${customerData.cityOrDistrict}\n`;
    message += `• *Dirección:* ${customerData.address}\n`;
    if (customerData.notes && customerData.notes.trim() !== '') {
      message += `• *Observaciones:* ${customerData.notes.trim()}\n`;
    }

    message += `\n_Quedo atenta para confirmar disponibilidad, medio de pago (Yape/Plin/Transferencia) y costo exacto de envío._\n¡Muchas gracias!`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encoded}`;
  };

  // Helper: WhatsApp URL for single product inquiry
  const buildProductWhatsAppUrl = (product: Product): string => {
    const phone = STORE_CONFIG.phoneInternational;
    let message = `¡Hola Andrea! Estoy viendo en la boutique *A-BLISS* el producto:\n\n`;
    message += `*${product.name}*\n`;
    message += `Precio: ${STORE_CONFIG.currency} ${product.price.toFixed(2)}\n`;
    message += `Categoría: ${product.category}\n\n`;
    message += `¿Está disponible para entrega? Me gustaría más información. ¡Gracias!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
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
        cart,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        isCheckoutOpen,
        setIsCheckoutOpen,
        buildWhatsAppOrderUrl,
        buildProductWhatsAppUrl,
        toasts,
        addToast,
        removeToast,
        currentSection,
        setCurrentSection,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
