export interface Employee {
  id: number;
  full_name: string;
  phone?: string | null;
  email?: string | null;
  position?: string | null;
  department?: string | null;
  picture?: string | null; // image URL
  is_active: boolean;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}
