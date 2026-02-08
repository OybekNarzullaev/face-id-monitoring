// features/auth/hooks.ts
import { useMutation } from "@tanstack/react-query";
import { loginAPI, logoutAPI, type LoginReq } from "./api";
import { toast } from "react-toastify";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginReq) => loginAPI(data),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () =>
      logoutAPI().then(() => {
        toast.success("Tizimdan chiqildi");
      }),
  });
};
