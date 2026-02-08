import api from "@/shared/config/api";
import type { APIResponse, ListAPIResponse } from "@/shared/types/api";
import type { Attendance } from "@/shared/types/attendance";

/* =======================
   TYPES
======================= */

export interface AttendanceCreatePayload {
  employee: number;
  device_id: number;
  timestamp?: string; // ISO datetime
  note?: string;
}

export interface AttendanceListParams {
  page?: number;
  search?: string;
  perPage?: number;
  employee?: number;
  device?: number;
}

/* =======================
   API
======================= */

// ➕ CREATE attendance
export const createAttendanceAPI = async (
  payload: AttendanceCreatePayload,
): Promise<APIResponse<Attendance>> => {
  const res = await api.post("/api/attendances/", payload);
  return res.data;
};

// 📋 LIST attendances (filter + pagination)
export const listAttendancesAPI = async (
  params?: AttendanceListParams,
): Promise<ListAPIResponse<Attendance>> => {
  const res = await api.get("/api/attendances/", { params });
  return res.data;
};
