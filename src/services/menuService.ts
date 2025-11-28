// src/modules/services/menuService.ts
import { api } from "../services/axios";
import type { MenuItem } from "../types/menu";

export interface CreateMenuPayload {
  type_id: number;
  branch_id: number;
  name: string;
  price: number;
  description: string;
  validDuration: number;
  stock: number;
  photo?: File | null;
  details?: { ingredient_id: number; quantity: number }[];
}

export interface UpdateMenuPayload {
  type_id?: number;
  branch_id?: number;
  name?: string;
  price?: number;
  description?: string;
  validDuration?: number;
  stock?: number;
  photo?: File | null;
  details?: { ingredient_id: number; quantity: number }[];
}

// Helper: append object entries to FormData
function appendFormData(formData: FormData, key: string, value: any) {
  if (value === undefined || value === null) return;
  formData.append(key, value);
}

export const getMenus = async (): Promise<MenuItem[]> => {
  const res = await api.get("/menus");
  // handle both shapes: { success, data: [...] } or directly array
  return res.data?.data ?? res.data;
};

export const getMenuById = async (id: number): Promise<MenuItem> => {
  const res = await api.get(`/menus/${id}`);
  return res.data?.data ?? res.data;
};

export const createMenu = async (payload: CreateMenuPayload): Promise<MenuItem> => {
  const formData = new FormData();

  appendFormData(formData, "type_id", String(payload.type_id));
  appendFormData(formData, "branch_id", String(payload.branch_id));
  appendFormData(formData, "name", payload.name);
  appendFormData(formData, "description", payload.description);
  appendFormData(formData, "price", String(payload.price));
  appendFormData(formData, "validDuration", String(payload.validDuration));
  appendFormData(formData, "stock", String(payload.stock));

  if (payload.photo) formData.append("photo", payload.photo);

  if (payload.details && Array.isArray(payload.details)) {
    payload.details.forEach((d, i) => {
      appendFormData(formData, `details[${i}][ingredient_id]`, String(d.ingredient_id));
      appendFormData(formData, `details[${i}][quantity]`, String(d.quantity));
    });
  }

  const res = await api.post("/menus", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data?.data ?? res.data;
};

export const updateMenu = async (id: number, payload: UpdateMenuPayload): Promise<MenuItem> => {
  const formData = new FormData();

  if (payload.type_id !== undefined) formData.append("type_id", String(payload.type_id));
  if (payload.branch_id !== undefined) formData.append("branch_id", String(payload.branch_id));
  if (payload.name !== undefined) formData.append("name", payload.name);
  if (payload.description !== undefined) formData.append("description", payload.description);
  if (payload.price !== undefined) formData.append("price", String(payload.price));
  if (payload.validDuration !== undefined) formData.append("validDuration", String(payload.validDuration));
  if (payload.stock !== undefined) formData.append("stock", String(payload.stock));

  if (payload.photo) formData.append("photo", payload.photo);

  if (payload.details && Array.isArray(payload.details)) {
    payload.details.forEach((d, i) => {
      formData.append(`details[${i}][ingredient_id]`, String(d.ingredient_id));
      formData.append(`details[${i}][quantity]`, String(d.quantity));
    });
  }

  // Using _method=PUT for multipart compatibility with some backends (Laravel, etc.)
  const res = await api.post(`/menus/${id}?_method=PUT`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data?.data ?? res.data;
};

export const deleteMenu = async (id: number): Promise<boolean> => {
  const res = await api.delete(`/menus/${id}`);
  return res.data?.success ?? true;
};
