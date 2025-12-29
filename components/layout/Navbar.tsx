"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { LogIn, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useMounted } from "@/hooks/useMounted";

export default function Home() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const mounted = useMounted();
  const { user, role, isLoading } = useAuthUser();

  const navbarData = [
    { id: 1, label: "Home", link: "/" },
    { id: 2, label: "Chef", link: "/chefs" },
    { id: 3, label: "Protocols", link: "/protocols" },
    { id: 4, label: "About", link: "/about" },
  ];

  const closeMenu = () => setOpen(false);

  if (!mounted) {
    return <div className="h-20 w-full bg-gray-50" />;
  }

  const hideNavbar = role === "admin" || role === "chef" || role === "protocol";

  return (
    <div className="w-full p-5">
      {/* NAVBAR */}
      {!hideNavbar && (
        <>
          {/* DESKTOP NAV */}
          <div className="hidden md:flex justify-between items-center">
            <h1 className="text-2xl font-bold text-pink-700">RwandaChef</h1>

            <div className="flex items-center space-x-6 px-6 py-3 rounded-3xl backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg">
              {navbarData.map((item) => {
                const active = pathname === item.link;
                return (
                  <Link
                    key={item.id}
                    href={item.link}
                    className={`text-sm font-medium transition ${
                      active ? "text-pink-600 font-semibold" : "text-gray-800 hover:text-pink-500"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {role === "user" && (
                <Link
                  href="/bookings"
                  className={`text-sm font-medium ${
                    pathname === "/bookings" ? "text-pink-600" : "text-gray-800 hover:text-pink-600"
                  }`}
                >
                  Bookings
                </Link>
              )}
            </div>

            {/* DESKTOP AVATAR / LOGIN */}
            {isLoading ? (
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <Avatar user={user} />
            ) : (
              <Link href="/auth">
                <Button className="btn flex items-center gap-2">
                  Login Here <LogIn size={18} />
                </Button>
              </Link>
            )}
          </div>

          {/* MOBILE NAV BAR (Top Strip) */}
          <div className="md:hidden flex justify-between items-center">
            <h1 className="text-2xl font-bold text-pink-700">RwandaChef</h1>
            
            <div className="flex items-center gap-4">
              {/* Optional: Show avatar even before menu opens for better UX */}
              {!isLoading && user && <Avatar user={user} />}
              
              <button onClick={() => setOpen(true)}>
                <Menu size={28} className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* MOBILE SIDEBAR */}
          {/* Overlay to close menu when clicking outside */}
          {open && (
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" 
              onClick={closeMenu}
            />
          )}

          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              {/* Login/Avatar inside the Sidebar */}
              <div className="flex items-center">
                {isLoading ? (
                  <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse" />
                ) : user ? (
                  <Avatar user={user} />
                ) : (
                  <span className="text-sm font-bold text-gray-500">Welcome!</span>
                )}
              </div>
              <button onClick={closeMenu}>
                <X size={28} />
              </button>
            </div>

            <ul className="flex flex-col space-y-6 p-6 text-lg font-medium">
              {navbarData.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    onClick={closeMenu}
                    className={pathname === item.link ? "text-pink-600" : "text-gray-800"}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {role === "user" && (
                <li>
                  <Link
                    href="/bookings"
                    onClick={closeMenu}
                    className={pathname === "/bookings" ? "text-pink-600" : "text-gray-800"}
                  >
                    Bookings
                  </Link>
                </li>
              )}

              {/* MOBILE LOGIN BUTTON (Only shows if NOT logged in) */}
              {!isLoading && !user && (
                <li className="pt-4">
                  <Link href="/auth" onClick={closeMenu}>
                    <Button className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700">
                      Login <LogIn size={18} />
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}