"use client";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import CoordinatorSidebar from "../../components/layout/CoordinatorSidebar";
import Sidebar from "../../components/coordinator/Sidebar";
import Navbar from "../../components/coordinator/Navbar";

export default function CoordinatorLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = {
    name: "Co ordinator ",
    email: "coordinator.com",
  };

  // useEffect(() => {
  //   if (!loading) {
  //     // Only allow access for "coordinator" role
  //     if (!user?.roles?.includes("coordinator")) {
  //       if (user?.roles?.length > 0) {
  //         router.push(`/${user.roles[0]}/dashboard`);
  //       } else {
  //         router.push("/login");
  //       }
  //     }
  //   }
  // }, [user, loading, router]);

  // if (loading || !user) {
  //   return (
  //     <Box className=" flex  items-center  justify-center  min-h-screen">
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // All coordinator child pages now protected!
  return (
    // <Box sx={{ display: "flex", minHeight: "100vh" }}>
    //   {/* <CoordinatorSidebar /> */}
    //   <Box sx={{ flex: 1 }}>{children}</Box>
    // </Box>
    <div className="flex h-screen bg-gray-100 overflow-y">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-y-scroll">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          user={user}
        />
        {children}
      </div>
    </div>
  );
}
