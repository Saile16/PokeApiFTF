import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AdvancedSearch from "../AdvancedSearch";

// Mock básico de los servicios que necesitamos
vi.mock("../../../services/pokemonService", () => ({
  getPokemonTypes: () =>
    Promise.resolve([
      { name: "fire", url: "url-1" },
      { name: "water", url: "url-2" },
    ]),
  getPokemonAbilities: () =>
    Promise.resolve([
      { name: "blaze", url: "url-1" },
      { name: "torrent", url: "url-2" },
    ]),
}));

// Mock simple del contexto de favoritos
vi.mock("../../../context/FavoritesContext", () => ({
  useFavorites: () => ({
    favorites: [],
    isFavorite: () => false,
  }),
}));

describe("AdvancedSearch", () => {
  it("renderiza el formulario de búsqueda con todos sus elementos", async () => {
    render(<AdvancedSearch />);

    // Verificar que los elementos principales estén presentes
    expect(
      screen.getByPlaceholderText("Search by name...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();

    // Verificar los selectores
    const selects = screen.getAllByRole("combobox");
    expect(selects).toHaveLength(2); // Debe haber dos selectores (tipo y habilidad)

    // Verificar opciones por defecto en los selectores
    expect(screen.getByText("Select Type")).toBeInTheDocument();
    expect(screen.getByText("Select Ability")).toBeInTheDocument();
  });
});
