"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { LogIn, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Avatar from './Avatar'

import { getCurrentUserRole } from "@/app/actions/user-action";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathName = usePathname();

  // Fetch logged-in user
  useEffect(() => {
    async function loadUser() {
      const res = await getCurrentUserRole();
      setUser(res);
    }
    loadUser();
  }, []);

  // Hide navbar for admin or chef
  if (user?.role === "ADMIN" || user?.role === "CHEF") return null;

  const navbarData = [
    { id: 1, label: "Home", link: "/" },
    { id: 2, label: "Chef", link: "/chefs" },
    { id: 3, label: "Protocols", link: "/protocols" },
    { id: 4, label: "About", link: "/about" },
  ];

  const closeMenu = () => setOpen(false);

  return (
    <div className="w-full p-5">
      {/* DESKTOP NAV */}
      <div className="hidden md:flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">RwandaChef</h1>

        {/* Links */}
        <div className="flex space-x-6 px-6 py-3 rounded-3xl backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition">
          {navbarData.map((item) => {
            const active = pathName === item.link;

            return (
              <Link
                key={item.id}
                href={item.link}
                className={`text-sm font-medium transition ${active
                  ? "text-pink-600 font-semibold"
                  : "text-gray-800 hover:text-pink-500"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
          {user && (
            <Link
              href="/bookings"
              onClick={closeMenu}
              className={`block ${pathName === "/bookings" ? "text-pink-600" : "hover:text-pink-600"}`}
            >
              Bookings
            </Link>
          )}
        </div>

        {/* Customer Avatar / Login */}
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

      {/* MOBILE NAV */}
      <div className="md:hidden flex justify-between items-center">
        <h1 className="text-2xl font-bold">RwandaChef</h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={28} className="text-gray-700" />
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={closeMenu}>
            <X size={28} className="text-gray-600" />
          </button>
        </div>

        <ul className="flex flex-col space-y-6 p-6 text-lg font-medium">
          {navbarData.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                onClick={closeMenu}
                className={`block ${pathName === item.link ? "text-pink-600" : "hover:text-pink-600"
                  }`}
              >
                {item.label}
              </Link>
              
            </li>
          ))}
          {user && (
                <Link
                  href="/bookings"
                  onClick={closeMenu}
                  className={`block ${pathName === "/bookings" ? "text-pink-600" : "hover:text-pink-600"}`}
                >
                  Bookings
                </Link>
              )}
        </ul>

        {/* Login / Avatar */}
        <div className="px-6 mt-6">
          {user ? (
            <Avatar user={user} />
          ) : (
            <Link href="/auth" onClick={closeMenu}>
              <Button className="w-full py-2 bg-pink-500 text-white hover:bg-pink-600 rounded-xl shadow-md">
                Login Here
              </Button>
            </Link>
          )}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </div>
  );
}
