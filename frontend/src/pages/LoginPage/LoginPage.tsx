// pages/LoginPage.tsx
import { LoginForm } from "@/features/auth/ui/LoginForm";
import { Box } from "@mui/material";

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
        px: 2,
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
