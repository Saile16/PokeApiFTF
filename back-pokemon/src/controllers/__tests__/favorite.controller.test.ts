import { describe, it, expect, vi, beforeEach } from "vitest";
import { createFavoriteList, getFavoriteList } from "../favorite.controller";
import { FavoriteList } from "../../models/FavoriteList";

// Mock del modelo de mongoose
vi.mock("../models/FavoriteList", () => ({
  FavoriteList: {
    findOne: vi.fn(),
    prototype: {
      save: vi.fn(),
    },
  },
}));

// Mock para generateUniqueCode
vi.mock("../utils/codeGenerator", () => ({
  generateUniqueCode: vi.fn(() => "TEST123"),
}));

describe("Favorite Controller", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock response object
    res = {
      status: vi.fn(() => res),
      json: vi.fn(),
    };

    // Mock next function
    next = vi.fn();
  });

  describe("createFavoriteList", () => {
    it("should handle empty pokemon list", async () => {
      req = {
        body: {
          pokemons: [],
        },
      };

      await createFavoriteList(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
