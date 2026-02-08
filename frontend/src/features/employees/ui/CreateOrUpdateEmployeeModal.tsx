import type { Employee } from "@/shared/types/employee";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Switch,
  FormControlLabel,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

import { useCreateEmployee, useUpdateEmployee } from "../hooks";
import type { EmployeeCreatePayload } from "../api";
import { FileUploadField } from "@/shared/ui/FileUploadField";

interface Props {
  open: boolean;
  onClose: () => void;
  employee?: Employee | null;
}

const CreateOrUpdateEmployeeModal = ({ open, onClose, employee }: Props) => {
  const isEdit = Boolean(employee);

  const { mutateAsync: createEmployee, isPending: isCreating } =
    useCreateEmployee();
  const { mutateAsync: updateEmployee, isPending: isUpdating } =
    useUpdateEmployee();

  const methods = useForm<EmployeeCreatePayload>({
    defaultValues: {
      full_name: "",
      phone: "",
      position: "",
      department: "",
      is_active: true,
      picture: null,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = methods;

  // 🔄 edit bo‘lsa formani to‘ldiramiz
  useEffect(() => {
    if (employee) {
      reset({
        full_name: employee.full_name,
        phone: employee.phone ?? "",
        position: employee.position ?? "",
        department: employee.department ?? "",
        is_active: employee.is_active,
        picture: null, // ⚠️ eski URL file emas
      });
    } else {
      reset({
        full_name: "",
        phone: "",
        position: "",
        department: "",
        is_active: true,
        picture: null,
      });
    }
  }, [employee, reset]);

  const onSubmit = async (data: EmployeeCreatePayload) => {
    if (isEdit && employee) {
      await updateEmployee({
        id: employee.id,
        data,
      });
    } else {
      await createEmployee(data);
    }
    onClose();
  };

  const isActive = watch("is_active");
  const selectedPicture = watch("picture");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEdit ? "Xodimni tahrirlash" : "Yangi xodim qo‘shish"}
      </DialogTitle>

      <FormProvider {...methods}>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {/* 🖼 PROFILE PREVIEW */}
            {(employee?.picture || selectedPicture) && (
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  src={
                    selectedPicture
                      ? URL.createObjectURL(selectedPicture)
                      : (employee?.picture ?? undefined)
                  }
                  sx={{ width: 64, height: 64 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Profil rasmi
                </Typography>
              </Box>
            )}

            {/* 📎 FILE UPLOAD */}
            <FileUploadField
              name="picture"
              accept="image/*"
              label="Profil rasmi"
            />

            <TextField
              label="F.I.Sh"
              fullWidth
              required
              error={Boolean(errors.full_name)}
              helperText={errors.full_name?.message}
              {...register("full_name", {
                required: "F.I.Sh majburiy",
                minLength: {
                  value: 3,
                  message: "Kamida 3 ta belgi",
                },
              })}
            />

            <TextField label="Telefon" fullWidth {...register("phone")} />

            <TextField label="Lavozim" fullWidth {...register("position")} />

            <TextField label="Bo‘lim" fullWidth {...register("department")} />

            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(isActive)}
                  {...register("is_active")}
                />
              }
              label="Faol"
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={isCreating || isUpdating}
          >
            {isEdit ? "Saqlash" : "Qo‘shish"}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default CreateOrUpdateEmployeeModal;
