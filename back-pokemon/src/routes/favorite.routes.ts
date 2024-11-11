import { Router } from "express";
import {
  createFavoriteList,
  getFavoriteList,
} from "../controllers/favorite.controller";

const router = Router();

router.post("/", createFavoriteList);
router.get("/:code", getFavoriteList);

export default router;
