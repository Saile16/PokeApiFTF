import axios from "axios";
import cache from "./cache.service";
import type { Pokemon } from "../types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";

export const searchPokemon = async (name: string) => {
  const cacheKey = `pokemon:${name}`;
  cache.debug();
  const cachedData = cache.get<Pokemon>(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(
      `${API_URL}/pokemon/${name.toLowerCase()}`
    );
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching Pokemon:", error);
    throw error;
  }
};

export const getPokemonTypes = async () => {
  const cacheKey = "pokemon:types";
  const cachedTypes = cache.get<{ name: string; url: string }[]>(cacheKey);

  if (cachedTypes) {
    return cachedTypes;
  }

  try {
    const response = await axios.get(`${API_URL}/type`);
    const types = response.data.results;
    cache.set(cacheKey, types);
    return types;
  } catch (error) {
    console.error("Error fetching Pokemon types:", error);
    throw error;
  }
};

export const getPokemonAbilities = async () => {
  const cacheKey = "pokemon:abilities";
  const cachedAbilities = cache.get<{ name: string; url: string }[]>(cacheKey);

  if (cachedAbilities) {
    return cachedAbilities;
  }

  try {
    const response = await axios.get(`${API_URL}/ability?limit=100`);
    const abilities = response.data.results;
    cache.set(cacheKey, abilities);
    return abilities;
  } catch (error) {
    console.error("Error fetching Pokemon abilities:", error);
    throw error;
  }
};

export const getPokemonByType = async (type: string) => {
  const cacheKey = `pokemon:type:${type}`;
  const cachedPokemon =
    cache.get<Array<{ pokemon: { name: string; url: string } }>>(cacheKey);

  if (cachedPokemon) {
    return cachedPokemon;
  }

  try {
    const response = await axios.get(`${API_URL}/type/${type}`);
    const pokemons = response.data.pokemon;
    cache.set(cacheKey, pokemons);
    return pokemons;
  } catch (error) {
    console.error("Error fetching Pokemon by type:", error);
    throw error;
  }
};

export const searchPokemonByAbility = async (ability: string) => {
  const cacheKey = `pokemon:ability:${ability}`;
  const cachedPokemon = cache.get<Pokemon[]>(cacheKey);

  if (cachedPokemon) {
    return cachedPokemon;
  }

  try {
    const response = await axios.get(`${API_URL}/ability/${ability}`);
    const pokemonPromises = response.data.pokemon
      .slice(0, 20)
      .map((p: any) => axios.get(p.pokemon.url));

    const pokemonResponses = await Promise.all(pokemonPromises);
    const results = pokemonResponses.map((response) => response.data);

    cache.set(cacheKey, results);
    return results;
  } catch (error) {
    console.error("Error searching Pokemon by ability:", error);
    throw error;
  }
};
