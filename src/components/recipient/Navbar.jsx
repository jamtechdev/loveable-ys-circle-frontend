"use client";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar({ toggleSidebar, }) {
    const [openMenu, setOpenMenu] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState(null);
  const menuRef = useRef(null);

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from cookies", e);
            }
        }
    }, []);

         // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Generate initials EX: "John Doe" → JD
    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };
    const handleLogout = async () => {
        // try {
        //     await authService.logout();
        // } catch (e) {
        //     console.log("Logout API failed (ignored)", e);
        // }
        Cookies.remove("token");
        Cookies.remove("user");
        setOpenMenu(false);
        router.push("/login");
        router.refresh();
    };

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            {/* Mobile Menu Button */}
            <button
                className="text-gray-600 hover:text-gray-800 md:hidden"
                onClick={toggleSidebar}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor">
                    <path d="M4 6h16M4 12h16m-7 6h7" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            <h1 className="text-xl font-semibold hidden md:block">Recipient Dashboard</h1>

            {/* Profile */}
            <div className="relative" ref={menuRef}>
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <span className="text-gray-700">{user?.name || "User"}</span>

                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {getInitials(user?.name)}
                    </div>
                </div>

                {openMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border">
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                            Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
