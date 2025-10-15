import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginacaoProps {
  paginaAtual: number;
  totalItens: number;
  itensPorPagina: number;
  onMudarPagina: (pagina: number) => void;
  disabled?: boolean;
}

export function Paginacao({
  paginaAtual,
  totalItens,
  itensPorPagina,
  onMudarPagina,
  disabled = false,
}: PaginacaoProps) {
  const totalPaginas = Math.ceil(totalItens / itensPorPagina);
  const temPaginaAnterior = paginaAtual > 1;
  const temProximaPagina = paginaAtual < totalPaginas;

  const handleAnterior = () => {
    if (temPaginaAnterior && !disabled) {
      onMudarPagina(paginaAtual - 1);
    }
  };

  const handleProxima = () => {
    if (temProximaPagina && !disabled) {
      onMudarPagina(paginaAtual + 1);
    }
  };

  if (totalPaginas <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={handleAnterior}
        disabled={!temPaginaAnterior || disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
          temPaginaAnterior && !disabled
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <span className="text-gray-700 font-semibold px-4">
        Página {paginaAtual} de {totalPaginas}
      </span>

      <button
        onClick={handleProxima}
        disabled={!temProximaPagina || disabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
          temProximaPagina && !disabled
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <span className="hidden sm:inline">Próxima</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
