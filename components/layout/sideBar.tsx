"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UsersRound,
  HandPlatter,
  Bookmark,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import { getCurrentUserRole } from "@/app/actions/user-action";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

function SideBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRole() {
      const r = await getCurrentUserRole();
      setRole(r);
    }
    fetchRole();
  }, []);

  
  // ADMIN LINKS
  const adminLinks = [
    { id: 1, name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { id: 2, name: "All chefs", path: "/admin/chefs", icon: UsersRound },
    { id: 3, name: "Protocol", path: "/admin/protocol", icon: HandPlatter },
    { id: 4, name: "Bookings", path: "/admin/bookings", icon: Bookmark },
  ];

  // CHEF LINKS
  const chefLinks = [
    { id: 1, name: "Profile", path: "/chef/profile", icon: User },
    { id: 2, name: "Bookings", path: "/chef/bookings", icon: Bookmark },
  ];

  const links = role === "CHEF" ? chefLinks : adminLinks;

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();

      toast.success("Logout successful", {
        className: "bg-green-600 text-white border-green-700",
      });
      window.location.href = "/auth";
    } catch (error) {
      toast(`Error signing out due to ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-pink-700 text-white rounded-md shadow-lg hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 left-0 z-40
          w-72 border-r border-gray-200 p-6
          transform transition-all duration-300 ease-in-out
          flex flex-col h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          shadow-xl lg:shadow-none
        `}
      >
        {/* Logo */}
        <div className="mb-8 pt-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-pink-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CR</span>
            </div>
            <h1 className="font-extrabold text-xl text-pink-800 text-center">
              Chef Rwanda
            </h1>
          </div>
        </div>

        {/* Navigation */}
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
                      flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${
                        isActive
                          ? "text-white bg-pink-700 font-semibold shadow-lg"
                          : "text-pink-700 hover:text-pink-800"
                      }
                    `}
                  >
                    <Icon
                      size={20}
                      className={isActive ? "text-white" : "group-hover:scale-110 transition-transform"}
                    />
                    <span className="capitalize">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
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
            disabled={loading}
            className={`
              flex items-center justify-center w-full gap-3 py-3 px-4 
              font-semibold transition-all duration-200 rounded-xl
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-gray-600"
                  : "bg-blue-900 hover:bg-blue-950 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              }
            `}
          >
            <LogOut size={18} />
            {loading ? "Signing out..." : "Logout"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">v1.0.0</p>
        </div>
      </div>
    </>
  );
}

export default SideBar;
