import PokemonSearch from "../components/search/PokemonSearch";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Search Pokémon</h2>
      <PokemonSearch />
    </div>
  );
}
