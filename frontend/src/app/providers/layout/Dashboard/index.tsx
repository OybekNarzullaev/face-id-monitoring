import { Outlet, NavLink, useNavigate } from "react-router";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GroupIcon from "@mui/icons-material/Group";
import CameraFrontIcon from "@mui/icons-material/CameraFront";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { useState } from "react";
import { ThemeToggleButton } from "@/shared/ui/ThemeToggleButton";
import { useLogout } from "@/features/auth/hooks";
import { useAuthStore } from "@/shared/store/authStore";

const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useLogout();
  const { auth, setAuth } = useAuthStore();
  const user = auth?.user;

  const menuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await mutateAsync();
    } finally {
      setAuth();
      handleMenuClose();
      navigate("/auth/login", { replace: true });
    }
  };

  /* ================= DRAWER ================= */

  const drawer = (
    <Box>
      <Toolbar>
        <Box
          component={NavLink}
          to="/dashboard/attendances"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
            "&:hover": { opacity: 0.8 },
          }}
        >
          <CameraFrontIcon />
          <Typography variant="h6" fontWeight={700} textTransform="uppercase">
            FaceID monitoring
          </Typography>
        </Box>
      </Toolbar>

      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/dashboard/attendances"
            sx={{
              "&.active": {
                backgroundColor: theme.palette.action.selected,
                color: theme.palette.primary.main,
                borderRight: `3px solid ${theme.palette.primary.main}`,
                "& .MuiListItemIcon-root": {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemIcon>
              <VerifiedUserIcon />
            </ListItemIcon>
            <ListItemText primary="Auditlar" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/dashboard/employees"
            sx={{
              "&.active": {
                backgroundColor: theme.palette.action.selected,
                color: theme.palette.primary.main,
                borderRight: `3px solid ${theme.palette.primary.main}`,
                "& .MuiListItemIcon-root": {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Xodimlar" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  /* ================= RENDER ================= */

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      {/* ================= APP BAR ================= */}
      <AppBar
        position="fixed"
        variant="outlined"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {/* Mobile menu */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box
            component={NavLink}
            to="/dashboard/attendances"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "inherit",
              flex: 1,
            }}
          >
            <CameraFrontIcon />
            <Typography variant="h6" fontWeight={700}>
              FaceID monitoring
            </Typography>
          </Box>

          {/* Theme toggle */}
          <ThemeToggleButton />

          {/* ================= AUTH ================= */}
          {user ? (
            <>
              <Tooltip title={`${user.first_name} ${user.last_name}`}>
                <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
                  <Avatar
                    src={user.picture_url || undefined}
                    alt={user.username}
                    sx={{ width: 32, height: 32 }}
                  >
                    {user.username?.[0]?.toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem disabled>
                  <Typography variant="body2">{user.username}</Typography>
                </MenuItem>

                <MenuItem onClick={handleLogout} disabled={isPending}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Chiqish
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton
              component={NavLink}
              to="/login"
              color="inherit"
              sx={{ ml: 1 }}
            >
              <LoginIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* ================= DESKTOP DRAWER ================= */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          bgcolor: theme.palette.action.hover,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
