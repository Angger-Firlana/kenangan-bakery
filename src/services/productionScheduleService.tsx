// src/modules/services/productionScheduleService.ts
import { api } from "../services/axios";
import type {
  ProductionSchedule,
  ProductionScheduleDetail,
} from "../types/productionSchedule";

export interface CreateSchedulePayload {
  branch_id: number;
  schedule_date: string; // "YYYY-MM-DD"
  status?: string; // default "pending"
  details: {
    menu_id: number;
    quantity: number;
  }[];
}

export interface UpdateSchedulePayload {
  branch_id?: number;
  schedule_date?: string; // "YYYY-MM-DD"
  status?: string;
  details?: ({
    id?: number; // include when editing existing detail
    menu_id: number;
    quantity: number;
  })[];
}

export const getSchedules = async (): Promise<ProductionSchedule[]> => {
  const res = await api.get("/production-schedules");
  // API returns { success, data: [...] }
  return res.data?.data ?? res.data;
};

export const getScheduleById = async (id: number): Promise<ProductionSchedule> => {
  const res = await api.get(`/production-schedules/${id}`);
  return res.data?.data ?? res.data;
};

export const createSchedule = async (payload: CreateSchedulePayload) => {
  const res = await api.post("/production-schedules", payload);
  return res.data;
};

export const updateSchedule = async (id: number, payload: UpdateSchedulePayload) => {
  // backend supports PUT; if it requires _method hack adjust accordingly
  const res = await api.put(`/production-schedules/${id}`, payload);
  return res.data;
};

export const deleteSchedule = async (id: number) => {
  const res = await api.delete(`/production-schedules/${id}`);
  return res.data;
};
