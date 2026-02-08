import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeStore } from "../store/themeStore";

export const ThemeToggleButton = () => {
  const { mode, toggleMode } = useThemeStore();

  return (
    <Tooltip title="Mavzuni almashtirish">
      <IconButton onClick={toggleMode} color="inherit">
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};
