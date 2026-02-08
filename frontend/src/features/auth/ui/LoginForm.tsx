// features/auth/ui/LoginForm.tsx
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useAuthStore } from "@/shared/store/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>();
  const login = useLogin();
  const navigate = useNavigate();

  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormValues) => {
    login.mutateAsync(data, {
      onSuccess: (res) => {
        console.log(res);

        setAuth(res);
        toast.success("Tizimga xush kelibsiz");
        navigate("/dashboard");
      },
    });
  };

  return (
    <Card sx={{ maxWidth: 420, width: "100%" }}>
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          {/* Header */}
          <Box textAlign="center">
            <LockOutlinedIcon
              sx={{
                fontSize: 42,
                color: "primary.main",
                mb: 1,
              }}
            />
            <Typography variant="h5" fontWeight={700}>
              Tizimga kirish
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hisobingiz orqali tizimga kiring
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                placeholder="emailni kiriting"
                {...register("email", {
                  required: "Login majburiy",
                })}
                error={!!formState.errors.email}
                helperText={formState.errors.email?.message}
              />

              <TextField
                label="Parol"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Parol majburiy",
                })}
                error={!!formState.errors.password}
                helperText={formState.errors.password?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((v) => !v)}
                          edge="end"
                          aria-label="parolni ko‘rsatish"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={login.isPending}
                sx={{ mt: 1 }}
              >
                {login.isPending ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Kirish"
                )}
              </Button>

              {login.isError && (
                <Typography variant="body2" color="error" textAlign="center">
                  Login yoki parol noto‘g‘ri
                </Typography>
              )}
            </Stack>
          </form>
        </Stack>
      </CardContent>
    </Card>
  );
};
