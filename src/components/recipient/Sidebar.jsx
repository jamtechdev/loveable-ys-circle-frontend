"use client";

import { Favorite, Home, ContactPage, Diversity3, Settings } from "@mui/icons-material";
import Link from "next/link";

export default function Sidebar({ isOpen, onClose }) {
    return (
        <>
            <aside
                className={`w-64 bg-gray-800 text-white flex-shrink-0 fixed md:relative h-full transition-all duration-300 z-[1000]
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
            >
                <div className="p-4 text-xl uppercase font-bold border-b border-gray-700 flex items-center gap-2">
                    <Favorite /> Support Circle
                </div>

                <nav className="mt-5">
                    <Link href={'/recipient/dashboard'} className="flex items-center gap-2 p-4 text-gray-300 hover:bg-gray-700">
                        <Home /> Dashboard
                    </Link>
                        <Link href={'/recipient/support-pages'} className="flex items-center gap-2 p-4 text-gray-300 hover:bg-gray-700">
                        <Home /> Support Pages
                    </Link>
                    <Link href={'/recipient/thank-you'} className="flex items-center gap-2 p-4 text-gray-300 hover:bg-gray-700">
                        <Home /> Thank You List
                    </Link>

                </nav>
            </aside>

            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 md:hidden"
                    onClick={onClose}
                />
            )}
        </>
    );
}
