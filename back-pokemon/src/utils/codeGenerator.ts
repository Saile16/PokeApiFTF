import { FavoriteList } from "../models/FavoriteList";

export const generateUniqueCode = async (): Promise<string> => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code: string;
  let isUnique = false;

  while (!isUnique) {
    code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Verificar que el código no existe
    const existingList = await FavoriteList.findOne({ code });
    if (!existingList) {
      isUnique = true;
      return code;
    }
  }

  throw new Error("Could not generate unique code");
};
