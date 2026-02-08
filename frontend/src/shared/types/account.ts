export interface Account {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  position: string | null;
  department: string | null;
  picture: string | null;
  picture_url: string | null;
  is_active: boolean;
  is_staff: boolean;
}

export interface Auth {
  expiry: string;
  token: string;
  user: Account;
}
