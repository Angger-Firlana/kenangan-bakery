import {api} from './axios';
import type { UnitResponse } from '../types/unit';
// =============================
// GET ALL UNITS
// =============================
export const getUnits = async (): Promise<UnitResponse> => {
    const response = await api.get('/units');
    return response.data;
}