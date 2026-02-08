import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

interface LoaderProps {
  open: boolean;
  text?: string;
}

const Loader = ({ open, text = "Sahifa yuklanmoqda..." }: LoaderProps) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 999,
        flexDirection: "column",
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
      <Box mt={2}>
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Backdrop>
  );
};

export default Loader;
