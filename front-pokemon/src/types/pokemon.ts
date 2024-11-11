export interface Pokemon {
  id: number; // Número/ID del Pokémon
  name: string; // Nombre del Pokémon
  types: {
    // Tipos del Pokémon
    type: {
      name: string;
    };
  }[];
  abilities: {
    // Habilidades
    ability: {
      name: string;
    };
  }[];
  sprites: {
    // Imágenes (solo las que usamos)
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}
