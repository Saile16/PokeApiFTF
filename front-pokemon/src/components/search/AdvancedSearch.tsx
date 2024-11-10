import { useState, useEffect } from "react";
import {
  searchPokemon,
  getPokemonTypes,
  getPokemonAbilities,
  getPokemonByType,
} from "../../services/pokemonService";

import type { Pokemon } from "../../types/pokemon";
import PokemonCard from "../pokemon/PokemonCard";

export default function AdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedAbility, setSelectedAbility] = useState("");
  const [types, setTypes] = useState<{ name: string; url: string }[]>([]);
  const [abilities, setAbilities] = useState<{ name: string; url: string }[]>(
    []
  );
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar tipos y habilidades al montar el componente
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [typesData, abilitiesData] = await Promise.all([
          getPokemonTypes(),
          getPokemonAbilities(),
        ]);
        setTypes(typesData);
        setAbilities(abilitiesData);
      } catch (error) {
        setError("Error loading filters");
      }
    };
    loadFilters();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResults([]);

    try {
      if (searchTerm) {
        const pokemon = await searchPokemon(searchTerm);
        setResults([pokemon]);
      } else if (selectedType) {
        const pokemonList = await getPokemonByType(selectedType);
        // Limitamos a 20 resultados para no sobrecargar
        const detailedResults = await Promise.all(
          pokemonList.slice(0, 20).map(async (p: any) => {
            const response = await searchPokemon(p.pokemon.name);
            return response;
          })
        );
        setResults(detailedResults);
      }
    } catch (err) {
      setError("Error searching Pokemon");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">Select Type</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>

          <select
            value={selectedAbility}
            onChange={(e) => setSelectedAbility(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">Select Ability</option>
            {abilities.map((ability) => (
              <option key={ability.name} value={ability.name}>
                {ability.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="text-red-500 text-center my-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {results.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
