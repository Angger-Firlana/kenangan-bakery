import { api } from "../services/axios";
import type { IngredientResponse } from "../types/ingredient";


// ============================
// GET Ingredients
// ============================
export const getIngredients = async (): Promise<IngredientResponse> => {
  const response = await api.get("/ingredients");
  return response.data;
};
