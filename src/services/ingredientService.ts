// src/services/ingredientService.ts
import { api } from "../services/axios";
import type {
  IngredientResponse,
  IngredientDetailResponse,
  IngredientPayload
} from "../types/ingredient";

// =============================
// GET ALL INGREDIENTS
// =============================
export const getIngredients = async (): Promise<IngredientResponse> => {
  const response = await api.get("/ingredients");
  return response.data;
};

// =============================
// GET DETAIL INGREDIENT
// =============================
export const getIngredientById = async (id: number): Promise<IngredientDetailResponse> => {
  const response = await api.get(`/ingredients/${id}`);
  return response.data;
};

// =============================
// CREATE INGREDIENT (POST)
// =============================
export const createIngredient = async (
  data: IngredientPayload
): Promise<any> => {
  const response = await api.post("/ingredients", data);
  return response.data;
};

// =============================
// UPDATE INGREDIENT (PUT)
// =============================
export const updateIngredient = async (
  id: number,
  data: IngredientPayload
): Promise<any> => {
  const response = await api.put(`/ingredients/${id}`, data);
  return response.data;
};

// =============================
// DELETE INGREDIENT
// =============================
export const deleteIngredient = async (id: number): Promise<any> => {
  const response = await api.delete(`/ingredients/${id}`);
  return response.data;
};
