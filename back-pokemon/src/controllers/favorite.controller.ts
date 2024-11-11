import { RequestHandler } from "express";
import { FavoriteList } from "../models/FavoriteList";
import { generateUniqueCode } from "../utils/codeGenerator";

export const createFavoriteList: RequestHandler = async (req, res) => {
  try {
    const { pokemons } = req.body;
    const code = await generateUniqueCode();

    console.log("1. DATOS RECIBIDOS:", JSON.stringify(pokemons, null, 2));

    const favoriteList = new FavoriteList({
      code,
      pokemons,
    });

    const saved = await favoriteList.save();
    console.log("2. DATOS GUARDADOS:", JSON.stringify(saved, null, 2));

    res.status(201).json({ code });
  } catch (error) {
    console.error("Error completo:", error);
    res.status(500).json({ message: "Error creating favorite list" });
  }
};

export const getFavoriteList: RequestHandler = async (req, res) => {
  try {
    const { code } = req.params;
    const list = await FavoriteList.findOne({ code });

    if (!list) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving favorite list" });
  }
};
