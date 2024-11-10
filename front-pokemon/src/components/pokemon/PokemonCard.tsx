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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 text-2xl"
        aria-label={
          isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"
        }
      >
        {isCurrentlyFavorite ? "★" : "☆"}
      </button>

      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="w-full h-48 object-contain"
      />
      <h3 className="text-xl font-bold capitalize mt-2">{pokemon.name}</h3>
      <div className="flex gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
