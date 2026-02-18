import { useQuery } from "@tanstack/react-query";
import {
  createEmployeeAPI,
  deleteEmployeeAPI,
  getEmployeeDetailAPI,
  listEmployeesAPI,
  updateEmployeeAPI,
  type EmployeeCreatePayload,
  type EmployeeListParams,
} from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { APIResponse } from "@/shared/types/api";
import type { Employee } from "@/shared/types/employee";

export const useListEmployees = (params?: EmployeeListParams) => {
  return useQuery({
    queryKey: ["employees", params],
    queryFn: () => listEmployeesAPI(params),
  });
};

export const useEmployeeDetail = (id?: number) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeDetailAPI(id!).then((res) => res.result.data), // faqat employee qaytaramiz
    enabled: Boolean(id), // id bo‘lmasa so‘rov qilmaydi
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse<Employee>, unknown, EmployeeCreatePayload>({
    mutationFn: createEmployeeAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponse<Employee>,
    unknown,
    { id: number; data: Partial<EmployeeCreatePayload> }
  >({
    mutationFn: ({ id, data }) => updateEmployeeAPI(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", id] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse<{}>, unknown, number>({
    mutationFn: deleteEmployeeAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
