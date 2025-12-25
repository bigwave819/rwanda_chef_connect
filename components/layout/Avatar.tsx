'use client'

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export default function UserAvatar({ user }: { user: any }) {

  const router = useRouter()

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      Cookies.remove("userId");
      toast.success("Logout successful");
      router.push("/auth");
    } catch {
      toast.error("Error signing out");
    } finally {
      setIsLoggingOut(false);
    }
    window.location.href = "/auth";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 rounded-full w-10 h-10">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.image || ""} alt={user?.name || "U"} />
            <AvatarFallback>
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="mr-2 h-4 w-4" /> Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          {isLoggingOut ? (
            <Spinner />
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </>
          )}

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
