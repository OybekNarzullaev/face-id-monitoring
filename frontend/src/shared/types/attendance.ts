import type { Employee } from "./employee";

export interface Attendance {
  id: number;
  employee: Employee & number; // employee ID
  employee_name?: string; // list serializer’da keladi
  device_id: number;
  timestamp?: string | null; // ISO datetime
  note?: string;
  created_at: string;
}
