import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Stack,
  CircularProgress,
  TextField,
  useTheme,
} from "@mui/material";
import { useSearchParams } from "react-router";

import PageContainer from "@/shared/ui/PageContainer";
import { useListAttendances } from "@/features/attendance/hooks";
import type { Attendance } from "@/shared/types/attendance";

const PER_PAGE = 15;

const EmployeeAttendancePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔑 URL params
  const page = Number(searchParams.get("page") ?? 1);
  const employee = searchParams.get("employee") ?? "";
  const device = searchParams.get("device") ?? "";
  const search = searchParams.get("search") ?? "";

  const theme = useTheme();
  const { data, isLoading } = useListAttendances({
    page,
    perPage: PER_PAGE,
    employee: employee ? Number(employee) : undefined,
    device: device ? Number(device) : undefined,
    // 🔍 search backend SearchFilter orqali
    search: search || undefined,
  } as any);

  const attendances: Attendance[] = data?.result.data ?? [];
  const meta = data?.meta;

  const updateParams = (updates: Record<string, string | null>) => {
    setSearchParams((prev: any) => {
      const params = new URLSearchParams(prev);

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) params.delete(key);
        else params.set(key, value);
      });

      params.set("page", "1"); // filter o‘zgarsa page reset
      return params;
    });
  };

  return (
    <PageContainer title="Xodimlar auditi">
      <Stack spacing={2}>
        {/* 🔍 FILTER PANEL */}
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Qidiruv (ism, telefon, bo‘lim...)"
              size="small"
              value={search}
              onChange={(e) => updateParams({ search: e.target.value || null })}
              fullWidth
            />

            <TextField
              label="Employee ID"
              size="small"
              value={employee}
              onChange={(e) =>
                updateParams({ employee: e.target.value || null })
              }
            />

            <TextField
              label="Device ID"
              size="small"
              value={device}
              onChange={(e) => updateParams({ device: e.target.value || null })}
            />
          </Stack>
        </Paper>

        {/* 📋 TABLE */}
        <Paper elevation={0} sx={{ borderRadius: 3 }}>
          <TableContainer>
            <Table size="small">
              <TableHead
                sx={{
                  bgcolor: theme.palette.primary.main,
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      color: theme.palette.background.default,
                    }}
                  >
                    Xodim
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.background.default,
                    }}
                  >
                    Telefon
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.background.default,
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.background.default,
                    }}
                  >
                    Lavozim
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.background.default,
                    }}
                  >
                    Qurilma
                  </TableCell>
                  <TableCell
                    sx={{
                      color: theme.palette.background.default,
                    }}
                  >
                    Vaqt
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* LOADING */}
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <CircularProgress size={28} />
                    </TableCell>
                  </TableRow>
                )}

                {/* EMPTY */}
                {!isLoading && attendances.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <Typography color="text.secondary">
                        Ma’lumot topilmadi
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {/* DATA */}
                {!isLoading &&
                  attendances.map((att) => (
                    <TableRow key={att.id} hover>
                      <TableCell>
                        <Typography fontWeight={600}>
                          {att.employee_name ?? `#${att.employee}`}
                        </Typography>
                      </TableCell>

                      <TableCell>{att.employee.phone ?? "—"}</TableCell>
                      <TableCell>{att.employee.email ?? "—"}</TableCell>

                      <TableCell>{att.employee.position ?? "—"}</TableCell>

                      <TableCell>{att.device_id}</TableCell>

                      <TableCell>
                        {new Date(att.created_at).toLocaleString("uz-UZ")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* 📄 PAGINATION */}
          {meta && meta.lastPage > 1 && (
            <Stack direction="row" justifyContent="flex-end" sx={{ p: 2 }}>
              <Pagination
                page={meta.currentPage}
                count={meta.lastPage}
                onChange={(_, value) =>
                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);
                    params.set("page", String(value));
                    return params;
                  })
                }
                color="primary"
                shape="rounded"
              />
            </Stack>
          )}
        </Paper>
      </Stack>
    </PageContainer>
  );
};

export default EmployeeAttendancePage;
