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
