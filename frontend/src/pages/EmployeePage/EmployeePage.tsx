import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
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
  TextField,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useSearchParams } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import PageContainer from "@/shared/ui/PageContainer";
import { useListEmployees } from "@/features/employees/hooks";
import type { Employee } from "@/shared/types/employee";
import ConfirmDialog from "@/shared/ui/ConfirmDialog";
import { useDeleteEmployee } from "@/features/employees/hooks";
import { useState } from "react";
import CreateOrUpdateEmployeeModal from "@/features/employees/ui/CreateOrUpdateEmployeeModal";

const PER_PAGE = 15;

const EmployeePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const { mutateAsync: deleteEmployee, isPending } = useDeleteEmployee();
  const handleConfirmDelete = async () => {
    if (!selectedEmployee) return;

    await deleteEmployee(selectedEmployee.id);
    setConfirmOpen(false);
    setSelectedEmployee(null);
  };

  // 🔑 URL’dan o‘qish
  const page = Number(searchParams.get("page") ?? 1);
  const search = searchParams.get("search") ?? "";

  const { data, isLoading } = useListEmployees({
    page,
    perPage: PER_PAGE,
    search: search || undefined,
  });

  const employees: Employee[] = data?.result.data ?? [];
  const meta = data?.meta;

  // 🔁 search o‘zgarganda URL yangilanadi
  const handleSearchChange = (value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      value ? params.set("search", value) : params.delete("search");
      params.set("page", "1"); // search bo‘lsa page reset
      return params;
    });
  };

  const handlePageChange = (_: any, value: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(value));
      return params;
    });
  };

  return (
    <PageContainer
      title="Barcha xodimlar"
      actions={
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedEmployee(null);
            setOpenModal(true);
          }}
        >
          Xodim qo‘shish
        </Button>
      }
    >
      <CreateOrUpdateEmployeeModal
        open={openModal}
        employee={selectedEmployee}
        onClose={() => setOpenModal(false)}
      />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={isPending}
        danger
        title="Xodimni o‘chirish"
        description={`"${selectedEmployee?.full_name}" xodimini o‘chirishga ishonchingiz komilmi?`}
        confirmText="Ha, o‘chiraman"
        cancelText="Yo‘q, bekor qilish"
      />

      <Stack spacing={2}>
        {/* 🔍 SEARCH */}
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ism yoki telefon bo‘yicha qidirish…"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </Paper>

        {/* 📋 TABLE */}
        <Paper elevation={0} sx={{ borderRadius: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Xodim</TableCell>
                  <TableCell>Telefon</TableCell>
                  <TableCell>Lavozim</TableCell>
                  <TableCell>Bo‘lim</TableCell>
                  <TableCell align="center">Holati</TableCell>
                  <TableCell>Qayd etilgan</TableCell>
                  <TableCell></TableCell>
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
                {!isLoading && employees.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <Typography color="text.secondary">
                        Xodimlar topilmadi
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {/* DATA */}
                {!isLoading &&
                  employees.map((emp) => (
                    <TableRow key={emp.id} hover>
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar src={emp.picture ?? undefined}>
                            {emp.full_name[0]}
                          </Avatar>
                          <Box>
                            <Typography fontWeight={600}>
                              {emp.full_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              #{emp.id}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell>{emp.phone ?? "—"}</TableCell>
                      <TableCell>{emp.position ?? "—"}</TableCell>
                      <TableCell>{emp.department ?? "—"}</TableCell>

                      <TableCell align="center">
                        <Chip
                          label={emp.is_active ? "Faol" : "Faol emas"}
                          color={emp.is_active ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>

                      <TableCell>
                        {new Date(emp.created_at).toLocaleString("uz-Uz")}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Tahrirlash">
                          <IconButton
                            onClick={() => {
                              setSelectedEmployee(emp);
                              setOpenModal(true);
                            }}
                          >
                            <Edit color="warning" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="O'chirish">
                          <IconButton
                            onClick={() => {
                              setSelectedEmployee(emp);
                              setConfirmOpen(true);
                            }}
                          >
                            <Delete color="error" />
                          </IconButton>
                        </Tooltip>
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
                onChange={handlePageChange}
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

export default EmployeePage;
