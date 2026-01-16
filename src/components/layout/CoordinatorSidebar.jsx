"use client";
import { useRouter, usePathname } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";

const drawerWidth = 260;
const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/coordinator/dashboard",
  },
  { text: "Requests", icon: <AssignmentIcon />, path: "/coordinator/requests" },
];

export default function CoordinatorSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e293b",
          color: "white",
        },
      }}
    >
      <Toolbar>
        <Box>
          <Typography variant="h6" className=" font-bold">
            YS Circle
          </Typography>
          <Typography variant="caption" className=" text-gray-400">
            Coordinator Portal
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => router.push(item.path)}
              selected={pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(59, 130, 246, 0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.4)",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
