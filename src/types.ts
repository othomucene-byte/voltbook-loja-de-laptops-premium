export type LaptopCategory = 'Todos' | 'Ultrabook' | 'Gamer' | 'Workstation' | 'Custo-Benefício';

export interface Laptop {
  id: string;
  name: string;
  brand: string;
  category: Exclude<LaptopCategory, 'Todos'>;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    gpu: string;
    display: string;
    battery: string;
    weight: string;
  };
  description: string;
  inStock: boolean;
}

export interface CartItem {
  laptop: Laptop;
  quantity: number;
}
