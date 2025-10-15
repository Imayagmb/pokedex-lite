import { useState, useEffect, useCallback } from 'react';
import { Pokemon } from '../types/Pokemon';
import {
  buscarPokemons,
  buscarListaPokemonDetalhes,
  buscarPokemonPorNome,
  buscarPokemonPorTipo,
} from '../services/api';

interface UsePokemonsReturn {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  buscarPorNome: (nome: string) => Promise<void>;
  buscarPorTipo: (tipo: string) => Promise<void>;
  carregarPagina: (page: number) => Promise<void>;
  limparFiltros: () => Promise<void>;
}

export function usePokemons(initialPage: number = 1, limit: number = 20): UsePokemonsReturn {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const carregarPagina = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await buscarPokemons(page, limit);
      setTotalCount(data.count);
      const detalhes = await buscarListaPokemonDetalhes(data.results);
      setPokemons(detalhes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const buscarPorNome = async (nome: string) => {
    if (!nome.trim()) {
      await carregarPagina(1);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const pokemon = await buscarPokemonPorNome(nome);
      setPokemons([pokemon]);
      setTotalCount(1);
    } catch (err) {
       console.error(err);
      setError('Pokémon não encontrado');
      setPokemons([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const buscarPorTipo = async (tipo: string) => {
    try {
      setLoading(true);
      setError(null);
      const resultado = await buscarPokemonPorTipo(tipo);
      setPokemons(resultado);
      setTotalCount(resultado.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar por tipo');
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  const limparFiltros = async () => {
    await carregarPagina(1);
  };

  useEffect(() => {
    carregarPagina(initialPage);
  }, [carregarPagina, initialPage]);

  return {
    pokemons,
    loading,
    error,
    totalCount,
    buscarPorNome,
    buscarPorTipo,
    carregarPagina,
    limparFiltros,
  };
}
