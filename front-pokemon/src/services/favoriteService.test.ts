import { describe, it, expect, vi, beforeEach } from "vitest";
import { favoritesService } from "./favoriteService";
import axios from "axios";

// Mock de axios
vi.mock("axios");

describe("favoritesService", () => {
  // Mock de datos de prueba
  const mockPokemonList = [
    {
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
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("guarda la lista de favoritos y retorna un código", async () => {
    // Configurar el mock de axios para el post
    const mockCode = "ABC123";
    (axios.post as any).mockResolvedValue({
      data: { code: mockCode },
    });

    // Llamar al servicio
    const code = await favoritesService.saveFavoritesList(mockPokemonList);

    // Verificar que axios.post fue llamado correctamente
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/api/favorites",
      { pokemons: mockPokemonList }
    );

    // Verificar que retorna el código correcto
    expect(code).toBe(mockCode);
  });

  it("recupera la lista de favoritos usando un código", async () => {
    // Configurar el mock de axios para el get
    (axios.get as any).mockResolvedValue({
      data: { pokemons: mockPokemonList },
    });

    // Llamar al servicio
    const pokemons = await favoritesService.getFavoritesList("ABC123");

    // Verificar que axios.get fue llamado correctamente
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:5000/api/favorites/ABC123"
    );

    // Verificar que retorna la lista correcta
    expect(pokemons).toEqual(mockPokemonList);
  });

  it("maneja errores al guardar favoritos", async () => {
    // Configurar el mock de axios para simular un error
    (axios.post as any).mockRejectedValue(new Error("Network error"));

    // Verificar que el servicio lanza el error
    await expect(
      favoritesService.saveFavoritesList(mockPokemonList)
    ).rejects.toThrow("Network error");
  });
});
