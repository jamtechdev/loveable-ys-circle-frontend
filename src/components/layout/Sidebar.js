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
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { sidebarMenuConfig } from "../../lib/rolesConfig";

const iconMap = {
  DashboardIcon,
  AssignmentIcon,
  TaskIcon,
  ListAltIcon,
  AddCircleIcon,
};

const drawerWidth = 260;

export default function Sidebar({ user }) {
  const router = useRouter();
  const pathname = usePathname();
  const mergedMenu = user?.roles
    ?.flatMap((role) => sidebarMenuConfig[role] || [])
    .filter((v, i, a) => a.findIndex((t) => t.path === v.path) === i);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(140deg,#1e293b,#059669,#7c3aed)",
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
            {user?.roles?.join(" / ")} Portal
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
      {/* --- All menu items will always be visible with scroll --- */}
      <Box sx={{ overflowY: "auto", height: "100%" }}>
        <List>
          {mergedMenu?.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => router.push(item.path)}
                  selected={pathname === item.path}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "rgba(59,130,246,0.3)",
                      "&:hover": { backgroundColor: "rgba(59,130,246,0.4)" },
                    },
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.07)" },
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {IconComponent ? <IconComponent /> : null}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
