export type ProductCategory = 
  | 'Bolsos y carteras'
  | 'Accesorios y joyería'
  | 'Belleza y cuidado personal'
  | 'Regalos'
  | 'Moda y complementos';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  description: string;
  longDescription?: string;
  image: string;
  tag?: 'Nuevo' | 'Oferta' | 'Más vendido';
  isFeatured?: boolean;
  isNewArrival?: boolean;
  rating?: number;
  details?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerOrderData {
  fullName: string;
  phone: string;
  address: string;
  cityOrDistrict: string;
  notes?: string;
}

export interface StoreConfig {
  name: string;
  slogan: string;
  owner: string;
  phoneDisplay: string;
  phoneInternational: string;
  email: string;
  currency: string;
  currencyCode: string;
  deliveryNotice: string;
  categories: {
    name: ProductCategory;
    image: string;
    description: string;
  }[];
}
