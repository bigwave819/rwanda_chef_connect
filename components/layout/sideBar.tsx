"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UsersRound,
  Bookmark,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useMounted } from "@/hooks/useMounted";

function SideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, role, isLoading } = useAuthUser();

  /* ---------------- LINKS ---------------- */

  const adminLinks = [
    { id: 1, name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { id: 2, name: "All users", path: "/admin/users", icon: UsersRound },
    { id: 3, name: "Bookings", path: "/admin/bookings", icon: Bookmark },
  ];

  const chefLinks = [
    { id: 1, name: "Bookings", path: "/chef/bookings", icon: Bookmark },
    { id: 2, name: "Profile", path: "/chef/profile", icon: User },
  ];

  const protocolLinks = [
    { id: 2, name: "Bookings", path: "/protocol/booking", icon: Bookmark },
    { id: 3, name: "Profile", path: "/protocol/profile", icon: User },
  ];

  const links =
    role === "admin"
      ? adminLinks
      : role === "chef"
      ? chefLinks
      : role === "protocol"
      ? protocolLinks
      : [];

  /* ---------------- LOGOUT ---------------- */

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      Cookies.remove("userId");
      toast.success("Logout successful");
      router.push("/auth");
    } catch {
      toast.error("Error signing out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-pink-700 text-white rounded-md shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* SIDEBAR CONTAINER (ALWAYS RENDERED) */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40
          w-72 border-r border-gray-200 bg-white
          transform transition-all duration-300 ease-in-out
          flex flex-col h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* CONTENT */}
        {!mounted || isLoading ? (
          /* SKELETON (INSIDE SIDEBAR) */
          <div className="p-6 space-y-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
            </div>
          </div>
        ) : !user ? (
          /* NO USER */
          <div className="p-6 text-sm text-gray-500">
            No sidebar available
          </div>
        ) : (
          /* REAL SIDEBAR */
          <div className="flex flex-col h-full p-6">
            {/* LOGO & USER */}
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-pink-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CR</span>
                </div>
                <h1 className="font-extrabold text-xl text-pink-800">
                  Chef Rwanda
                </h1>
              </div>

              <div className="mt-4 p-2 bg-pink-50 rounded-lg">
                <p className="text-sm font-bold text-pink-900">
                  {user.name}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-pink-600 font-semibold">
                  {role}
                </p>
              </div>
            </div>

            {/* NAVIGATION */}
            <nav className="flex-1">
              <ul className="space-y-2">
                {links.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.path;

                  return (
                    <li key={item.id}>
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                          ${
                            active
                              ? "bg-pink-700 text-white font-semibold shadow-md"
                              : "text-gray-500 hover:text-pink-700 hover:bg-pink-50"
                          }
                        `}
                      >
                        <Icon size={20} />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* LOGOUT */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="flex items-center justify-center w-full gap-3 py-3 px-4 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-xl transition disabled:bg-gray-400"
              >
                <LogOut size={18} />
                {isLoggingOut ? "Signing out..." : "Logout"}
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export default SideBar;
