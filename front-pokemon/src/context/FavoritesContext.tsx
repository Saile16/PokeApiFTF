import { createContext, useContext, useState } from "react";
import { Pokemon } from "../types/pokemon";
import { favoritesService } from "../services/favoriteService";

interface FavoritesContextType {
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
  generateCode: () => Promise<string>;
  loadFavorites: (code: string) => Promise<void>;
  shareCode: string | null;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [shareCode, setShareCode] = useState<string | null>(null);

  const addFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) => {
      if (prev.find((p) => p.id === pokemon.id)) return prev;
      return [...prev, pokemon];
    });
  };

  const removeFavorite = (pokemonId: number) => {
    setFavorites((prev) => prev.filter((pokemon) => pokemon.id !== pokemonId));
  };

  const isFavorite = (pokemonId: number) => {
    return favorites.some((pokemon) => pokemon.id === pokemonId);
  };

  const generateCode = async () => {
    try {
      // Optimizamos los datos que enviamos
      const optimizedFavorites = favorites.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((type) => ({
          type: {
            name: type.type.name,
          },
        })),
        abilities: pokemon.abilities.map((ability) => ({
          ability: {
            name: ability.ability.name,
          },
          is_hidden: ability.is_hidden,
        })),
        sprites: {
          front_default: pokemon.sprites.front_default,
          other: {
            "official-artwork": {
              front_default:
                pokemon.sprites.other["official-artwork"].front_default,
            },
          },
        },
      }));
      console.log("EL POKEMON ES ", optimizedFavorites);
      const code = await favoritesService.saveFavoritesList(optimizedFavorites);
      setShareCode(code);
      return code;
    } catch (error) {
      console.error("Error generating code:", error);
      throw error;
    }
  };

  const loadFavorites = async (code: string) => {
    try {
      const loadedFavorites = await favoritesService.getFavoritesList(code);
      setFavorites(loadedFavorites);
      setShareCode(code);
    } catch (error) {
      console.error("Error loading favorites:", error);
      throw error;
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        generateCode,
        loadFavorites,
        shareCode,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
