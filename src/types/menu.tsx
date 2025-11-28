import type { Ingredient } from "./ingredient";

// ============================
// Branch structure
// ============================
export interface Branch {
  id: number;
  name: string;
  address: string;
  city: string;
  province: string;
  open: number;
  close: number;
  phone_number: string;
  email: string;
  created_at: string;
  updated_at: string;
}

// ============================
// Menu Detail (Relation ingredient)
// ============================
export interface MenuDetail {
  id: number;
  menu_id: number;
  ingredient_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;

  ingredient: Ingredient; // relation always included
}

// ============================
// Menu Item (from API GET list)
// ============================
export interface MenuItem {
  id: number;
  type_id: number;
  branch_id: number;
  name: string;
  price: number;
  description: string;
  validDuration: number;
  stock: number;
  created_at: string;
  updated_at: string;

  photo: string | null;

  type:Type;
  branch: Branch;
  menu_details: MenuDetail[];
}

export interface Type{
  id:number;
  type_name:string;
}

// ============================
// Single menu response
// ============================
export interface MenuResponse {
  success: boolean;
  message: string;
  data: MenuItem;
}

// ============================
// Paginated menu response
// ============================
export interface MenuListResponse {
  success: boolean;
  message: string;
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  data: MenuItem[];
}

// ============================
// Menu Form (POST & PUT)
// digunakan sebelum dikirim sebagai FormData
// ============================
export interface MenuFormData {
  type_id: number;
  branch_id: number;
  name: string;
  description: string;
  price: number;
  validDuration: number;
  stock: number;

  // `details` hanya array ingredient + qty (tanpa id)
  details?: {
    ingredient_id: number;
    quantity: number;
  }[];

  // Photo file upload
  photo?: File | null;
}
