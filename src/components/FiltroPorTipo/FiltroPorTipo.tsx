import { useEffect, useState } from 'react';
import { buscarTipos } from '../../services/api';
import { Tipo, TYPE_COLORS } from '../../types/Tipo';
import { Filter } from 'lucide-react';

interface FiltroPorTipoProps {
  onFiltrar: (tipo: string) => void;
  onLimpar: () => void;
}

const TIPOS_PRINCIPAIS = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export function FiltroPorTipo({ onFiltrar, onLimpar }: FiltroPorTipoProps) {
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarTipos();
  }, []);

  const carregarTipos = async () => {
    try {
      const data = await buscarTipos();
      const tiposFiltrados = data.results.filter(tipo =>
        TIPOS_PRINCIPAIS.includes(tipo.name)
      );
      setTipos(tiposFiltrados);
    } catch (error) {
      console.error('Erro ao carregar tipos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTipoClick = (tipo: string) => {
    if (tipoSelecionado === tipo) {
      setTipoSelecionado(null);
      onLimpar();
    } else {
      setTipoSelecionado(tipo);
      onFiltrar(tipo);
    }
  };

  if (loading) {
    return (
      <div className="flex gap-2 flex-wrap justify-center">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="h-9 w-24 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Filter className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-700">Filtrar por Tipo</h2>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {tipos.map((tipo) => (
          <button
            key={tipo.name}
            onClick={() => handleTipoClick(tipo.name)}
            className={`px-4 py-2 rounded-full text-white font-semibold capitalize transition-all duration-200 shadow-md hover:scale-105 ${
              tipoSelecionado === tipo.name ? 'ring-4 ring-offset-2 ring-gray-400 scale-105' : ''
            }`}
            style={{ backgroundColor: TYPE_COLORS[tipo.name] || '#777' }}
          >
            {tipo.name}
          </button>
        ))}
      </div>
    </div>
  );
}
