import { Box, Typography, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FileUploadFieldProps {
  name: string;
  accept?: string;
  label?: string;
  disabled?: boolean;
}

export const FileUploadField = ({
  name,
  accept = ".dwg",
  disabled = false,
  label = "Fayl yuklash",
}: FileUploadFieldProps) => {
  const { control } = useFormContext();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "Iltimos, fayl tanlang!",
      }}
      render={({ field, fieldState }) => {
        const file = field.value as File | undefined;
        const error = fieldState.error;

        const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragActive(false);

          const droppedFile = e.dataTransfer.files?.[0];
          if (droppedFile) {
            field.onChange(droppedFile);
          }
        };

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            field.onChange(selectedFile);
          }
        };

        const handleClear = () => {
          field.onChange(null);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        };

        return (
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {label}
            </Typography>

            <Box
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              sx={{
                mt: 1,
                p: 4,
                border: "2px dashed",
                borderColor: dragActive
                  ? "primary.main"
                  : error
                    ? "error.main"
                    : "divider",
                borderRadius: 2,
                textAlign: "center",
                bgcolor: dragActive ? "action.hover" : "background.paper",
                transition: "0.2s",
              }}
            >
              {file ? (
                <Box mb={2}>
                  <Typography color="success.main">
                    Tanlangan fayl: <strong>{file.name}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hajmi: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </Box>
              ) : (
                <Typography mb={2} color="text.secondary">
                  Faylni bu yerga tashlang yoki tanlang
                </Typography>
              )}

              <Button
                variant="contained"
                component="label"
                disabled={disabled}
                startIcon={<CloudUploadIcon />}
                sx={{ mr: file ? 1 : 0 }}
              >
                Fayl tanlash
                <input
                  type="file"
                  disabled={disabled}
                  hidden
                  ref={inputRef}
                  accept={accept}
                  onChange={handleFileChange}
                />
              </Button>

              {file && (
                <Button
                  disabled={disabled}
                  type="button"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleClear}
                >
                  Tozalash
                </Button>
              )}
            </Box>

            {error && (
              <Typography mt={1} color="error.main" variant="body2">
                {error.message}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
};
