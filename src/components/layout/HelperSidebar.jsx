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
import TaskIcon from "@mui/icons-material/Task";

const drawerWidth = 260;
const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/helper/dashboard" },
  { text: "My Tasks", icon: <TaskIcon />, path: "/helper/my-tasks" },
  { text: "Requests", icon: <AssignmentIcon />, path: "/helper/requests" },
];

export default function HelperSidebar() {
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
          backgroundColor: "#059669",
          color: "white",
        },
      }}
    >
      <Toolbar>
        <Box>
          <Typography variant="h6" className=" font-bold">
            YS Circle
          </Typography>
          <Typography variant="caption" className=" text-gray-200">
            Helper Portal
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => router.push(item.path)}
              selected={pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(16, 185, 129, 0.4)",
                  "&:hover": {
                    backgroundColor: "rgba(16, 185, 129, 0.5)",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
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
