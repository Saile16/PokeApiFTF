import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2";

export const searchPokemon = async (name: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/pokemon/${name.toLowerCase()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching Pokemon:", error);
    throw error;
  }
};

// Obtener todos los tipos de Pokémon
export const getPokemonTypes = async () => {
  try {
    const response = await axios.get(`${API_URL}/type`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokemon types:", error);
    throw error;
  }
};

// Obtener todas las habilidades
export const getPokemonAbilities = async () => {
  try {
    const response = await axios.get(`${API_URL}/ability?limit=100`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokemon abilities:", error);
    throw error;
  }
};

// Buscar Pokémon por tipo
export const getPokemonByType = async (type: string) => {
  try {
    const response = await axios.get(`${API_URL}/type/${type}`);
    return response.data.pokemon;
  } catch (error) {
    console.error("Error fetching Pokemon by type:", error);
    throw error;
  }
};
