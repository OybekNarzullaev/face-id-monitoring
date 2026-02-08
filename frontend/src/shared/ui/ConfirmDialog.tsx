import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Ishonchingiz komilmi?",
  description = "Bu amalni qaytarib bo‘lmaydi.",
  confirmText = "Ha, tasdiqlayman",
  cancelText = "Bekor qilish",
  loading = false,
  danger = false,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography color="text.secondary">{description}</Typography>
      </DialogContent>

      <DialogActions>
        <Stack direction="row" spacing={1}>
          <Button onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>

          <Button
            variant="contained"
            color={danger ? "error" : "primary"}
            onClick={onConfirm}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
