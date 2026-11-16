import { Star, ShoppingBag, Eye, Layers, Check } from 'lucide-react';
import { Laptop } from '../types';

interface LaptopCardProps {
  laptop: Laptop;
  onAddToCart: (laptop: Laptop) => void;
  onViewDetails: (laptop: Laptop) => void;
  isCompared: boolean;
  onToggleCompare: (laptop: Laptop) => void;
}

export function LaptopCard({
  laptop,
  onAddToCart,
  onViewDetails,
  isCompared,
  onToggleCompare
}: LaptopCardProps) {
  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={laptop.image}
          alt={laptop.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {laptop.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {laptop.badge}
          </span>
        )}
        <button
          onClick={() => onToggleCompare(laptop)}
          title={isCompared ? 'Remover da comparação' : 'Comparar modelo'}
          className={`absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold backdrop-blur-md transition ${
            isCompared
              ? 'bg-indigo-600 text-white'
              : 'bg-white/90 text-slate-700 hover:bg-white'
          }`}
        >
          {isCompared ? <Check className="h-3.5 w-3.5" /> : <Layers className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{isCompared ? 'Comparando' : 'Comparar'}</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-500">
          <span className="uppercase tracking-wider text-indigo-600">{laptop.category}</span>
          <span className="flex items-center gap-1 text-slate-700">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {laptop.rating} ({laptop.reviewsCount})
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900">{laptop.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{laptop.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
          <div className="truncate">
            <span className="font-semibold text-slate-800">CPU:</span> {laptop.specs.processor}
          </div>
          <div className="truncate">
            <span className="font-semibold text-slate-800">RAM:</span> {laptop.specs.ram}
          </div>
          <div className="truncate">
            <span className="font-semibold text-slate-800">SSD:</span> {laptop.specs.storage}
          </div>
          <div className="truncate">
            <span className="font-semibold text-slate-800">Tela:</span> {laptop.specs.display}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            {laptop.originalPrice && (
              <span className="block text-xs text-slate-400 line-through">
                {formatPrice(laptop.originalPrice)}
              </span>
            )}
            <span className="text-2xl font-extrabold text-slate-900">
              {formatPrice(laptop.price)}
            </span>
            <span className="block text-[11px] text-emerald-600 font-medium">
              ou 12x de {formatPrice(Math.round(laptop.price / 12))} sem juros
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(laptop)}
              aria-label={`Ver detalhes de ${laptop.name}`}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => onAddToCart(laptop)}
              className="flex h-10 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Comprar</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
