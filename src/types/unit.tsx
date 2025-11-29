// ===============
// Unit Types
// ===============

export interface Unit {
  id: number;
  unit_name: string;
}

// Payload for POST & PUT
export interface UnitPayload {
  unit_name: string;
}

// GET list
export interface UnitResponse {
  success: boolean;
  message: string;
  data: Unit[];
}

// GET detail
export interface UnitDetailResponse {
  success: boolean;
  message: string;
  data: Unit;
}

// POST
export interface UnitCreateResponse {
  success: boolean;
  message: string;
  data: Unit;
}

// PUT
export interface UnitUpdateResponse {
  success: boolean;
  message: string;
  data: Unit;
}

// DELETE
export interface UnitDeleteResponse {
  success: boolean;
  message: string;
}
