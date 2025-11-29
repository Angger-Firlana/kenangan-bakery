export interface Unit {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Ingredient {
  id: number;
  unit_id: number;
  name: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;

  unit?: Unit; // optional, backend kadang tidak kirim
}


export interface IngredientResponse {
  success: boolean;
  message: string;
  data: Ingredient[];
}

// ===============
// Ingredient Types
// ===============

// Payload untuk POST & PUT
export interface IngredientPayload {
  unit_id: number;
  name: string;
  price: number;
}

// GET /ingredients (list)
export interface IngredientResponse {
  success: boolean;
  message: string;
  data: Ingredient[];
}

// GET /ingredients/:id (detail)
export interface IngredientDetailResponse {
  success: boolean;
  message: string;
  data: Ingredient;
}

// POST /ingredients
export interface IngredientCreateResponse {
  success: boolean;
  message: string;
  data?: Ingredient; // beberapa backend tidak mengirim data
}

// PUT /ingredients/:id
export interface IngredientUpdateResponse {
  success: boolean;
  message: string;
  data: Ingredient;
}

// DELETE /ingredients/:id
export interface IngredientDeleteResponse {
  success: boolean;
  message: string;
}

