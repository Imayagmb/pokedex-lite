import { Pokemon } from '../../types/Pokemon';
import { TYPE_COLORS } from '../../types/Tipo';
import { BarrasDeStatus, convertPokemonStats } from '../BarraDeStatus/BarrasDeStatus';

interface CartaoPokemonProps {
  pokemon: Pokemon;
}

export function CartaoPokemon({ pokemon }: CartaoPokemonProps) {
  const stats = convertPokemonStats(pokemon.stats);
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col min-w-[280px]">
      <div className="flex justify-center mb-4">
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-32 h-32 object-contain drop-shadow-lg"
          loading="lazy"
        />
      </div>

      <h3 className="text-xl font-bold text-center capitalize mb-3 text-gray-800">
        {pokemon.name}
      </h3>

      <div className="flex gap-2 justify-center mb-4 flex-wrap">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="px-3 py-1 rounded-full text-white text-sm font-semibold capitalize shadow-sm"
            style={{ backgroundColor: TYPE_COLORS[type.type.name] || '#777' }}
          >
            {type.type.name}
          </span>
        ))}
      </div>

      <div className="mt-auto">
        <BarrasDeStatus stats={stats} />
      </div>
    </div>
  );
}
