import api from "@/shared/config/api";
import type { APIResponse, ListAPIResponse } from "@/shared/types/api";
import type { Employee } from "@/shared/types/employee";

export interface EmployeeListParams {
  page?: number;
  perPage?: number;
  search?: string; // full_name startswith / phone exact
  ordering?: string; // created_at, -created_at, full_name
  is_active?: boolean;
}

export const listEmployeesAPI = async (
  params?: EmployeeListParams,
): Promise<ListAPIResponse<Employee>> => {
  const res = await api.get("/api/employees/", { params });
  return res.data;
};

export interface EmployeeCreatePayload {
  full_name: string;
  phone?: string | null;
  email?: string | null;
  position?: string | null;
  department?: string | null;
  picture?: File | null;
  is_active?: boolean;
}

export const createEmployeeAPI = async (
  payload: EmployeeCreatePayload,
): Promise<APIResponse<Employee>> => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  const res = await api.post("/api/employees/", formData);
  return res.data;
};

export const updateEmployeeAPI = async (
  id: number,
  payload: Partial<EmployeeCreatePayload>,
): Promise<APIResponse<Employee>> => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value as any);
    }
  });

  const res = await api.patch(`/api/employees/${id}/`, formData);
  return res.data;
};

export const getEmployeeDetailAPI = async (id: number): Promise<Employee> => {
  const res = await api.get(`/api/employees/${id}/`);
  return res.data;
};

export const deleteEmployeeAPI = async (
  id: number,
): Promise<APIResponse<{}>> => {
  const res = await api.delete(`/api/employees/${id}/`);
  return res.data;
};
