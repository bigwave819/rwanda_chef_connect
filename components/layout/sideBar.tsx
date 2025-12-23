"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, UsersRound, HandPlatter, 
  Bookmark, LogOut, Menu, X, User 
} from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useAuthUser } from "@/hooks/useAuthUser"; // Path to your hook

function SideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { user, role, isLoading } = useAuthUser();

  console.log(role);
  
  // 1. Define Nav Item Arrays
  const adminLinks = [
    { id: 1, name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { id: 2, name: "All users", path: "/admin/users", icon: UsersRound },
    { id: 4, name: "Bookings", path: "/admin/bookings", icon: Bookmark },
  ];

  const chefLinks = [
    { id: 1, name: "Profile", path: "/chef/dashboard", icon: LayoutDashboard },
    { id: 2, name: "Bookings", path: "/chef/bookings", icon: Bookmark },
    { id: 2, name: "Profile", path: "/chef/profile", icon: User },
  ];

  // 2. Role-Based Logic: Default to empty array while loading or if no role found
  const links = role === "chef" ? chefLinks : role === "admin" ? adminLinks : [];

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      Cookies.remove("userId");
      toast.success("Logout successful");
      router.push("/auth");
    } catch (error) {
      toast.error("Error signing out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // 3. Handling UI states
  if (isLoading) return <div className="hidden lg:flex w-72 border-r h-screen bg-gray-50 animate-pulse" />;
  if (!user && !isLoading) return null;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-pink-700 text-white rounded-md shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Sidebar Container */}
      <div
        className={`
          fixed lg:sticky top-0 left-0 z-40
          w-72 border-r border-gray-200 p-6 bg-white
          transform transition-all duration-300 ease-in-out
          flex flex-col h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo and User Info */}
        <div className="mb-8 pt-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-pink-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CR</span>
            </div>
            <h1 className="font-extrabold text-xl text-pink-800">Chef Rwanda</h1>
          </div>
          <div className="mt-4 p-2 bg-pink-50 rounded-lg">
            <p className="text-sm font-bold text-pink-900">{user?.name}</p>
            <p className="text-[10px] uppercase tracking-widest text-pink-600 font-semibold">{role}</p>
          </div>
        </div>

        {/* Navigation Mapping */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive 
                        ? "text-white bg-pink-700 font-semibold shadow-md" 
                        : "text-gray-500 hover:text-pink-700 hover:bg-pink-50"}
                    `}
                  >
                    <Icon size={20} />
                    <span className="capitalize">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="flex items-center justify-center w-full gap-3 py-3 px-4 bg-blue-900 hover:bg-blue-950 text-white font-semibold rounded-xl transition-all disabled:bg-gray-400"
          >
            <LogOut size={18} />
            {isLoggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;