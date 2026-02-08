import { Paper, Stack, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import PageContainer from "@/shared/ui/PageContainer";
import { useCreateAttendance } from "@/features/attendance/hooks";
import type { AttendanceCreatePayload } from "@/features/attendance/api";
import { toast } from "react-toastify";

const CreateAttendancePage = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateAttendance();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AttendanceCreatePayload>({
    defaultValues: {
      employee: undefined as any,
      device_id: undefined as any,
      timestamp: "",
      note: "",
    },
  });

  const onSubmit = async (data: AttendanceCreatePayload) => {
    await mutateAsync({
      ...data,
      timestamp: data.timestamp || undefined,
    });
    toast.success("Yaratildi!");

    reset();
  };

  return (
    <PageContainer title="Attendance qo‘shish">
      <Paper sx={{ p: 3, maxWidth: 600, borderRadius: 3 }}>
        <Typography variant="h6" mb={2}>
          Xodim kelishini qayd etish
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Employee ID"
              type="number"
              fullWidth
              error={Boolean(errors.employee)}
              helperText={errors.employee?.message}
              {...register("employee", {
                required: "Employee majburiy",
                valueAsNumber: true,
              })}
            />

            <TextField
              label="Device ID"
              type="number"
              fullWidth
              error={Boolean(errors.device_id)}
              helperText={errors.device_id?.message}
              {...register("device_id", {
                required: "Device majburiy",
                valueAsNumber: true,
              })}
            />

            <TextField
              label="Vaqt (ixtiyoriy)"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...register("timestamp")}
            />

            <TextField
              label="Izoh"
              multiline
              rows={3}
              fullWidth
              {...register("note")}
            />

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Bekor qilish
              </Button>

              <Button type="submit" variant="contained" disabled={isPending}>
                Saqlash
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </PageContainer>
  );
};

export default CreateAttendancePage;
