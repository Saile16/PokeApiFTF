import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import PokemonCard from "../components/pokemon/PokemonCard";

export default function Favorites() {
  const { favorites, generateCode, loadFavorites, shareCode } = useFavorites();
  const [loadingCode, setLoadingCode] = useState("");
  const [error, setError] = useState("");

  const handleGenerateCode = async () => {
    try {
      const code = await generateCode();
      //Copiar al portapapeles por si el usuario quiere compartirlo
      navigator.clipboard.writeText(code);
    } catch (error) {
      setError("Error generating code");
    }
  };

  const handleLoadFavorites = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loadFavorites(loadingCode);
      setLoadingCode("");
      setError("");
    } catch (error) {
      setError("There are no favorites with this code");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>

      {/* Sección de compartir y cargar */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4 items-center">
          <button
            onClick={handleGenerateCode}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={favorites.length === 0}
          >
            Generate Share Code
          </button>
          {shareCode && (
            <span className="text-green-600 font-mono">Code: {shareCode}</span>
          )}
        </div>

        <form onSubmit={handleLoadFavorites} className="flex gap-2">
          <input
            type="text"
            value={loadingCode}
            onChange={(e) => setLoadingCode(e.target.value)}
            placeholder="Enter share code"
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Load Favorites
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Lista de favoritos */}
      {favorites.length === 0 ? (
        <p className="text-gray-600 text-center">
          You haven't added any Pokémon to your favorites yet!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
