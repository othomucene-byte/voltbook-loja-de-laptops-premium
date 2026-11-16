import { useState, useEffect, useMemo } from 'react';
import { SlidersHorizontal, Sparkles, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import { LAPTOPS } from './data/laptops';
import { CartItem, Laptop, LaptopCategory } from './types';
import { Navbar } from './components/Navbar';
import { LaptopCard } from './components/LaptopCard';
import { LaptopModal } from './components/LaptopModal';
import { CartDrawer } from './components/CartDrawer';
import { CompareModal } from './components/CompareModal';

const CATEGORIES: LaptopCategory[] = ['Todos', 'Ultrabook', 'Gamer', 'Workstation', 'Custo-Benefício'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LaptopCategory>('Todos');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('voltbook_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('voltbook_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (laptop: Laptop) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.laptop.id === laptop.id);
      if (existing) {
        return prev.map((item) =>
          item.laptop.id === laptop.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { laptop, quantity: 1 }];
    });
    showToast(`${laptop.name} adicionado ao carrinho`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.laptop.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.laptop.id !== id));
  };

  const handleToggleCompare = (laptop: Laptop) => {
    setCompareIds((prev) => {
      if (prev.includes(laptop.id)) {
        return prev.filter((id) => id !== laptop.id);
      }
      if (prev.length >= 3) {
        showToast('Você pode comparar no máximo 3 laptops por vez.');
        return prev;
      }
      return [...prev, laptop.id];
    });
  };

  const filteredLaptops = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = LAPTOPS.filter((laptop) => {
      const matchesCategory = selectedCategory === 'Todos' || laptop.category === selectedCategory;
      const matchesQuery =
        !query ||
        laptop.name.toLowerCase().includes(query) ||
        laptop.brand.toLowerCase().includes(query) ||
        laptop.specs.processor.toLowerCase().includes(query) ||
        laptop.specs.gpu.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [searchQuery, selectedCategory, sortBy]);

  const comparedLaptops = LAPTOPS.filter((l) => compareIds.includes(l.id));
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        compareCount={compareIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-white shadow-xl sm:px-12 sm:py-16">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3.5 py-1 text-xs font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Nova Linha 2025 disponível
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Performance sem limites para trabalhar, criar e jogar.
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg">
              Escolha entre ultrabooks ultrafinos, máquinas gamers com RTX série 40 e workstations certificadas com frete grátis para todo o Brasil.
            </p>
          </div>
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <Truck className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm font-bold text-slate-900">Frete Grátis Expresso</p>
              <p className="text-xs text-slate-500">Entrega segurada em todo o país</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <ShieldCheck className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm font-bold text-slate-900">Garantia Estendida</p>
              <p className="text-xs text-slate-500">24 meses de suporte especializado</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <CreditCard className="h-6 w-6 text-indigo-600" />
            <div>
              <p className="text-sm font-bold text-slate-900">Até 12x Sem Juros</p>
              <p className="text-xs text-slate-500">Ou 10% OFF no PIX</p>
            </div>
          </div>
        </section>

        <section className="mt-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
            >
              <option value="featured">Destaques</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
            </select>
          </div>
        </section>

        {filteredLaptops.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-lg font-bold text-slate-800">Nenhum laptop encontrado</p>
            <p className="mt-1 text-sm text-slate-500">Tente ajustar os filtros ou buscar por outro termo.</p>
          </div>
        ) : (
          <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLaptops.map((laptop) => (
              <LaptopCard
                key={laptop.id}
                laptop={laptop}
                onAddToCart={handleAddToCart}
                onViewDetails={setSelectedLaptop}
                isCompared={compareIds.includes(laptop.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </section>
        )}
      </main>

      <LaptopModal
        laptop={selectedLaptop}
        onClose={() => setSelectedLaptop(null)}
        onAddToCart={handleAddToCart}
      />

      <CompareModal
        isOpen={isCompareOpen}
        laptops={comparedLaptops}
        onClose={() => setIsCompareOpen(false)}
        onRemove={(id) => setCompareIds((prev) => prev.filter((item) => item !== id))}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />

      {toastMessage && (
        <div className="fixed right-4 bottom-4 z-50 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
