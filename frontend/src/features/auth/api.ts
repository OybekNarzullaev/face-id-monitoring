// features/auth/api.ts

import api from "@/shared/config/api";
import type { Auth } from "@/shared/types/account";

export interface LoginReq {
  email: string;
  password: string;
}

export const loginAPI = async (data: LoginReq) => {
  const res = await api.post<Auth>("/api/auth/login/", data);
  return res.data;
};

export const logoutAPI = async () => {
  const res = await api.post("/api/auth/logout/");
  return res.data;
};
