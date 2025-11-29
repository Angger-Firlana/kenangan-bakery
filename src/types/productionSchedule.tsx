// src/modules/types/productionSchedule.ts
export type ScheduleStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface ProductionScheduleDetail {
  id?: number; // may be absent when creating new detail
  production_schedule_id?: number;
  menu_id: number;
  quantity: number;
  status?: 'pending' | 'in_progress' | 'done' | string;
  created_at?: string;
  updated_at?: string;

  // relation
  menu?: {
    id: number;
    name: string;
    price?: number;
    description?: string;
    photo?: string | null;
    stock?: number;
  };
}

export interface ProductionSchedule {
  id: number;
  branch_id: number;
  schedule_date: string; // ISO string from API (e.g. "2025-11-20T00:00:00.000000Z")
  status: ScheduleStatus | string;
  created_at?: string;
  updated_at?: string;
  production_schedule_details: ProductionScheduleDetail[];
}
