"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Search } from "@mui/icons-material";

// import LoginModal from "../../modalComponents/LoginModal";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
    window.location.reload();
  };

  // const [loginOpen, setLoginOpen] = useState(false);
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  const getURL = (user) => {
    if (!user || !user.roles || user.roles.length === 0) return "/";
    const roleName = user.roles[0].name.toLowerCase();
    switch (roleName) {
      case "coordinator":
        return "/coordinator/dashboard";
      case "volunteer":
        return "/volunteer/dashboard";
      case "recipient":
        return "/recipient/dashboard";
      default:
        return "/";
    }
  };

  return (
    <header>
      <nav className="bg-white shadow-lg px-4 lg:px-6 py-4 sticky top-0">
        <div className="flex flex-wrap justify-between items-center mx-auto container">
          <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              <img src="/assets/img/logo.png" alt="My image" />
            </span>
          </Link>

          <div className="flex items-center lg:order-2">
            <button className="h-12 w-12 mr-3 rounded-full bg-gray-200">
              <Search className="text-primary !text-3xl" />
            </button>
            {/* <button
              className="theme-btn-primary px-5"
              onClick={() => setLoginOpen(true)}
            >
              Log in
            </button> */}
            {!token ? (
              <button
                onClick={() => router.push("/login")}
                className="theme-btn-primary px-5"
              >
                Log In
              </button>
            ) : (
              <Link href={getURL(user)}>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {getInitials(user?.name)}
                </div>
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>

          <div
            className={`${
              mobileMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-black text-md uppercase"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 text-black text-md uppercase"
                >
                  About
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/features"
                  className="block py-2 px-3 text-black text-md uppercase"
                >
                  Features
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contact"
                  className="block py-2 px-3 text-black text-md uppercase"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} /> */}
    </header>
  );
}
