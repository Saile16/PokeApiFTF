import axios from "axios";
import type { Pokemon } from "../types/pokemon";

const API_URL = "http://localhost:5000/api";

export const favoritesService = {
  // Guardar lista de favoritos y obtener código
  async saveFavoritesList(pokemons: Pokemon[]) {
    console.log("LO QUE SE ESTÁ ENVIANDO PARA GUARDAR ES ", pokemons);
    try {
      const response = await axios.post(`${API_URL}/favorites`, { pokemons });
      return response.data.code;
    } catch (error) {
      console.error("Error saving favorites:", error);
      throw error;
    }
  },

  // Recuperar lista usando código
  async getFavoritesList(code: string) {
    try {
      const response = await axios.get(`${API_URL}/favorites/${code}`);
      console.log("Que datos llegan aqui ??", response.data.pokemons);
      return response.data.pokemons;
    } catch (error) {
      console.error("Error fetching favorites:", error);
      throw error;
    }
  },
};
