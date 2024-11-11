import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import PokemonCard from "../PokemonCard";
import type { Pokemon } from "../../../types/pokemon";

// Mock del hook useFavorites
vi.mock("../../../context/FavoritesContext", () => ({
  useFavorites: () => ({
    favorites: [],
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    isFavorite: vi.fn(() => false),
    generateCode: vi.fn(),
    loadFavorites: vi.fn(),
    shareCode: null,
  }),
}));

describe("PokemonCard", () => {
  const mockPokemon: Pokemon = {
    id: 25,
    name: "pikachu",
    types: [{ type: { name: "electric" } }],
    abilities: [
      {
        ability: { name: "static" },
        is_hidden: false,
      },
      {
        ability: { name: "lightning-rod" },
        is_hidden: true,
      },
    ],
    sprites: {
      front_default: "test-image-url",
      other: {
        "official-artwork": {
          front_default: "test-image-url",
        },
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra el nombre del Pokémon", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  it("muestra el número de Pokémon", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("#025")).toBeInTheDocument();
  });

  it("muestra el tipo del Pokémon", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("electric")).toBeInTheDocument();
  });

  it("muestra las habilidades", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("static")).toBeInTheDocument();
    expect(screen.getByText(/lightning rod/)).toBeInTheDocument();
  });

  it("identifica las habilidades ocultas", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const hiddenAbility = screen.getByText(/lightning rod \(Hidden\)/);
    expect(hiddenAbility).toBeInTheDocument();
  });
});
