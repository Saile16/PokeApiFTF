import mongoose from "mongoose";

// Definimos el esquema para el tipo
const typeSchema = new mongoose.Schema(
  {
    type: {
      name: String,
    },
  },
  { _id: false }
); // Importante: deshabilitamos el _id automático para los subdocumentos

// Definimos el esquema para la habilidad
const abilitySchema = new mongoose.Schema(
  {
    ability: {
      name: String,
    },
  },
  { _id: false }
);

// Definimos el esquema para los sprites
const spritesSchema = new mongoose.Schema(
  {
    front_default: String,
    other: {
      "official-artwork": {
        front_default: String,
      },
    },
  },
  { _id: false }
);

// Definimos el esquema para un Pokémon
const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: String,
  types: [typeSchema],
  abilities: [abilitySchema],
  sprites: spritesSchema,
});

// Esquema principal
const favoriteListSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  pokemons: [pokemonSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800,
  },
});

export const FavoriteList = mongoose.model("FavoriteList", favoriteListSchema);
