import { useState } from "react";
import { searchPokemon } from "../../services/pokemonService";
import PokemonCard from "../pokemon/PokemonCard";
import type { Pokemon } from "../../types/pokemon";

export default function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError("");
    setPokemon(null);

    try {
      const data = await searchPokemon(searchTerm);
      setPokemon(data);
    } catch (err) {
      setError("Pokémon not found");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Pokémon..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
}
