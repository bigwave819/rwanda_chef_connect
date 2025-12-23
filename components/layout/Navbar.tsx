"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { LogIn, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Avatar from './Avatar';
import { useAuthUser } from "@/hooks/useAuthUser"; // 1. Import your hook

export default function Home() {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  // 2. Use the hook to get user and role
  const { user, role, isLoading } = useAuthUser();

  const navbarData = [
    { id: 1, label: "Home", link: "/" },
    { id: 2, label: "Chef", link: "/chefs" },
    { id: 3, label: "Protocols", link: "/protocols" },
    { id: 4, label: "About", link: "/about" },
  ];

  const closeMenu = () => setOpen(false);
  // Show a simple skeleton or nothing while checking auth
  if (isLoading) return <div className="h-20 w-full animate-pulse bg-gray-50" />;
  if (role === "admin" || role === "chef") {
    return null;
  }



  return (
    <div className="w-full p-5">
      {/* DESKTOP NAV */}
      <div className="hidden md:flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-700">RwandaChef</h1>

        <div className="flex items-center space-x-6 px-6 py-3 rounded-3xl backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg">
          {navbarData.map((item) => {
            const active = pathName === item.link;
            return (
              <Link
                key={item.id}
                href={item.link}
                className={`text-sm font-medium transition ${active ? "text-pink-600 font-semibold" : "text-gray-800 hover:text-pink-500"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* 4. Render "Bookings" only if role is 'user' */}
          {role === "user" && (
            <Link
              href="/bookings"
              className={`text-sm font-medium ${pathName === "/bookings" ? "text-pink-600" : "text-gray-800 hover:text-pink-600"}`}
            >
              Bookings
            </Link>
          )}
        </div>

        {/* Avatar / Login */}
        {user ? (
          <Avatar user={user} />
        ) : (
          <Link href="/auth">
            <Button className="btn flex items-center gap-2">
              Login Here <LogIn size={18} />
            </Button>
          </Link>
        )}
      </div>

      {/* MOBILE NAV (Rest of your code remains same, just apply same link logic) */}
      <div className="md:hidden flex justify-between items-center">
        <h1 className="text-2xl font-bold">RwandaChef</h1>
        <button onClick={() => setOpen(true)}>
          <Menu size={28} className="text-gray-700" />
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end p-4"><button onClick={closeMenu}><X size={28} /></button></div>
        <ul className="flex flex-col space-y-6 p-6 text-lg font-medium">
          {navbarData.map((item) => (
            <li key={item.id}>
              <Link href={item.link} onClick={closeMenu} className={pathName === item.link ? "text-pink-600" : ""}>{item.label}</Link>
            </li>
          ))}
          {/* Mobile Link Condition */}
          {role === "user" && (
            <li>
              <Link href="/bookings" onClick={closeMenu} className={pathName === "/bookings" ? "text-pink-600" : ""}>Bookings</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}