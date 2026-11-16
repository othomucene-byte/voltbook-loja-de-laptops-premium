import { X, Trash2 } from 'lucide-react';
import { Laptop } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  laptops: Laptop[];
  onClose: () => void;
  onRemove: (id: string) => void;
} 

export function CompareModal({ isOpen, laptops, onClose, onRemove }: CompareModalProps) {
  if (!isOpen) return null;

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const rows: { label: string; getValue: (l: Laptop) => string }[] = [
    { label: 'Preço', getValue: (l) => formatPrice(l.price) },
    { label: 'Categoria', getValue: (l) => l.category },
    { label: 'Processador', getValue: (l) => l.specs.processor },
    { label: 'Memória RAM', getValue: (l) => l.specs.ram },
    { label: 'Armazenamento', getValue: (l) => l.specs.storage },
    { label: 'Placa de Vídeo', getValue: (l) => l.specs.gpu },
    { label: 'Tela', getValue: (l) => l.specs.display },
    { label: 'Bateria', getValue: (l) => l.specs.battery },
    { label: 'Peso', getValue: (l) => l.specs.weight }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Comparador de Laptops</h2>
            <p className="text-sm text-slate-500">Compare até 3 modelos lado a lado</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {laptops.length === 0 ? (
          <p className="py-12 text-center text-slate-500">Nenhum laptop selecionado para comparação.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[540px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 pr-4 font-semibold text-slate-500">Especificação</th>
                  {laptops.map((laptop) => (
                    <th key={laptop.id} className="px-4 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900">{laptop.name}</span>
                        <button
                          onClick={() => onRemove(laptop.id)}
                          className="text-slate-400 hover:text-rose-600"
                          title="Remover"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr key={row.label}>
                    <td className="py-3 pr-4 font-medium text-slate-500">{row.label}</td>
                    {laptops.map((laptop) => (
                      <td key={laptop.id} className="px-4 py-3 font-semibold text-slate-800">
                        {row.getValue(laptop)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
