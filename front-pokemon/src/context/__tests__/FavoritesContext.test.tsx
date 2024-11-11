import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FavoritesProvider, useFavorites } from "../FavoritesContext";

// Mock del servicio
vi.mock("../services/favoriteService", () => ({
  favoritesService: {
    saveFavoritesList: vi.fn(),
    getFavoritesList: vi.fn(),
  },
}));

// Importamos el servicio después del mock
import { favoritesService } from "../../services/favoriteService";

describe("FavoritesContext", () => {
  const mockPokemon = {
    id: 1,
    name: "bulbasaur",
    types: [{ type: { name: "grass" } }],
    abilities: [{ ability: { name: "overgrow" }, is_hidden: false }],
    sprites: {
      front_default: "url-test",
      other: {
        "official-artwork": {
          front_default: "url-test",
        },
      },
    },
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <FavoritesProvider>{children}</FavoritesProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("permite agregar y remover favoritos", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockPokemon);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe(mockPokemon.id);

    act(() => {
      result.current.removeFavorite(mockPokemon.id);
    });

    expect(result.current.favorites).toHaveLength(0);
  });
});
