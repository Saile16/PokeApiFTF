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
