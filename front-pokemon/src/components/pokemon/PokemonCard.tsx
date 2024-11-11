import { Pokemon } from "../../types/pokemon";
import { useFavorites } from "../../context/FavoritesContext";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(pokemon.id);

  const handleFavoriteClick = () => {
    if (isCurrentlyFavorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  // Formato del número de Pokémon (ejemplo: #001, #025, #150)
  const formatPokemonNumber = (id: number) => {
    return `#${String(id).padStart(3, "0")}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative hover:shadow-lg transition-shadow">
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 text-2xl text-yellow-400 hover:scale-110 transition-transform"
        aria-label={
          isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"
        }
      >
        {isCurrentlyFavorite ? "★" : "☆"}
      </button>

      {/* Número de Pokémon */}
      <span className="absolute top-2 left-2 text-sm font-mono text-gray-500">
        {formatPokemonNumber(pokemon.id)}
      </span>

      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={`${pokemon.name} official artwork`}
        className="w-full h-48 object-contain"
      />

      <h3 className="text-xl font-bold capitalize mt-2 text-center">
        {pokemon.name}
      </h3>

      {/* Tipos */}
      <div className="flex gap-2 mt-2 justify-center">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {type.type.name}
          </span>
        ))}
      </div>

      {/* Habilidades */}
      <div className="mt-3">
        <h4 className="text-sm font-semibold text-gray-700 mb-1">Abilities:</h4>
        <div className="flex flex-wrap gap-1">
          {pokemon.abilities.map((ability, index) => (
            <span
              key={ability.ability.name}
              className={`text-xs px-2 py-1 rounded-full ${
                ability.is_hidden
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {ability.ability.name.replace("-", " ")}
              {ability.is_hidden && " (Hidden)"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
