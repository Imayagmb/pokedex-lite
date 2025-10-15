import { useState } from 'react';
import { usePokemons } from '../hooks/usePokemons';
import { BarraDeBusca } from '../components/BarraDeBusca/BarraDeBusca';
import { FiltroPorTipo } from '../components/FiltroPorTipo/FiltroPorTipo';
import { CartaoPokemon } from '../components/CartãoPokemon/CartaoPokemon';
import { SkeletonCard } from '../components/Skeleton/SkeletonCard';
import { Paginacao } from '../components/Paginacao/Paginacao';
import { AlertCircle } from 'lucide-react';

export function Home() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtroAtivo, setFiltroAtivo] = useState(false);
  const { pokemons, loading, error, totalCount, buscarPorNome, buscarPorTipo, carregarPagina, limparFiltros } = usePokemons(1, 20);

  const handleBuscar = async (termo: string) => {
    setFiltroAtivo(!!termo);
    setPaginaAtual(1);
    await buscarPorNome(termo);
  };

  const handleFiltrarPorTipo = async (tipo: string) => {
    setFiltroAtivo(true);
    setPaginaAtual(1);
    await buscarPorTipo(tipo);
  };

  const handleLimparFiltros = async () => {
    setFiltroAtivo(false);
    setPaginaAtual(1);
    await limparFiltros();
  };

  const handleMudarPagina = async (novaPagina: number) => {
    setPaginaAtual(novaPagina);
    await carregarPagina(novaPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
            Pokédex Lite
          </h1>
          <div className="space-y-4">
            <BarraDeBusca onBuscar={handleBuscar} />
            <FiltroPorTipo onFiltrar={handleFiltrarPorTipo} onLimpar={handleLimparFiltros} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="max-w-md mx-auto bg-red-50 border-2 border-red-200 rounded-xl p-6 flex items-center gap-4 mb-8">
            <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-800 mb-1">Erro ao buscar</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(20)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : pokemons.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pokemons.map((pokemon) => (
                <CartaoPokemon key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>

            {!filtroAtivo && (
              <Paginacao
                paginaAtual={paginaAtual}
                totalItens={totalCount}
                itensPorPagina={20}
                onMudarPagina={handleMudarPagina}
                disabled={loading}
              />
            )}
          </>
        ) : (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Nenhum Pokémon encontrado</h2>
            <p className="text-gray-500">Tente buscar por outro nome ou limpar os filtros.</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>Desenvolvido por Mayara Monteiro</p>
          <p>Dados fornecidos pela <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">PokéAPI</a></p>
        </div>
      </footer>
    </div>
  );
}
