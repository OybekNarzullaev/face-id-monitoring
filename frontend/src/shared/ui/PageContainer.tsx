import { Box, Paper, Typography, useTheme } from "@mui/material";
import { type ReactNode } from "react";

interface PageContainerProps {
  title: string;
  actions?: ReactNode; // buttonlar (Add, Save, etc)
  children: ReactNode;
}

const PageContainer = ({ title, actions, children }: PageContainerProps) => {
  const theme = useTheme();
  return (
    <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
      {/* Header */}
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          },
          justifyContent: "space-between",
          alignItems: {
            xl: "center",
            lg: "center",
            md: "center",
            sm: "start",
            xs: "start",
          },
          p: { xs: 2, sm: 2, md: 2, lg: 3, xl: 3 },
          gap: 2,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h5" textTransform={"uppercase"} fontWeight={600}>
          {title}
        </Typography>

        {actions && <Box>{actions}</Box>}
      </Paper>

      {/* Content */}
      <Box p={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}>{children}</Box>
    </Box>
  );
};

export default PageContainer;
