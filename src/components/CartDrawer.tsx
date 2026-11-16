import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.laptop.price * item.quantity, 0);
  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const handleCheckout = () => {
    setOrderCompleted(true);
    onClearCart();
    setTimeout(() => {
      setOrderCompleted(false);
      onClose();
    }, 2600);
  }; 

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Seu Carrinho</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {orderCompleted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">Pedido Confirmado!</h3>
              <p className="mt-2 text-sm text-slate-600">
                Obrigado por comprar na VoltBook. Você receberá o código de rastreamento em breve.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-slate-300" />
              <p className="mt-3 font-semibold text-slate-700">Seu carrinho está vazio</p>
              <p className="mt-1 text-sm text-slate-500">Explore nosso catálogo e escolha seu próximo laptop.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ laptop, quantity }) => (
                <div key={laptop.id} className="flex gap-4 rounded-2xl border border-slate-200 p-3">
                  <img
                    src={laptop.image}
                    alt={laptop.name}
                    className="h-20 w-24 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{laptop.name}</h4>
                      <button
                        onClick={() => onRemoveItem(laptop.id)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-indigo-600">
                        {formatPrice(laptop.price * quantity)}
                      </span>
                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(laptop.id, -1)}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-xs font-bold text-slate-900">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(laptop.id, 1)}
                          className="text-slate-600 hover:text-slate-900"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && !orderCompleted && (
          <div className="border-t border-slate-200 bg-slate-50 p-6">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
              <span>Frete</span>
              <span className="font-semibold text-emerald-600">Grátis</span>
            </div>
            <div className="mb-5 flex items-center justify-between text-lg font-extrabold text-slate-900">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
