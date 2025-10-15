import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';

interface BarraDeBuscaProps {
  onBuscar: (termo: string) => void;
  placeholder?: string;
}

export function BarraDeBusca({ onBuscar, placeholder = 'Buscar Pokémon...' }: BarraDeBuscaProps) {
  const [termo, setTermo] = useState('');

  const handleBuscar = () => {
    onBuscar(termo);
  };

  const handleLimpar = () => {
    setTermo('');
    onBuscar('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBuscar();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTermo(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={termo}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-800 placeholder:text-gray-400"
          />
          {termo && (
            <button
              onClick={handleLimpar}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Limpar busca"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <button
          onClick={handleBuscar}
          className="md:hidden bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-md"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
