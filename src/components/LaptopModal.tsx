import { X, ShoppingBag, Shield, CheckCircle2 } from 'lucide-react';
import { Laptop } from '../types';

interface LaptopModalProps {
  laptop: Laptop | null;
  onClose: () => void;
  onAddToCart: (laptop: Laptop) => void;
}

export function LaptopModal({ laptop, onClose, onAddToCart }: LaptopModalProps) {
  if (!laptop) return null;

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const specRows = [
    { label: 'Processador', value: laptop.specs.processor },
    { label: 'Memória RAM', value: laptop.specs.ram },
    { label: 'Armazenamento', value: laptop.specs.storage },
    { label: 'Placa de Vídeo', value: laptop.specs.gpu },
    { label: 'Tela', value: laptop.specs.display },
    { label: 'Bateria', value: laptop.specs.battery },
    { label: 'Peso', value: laptop.specs.weight }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="bg-slate-100">
            <img
              src={laptop.image}
              alt={laptop.name}
              className="h-full min-h-[260px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              {laptop.brand} • {laptop.category}
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">{laptop.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{laptop.description}</p>

            <div className="mt-5 space-y-2 rounded-2xl bg-slate-50 p-4">
              {specRows.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 border-b border-slate-200/70 pb-1.5 text-xs last:border-none last:pb-0">
                  <span className="font-medium text-slate-500">{spec.label}</span>
                  <span className="text-right font-semibold text-slate-900">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-emerald-600" />
                Garantia de 2 anos
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Envio imediato
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
              <div>
                {laptop.originalPrice && (
                  <span className="block text-xs text-slate-400 line-through">
                    {formatPrice(laptop.originalPrice)}
                  </span>
                )}
                <span className="text-2xl font-extrabold text-slate-900">
                  {formatPrice(laptop.price)}
                </span>
              </div>
              <button
                onClick={() => {
                  onAddToCart(laptop);
                  onClose();
                }}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <ShoppingBag className="h-4 w-4" />
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
