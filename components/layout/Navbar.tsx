"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { LogIn, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Home() {
  const [open, setOpen] = useState(false);

  const navbarData = [
    { id: 1, label: "Home", link: "/" },
    { id: 2, label: "Chef", link: "/chefs" },
    { id: 2, label: "Protocols", link: "/protocols" },
    { id: 3, label: "About", link: "/about" },
  ];

  const closeMenu = () => setOpen(false);

  const pathName = usePathname()

  if(pathName.startsWith('/admin')) return null

  return (
    <div className="w-full p-5">
      {/* DESKTOP NAV */}
      <div className="hidden md:flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">RwandaChef</h1>

        {/* Links */}
        <div className="flex space-x-6 p-4 rounded-3xl backdrop-blur-md backdrop-grayscale bg-white/40">
          {navbarData.map((item) => (
            <Link key={item.id} href={item.link}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Login button */}
        <Link href="/auth">
          <Button className="btn">
            Login Here <LogIn size={18} />
          </Button>
        </Link>
      </div>

      {/* ===== MOBILE NAV ===== */}
      <div className="md:hidden flex justify-between items-center">
        {/* LOGO */}
        <h1 className="text-2xl font-bold">RwandaChef</h1>

        {/* HAMBURGER BTN */}
        <button onClick={() => setOpen(true)}>
          <Menu size={28} className="text-gray-700" />
        </button>
      </div>

      {/* ===== MOBILE SIDEBAR ===== */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* CLOSE BTN */}
        <div className="flex justify-end p-4">
          <button onClick={closeMenu}>
            <X size={28} className="text-gray-600" />
          </button>
        </div>

        {/* NAV LINKS */}
        <ul className="flex flex-col space-y-6 p-6 text-lg font-medium">
          {navbarData.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                onClick={closeMenu}
                className="block hover:text-pink-600"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* LOGIN BUTTON */}
        <div className="px-6 mt-6">
          <Link href="/auth" onClick={closeMenu}>
            <Button className="w-full py-2 bg-pink-500 text-white hover:bg-pink-600 rounded-xl shadow-md">
              Login Here
            </Button>
          </Link>
        </div>
      </div>

      {/* BACKDROP OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </div>
  );
}
