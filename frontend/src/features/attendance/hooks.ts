import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listAttendancesAPI,
  createAttendanceAPI,
  type AttendanceListParams,
  type AttendanceCreatePayload,
} from "./api";
import type { Attendance } from "@/shared/types/attendance";
import type { APIResponse } from "@/shared/types/api";

export const useListAttendances = (params?: AttendanceListParams) => {
  return useQuery({
    queryKey: ["attendances", params],
    queryFn: () => listAttendancesAPI(params),
  });
};

export const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation<APIResponse<Attendance>, unknown, AttendanceCreatePayload>(
    {
      mutationFn: createAttendanceAPI,
      onSuccess: () => {
        // attendance listlarni yangilaymiz
        queryClient.invalidateQueries({ queryKey: ["attendances"] });
      },
    },
  );
};
