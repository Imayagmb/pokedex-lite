import { Pokemon, PokemonListResponse } from '../types/Pokemon';
import { TipoResponse } from '../types/Tipo';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function buscarPokemons(page: number = 1, limit: number = 20): Promise<PokemonListResponse> {
  const offset = (page - 1) * limit;
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('Falha ao buscar Pokémon');
  }

  return response.json();
}

export async function buscarPokemonDetalhes(nameOrId: string | number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error('Pokémon não encontrado');
  }

  return response.json();
}

export async function buscarPokemonPorNome(nome: string): Promise<Pokemon> {
  return buscarPokemonDetalhes(nome.toLowerCase());
}

export async function buscarTipos(): Promise<TipoResponse> {
  const response = await fetch(`${BASE_URL}/type?limit=18`);

  if (!response.ok) {
    throw new Error('Falha ao buscar tipos');
  }

  return response.json();
}

export async function buscarPokemonPorTipo(tipo: string): Promise<Pokemon[]> {
  const response = await fetch(`${BASE_URL}/type/${tipo}`);

  if (!response.ok) {
    throw new Error('Falha ao buscar Pokémon por tipo');
  }

  const data = await response.json();

  const pokemonPromises = data.pokemon
    .slice(0, 20)
    .map((p: { pokemon: { name: string } }) => buscarPokemonDetalhes(p.pokemon.name));

  return Promise.all(pokemonPromises);
}

export async function buscarListaPokemonDetalhes(pokemons: { name: string; url: string }[]): Promise<Pokemon[]> {
  const promises = pokemons.map(p => buscarPokemonDetalhes(p.name));
  return Promise.all(promises);
}
