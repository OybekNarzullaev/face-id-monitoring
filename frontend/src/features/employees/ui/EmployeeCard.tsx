import type { Employee } from "@/shared/types/employee";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Chip,
  Box,
  Divider,
} from "@mui/material";

interface Props {
  employee: Employee;
}

export const EmployeeCard = ({ employee }: Props) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* Header */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={employee.picture || undefined}
              sx={{ width: 64, height: 64 }}
            >
              {employee.full_name?.[0]?.toUpperCase()}
            </Avatar>

            <Box flex={1}>
              <Typography variant="h6" fontWeight={700}>
                {employee.full_name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {employee.position || "Lavozim ko‘rsatilmagan"}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {employee.department || "Bo‘lim ko‘rsatilmagan"}
              </Typography>
            </Box>

            <Chip
              label={employee.is_active ? "Active" : "Inactive"}
              color={employee.is_active ? "success" : "error"}
              size="small"
            />
          </Stack>

          <Divider />

          {/* Contact Info */}
          <Stack spacing={0.5}>
            {employee.phone && (
              <Typography variant="body2">📞 {employee.phone}</Typography>
            )}

            {employee.email && (
              <Typography variant="body2">📧 {employee.email}</Typography>
            )}
          </Stack>

          {/* Footer */}
          <Typography variant="caption" color="text.secondary">
            Qo‘shilgan: {new Date(employee.created_at).toLocaleDateString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
