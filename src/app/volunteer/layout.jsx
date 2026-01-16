"use client";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Sidebar from "../../components/volunteer/Sidebar";
import Navbar from "../../components/volunteer/Navbar";

export default function HelperLayout({ children }) {

  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // useEffect(() => {
  //   if (!loading) {
  //     if (!user?.roles?.includes("helper")) {
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
  return (
    // ✅ NO HelperSidebar here!
    // <>{children}</>
    <div className="flex h-screen bg-gray-100 overflow-y">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-y-scroll">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        {children}
      </div>
    </div>
  );
}
