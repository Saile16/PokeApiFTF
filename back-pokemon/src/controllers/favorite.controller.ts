import { RequestHandler } from "express";
import { FavoriteList } from "../models/FavoriteList";
import { generateUniqueCode } from "../utils/codeGenerator";
import { NotFoundError, BadRequestError } from "../middleware/errorHandler";

export const createFavoriteList: RequestHandler = async (req, res, next) => {
  try {
    const { pokemons } = req.body;

    if (!pokemons || !Array.isArray(pokemons) || pokemons.length === 0) {
      throw new BadRequestError("Invalid or empty pokemon list");
    }

    const code = await generateUniqueCode();

    // Crear directamente el documento
    await FavoriteList.create({
      code,
      pokemons: pokemons,
    });

    res.status(201).json({ code });
  } catch (error) {
    console.error("Create Error:", error);
    next(error);
  }
};

export const getFavoriteList: RequestHandler = async (req, res, next) => {
  try {
    const { code } = req.params;

    if (!code) {
      throw new BadRequestError("Code is required");
    }

    const list = await FavoriteList.findOne({ code }).lean();

    if (!list) {
      throw new NotFoundError("Favorite list not found");
    }

    res.json(list);
  } catch (error) {
    console.error("Get Error:", error);
    next(error);
  }
};
