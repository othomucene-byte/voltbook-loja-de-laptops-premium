import { Laptop } from '../types';

export const LAPTOPS: Laptop[] = [
  {
    id: 'volt-air-14',
    name: 'VoltBook Air 14 M3',
    brand: 'VoltBook',
    category: 'Ultrabook',
    price: 7499,
    originalPrice: 8299,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
    badge: 'Mais Vendido',
    specs: {
      processor: 'Apple M3 / 8-core CPU',
      ram: '16 GB Memória Unificada',
      storage: '512 GB SSD NVMe',
      gpu: 'GPU 10-core integrada',
      display: '14.2" Liquid Retina 120Hz',
      battery: 'Até 18 horas',
      weight: '1.24 kg'
    },
    description: 'Chassi em alumínio reciclado ultrafino com autonomia para o dia inteiro e tela de altíssima fidelidade de cores.',
    inStock: true
  },
  {
    id: 'rog-strix-g16',
    name: 'AeroStrike G16 RTX 4070',
    brand: 'AeroStrike',
    category: 'Gamer',
    price: 11290,
    originalPrice: 12490,
    rating: 4.8,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=900&q=80',
    badge: 'Oferta Gamer',
    specs: {
      processor: 'Intel Core i9-14900HX',
      ram: '32 GB DDR5 5600MHz',
      storage: '1 TB SSD PCIe 4.0',
      gpu: 'NVIDIA GeForce RTX 4070 8GB',
      display: '16" QHD+ 240Hz IPS',
      battery: 'Até 7 horas',
      weight: '2.35 kg'
    },
    description: 'Sistema de refrigeração líquida e placa RTX série 40 para rodar qualquer jogo AAA em qualidade máxima com Ray Tracing.',
    inStock: true
  },
  {
    id: 'think-pro-z16',
    name: 'ProStation Z16 Studio',
    brand: 'ProStation',
    category: 'Workstation',
    price: 14890,
    rating: 4.9,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80',
    badge: 'Para Criadores',
    specs: {
      processor: 'AMD Ryzen 9 PRO 7940HS',
      ram: '64 GB DDR5 ECC',
      storage: '2 TB SSD NVMe Gen4',
      gpu: 'NVIDIA RTX 3000 Ada 8GB',
      display: '16" 4K OLED Touch 100% DCI-P3',
      battery: 'Até 12 horas',
      weight: '1.95 kg'
    },
    description: 'Certificado para softwares CAD, renderização 3D e edição 8K com calibração de fábrica Pantone.',
    inStock: true
  },
  {
    id: 'zen-slim-15',
    name: 'NovaBook Slim 15',
    brand: 'NovaBook',
    category: 'Custo-Benefício',
    price: 3699,
    originalPrice: 4199,
    rating: 4.6,
    reviewsCount: 218,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    badge: 'Melhor Preço',
    specs: {
      processor: 'AMD Ryzen 5 7530U',
      ram: '16 GB DDR4',
      storage: '512 GB SSD NVMe',
      gpu: 'AMD Radeon Graphics',
      display: '15.6" Full HD Antirreflexo',
      battery: 'Até 10 horas',
      weight: '1.65 kg'
    },
    description: 'Ideal para estudos, trabalho remoto e produtividade diária com teclado numérico confortável e carregamento rápido.',
    inStock: true
  },
  {
    id: 'xps-carbon-13',
    name: 'Apex Carbon 13 OLED',
    brand: 'Apex',
    category: 'Ultrabook',
    price: 8990,
    rating: 4.7,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80',
    specs: {
      processor: 'Intel Core Ultra 7 155H',
      ram: '16 GB LPDDR5x',
      storage: '1 TB SSD NVMe',
      gpu: 'Intel Arc Graphics',
      display: '13.4" 3K OLED 120Hz',
      battery: 'Até 15 horas',
      weight: '1.17 kg'
    },
    description: 'Construído em fibra de carbono aeroespacial e alumínio CNC com bordas infinitas e leitor biométrico.',
    inStock: true
  },
  {
    id: 'nitro-pulse-15',
    name: 'PulseBook V15 RTX 4050',
    brand: 'PulseBook',
    category: 'Gamer',
    price: 5890,
    originalPrice: 6490,
    rating: 4.7,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    specs: {
      processor: 'Intel Core i7-13620H',
      ram: '16 GB DDR5',
      storage: '512 GB SSD NVMe',
      gpu: 'NVIDIA GeForce RTX 4050 6GB',
      display: '15.6" Full HD 144Hz',
      battery: 'Até 6 horas',
      weight: '2.10 kg'
    },
    description: 'Entrada perfeita no universo gamer competitivo com tela de 144Hz, teclado retroiluminado e DLSS 3.',
    inStock: true
  }
];
