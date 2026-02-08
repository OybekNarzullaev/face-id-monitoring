import { Box, Button, Typography, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router";

import PageContainer from "@/shared/ui/PageContainer";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="Sahifa topilmadi">
      <Box
        minHeight="60vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack spacing={2} alignItems="center" textAlign="center">
          <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />

          <Typography variant="h3" fontWeight={700}>
            404
          </Typography>

          <Typography variant="h6">
            Kechirasiz, so‘ralgan sahifa topilmadi
          </Typography>

          <Typography color="text.secondary" maxWidth={400}>
            Siz kiritgan manzil noto‘g‘ri bo‘lishi mumkin yoki sahifa
            o‘chirilgan.
          </Typography>

          <Stack direction="row" spacing={1} mt={2}>
            <Button
              variant="contained"
              onClick={() => navigate("/dashboard/attendances")}
            >
              Bosh sahifaga qaytish
            </Button>

            <Button variant="outlined" onClick={() => navigate(-1)}>
              Ortga qaytish
            </Button>
          </Stack>
        </Stack>
      </Box>
    </PageContainer>
  );
};

export default NotFoundPage;
