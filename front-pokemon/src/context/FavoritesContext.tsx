import { createContext, useContext, useState } from "react";
import { Pokemon } from "../types/pokemon";

interface FavoritesContextType {
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

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

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
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
