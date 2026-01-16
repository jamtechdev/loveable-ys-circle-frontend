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
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const drawerWidth = 260;
const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/recipient/dashboard" },
  {
    text: "My Requests",
    icon: <ListAltIcon />,
    path: "/recipient/my-requests",
  },
  {
    text: "New Request",
    icon: <AddCircleIcon />,
    path: "/recipient/new-request",
  },
];

export default function RecipientSidebar() {
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
          backgroundColor: "#7c3aed",
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
            Recipient Portal
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
                  backgroundColor: "rgba(139, 92, 246, 0.4)",
                  "&:hover": {
                    backgroundColor: "rgba(139, 92, 246, 0.5)",
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
