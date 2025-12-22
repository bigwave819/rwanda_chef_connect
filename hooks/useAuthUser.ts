import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { UserApi } from "@/lib/api";

export const useAuthUser = () => {
  const userId = Cookies.get("userId");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["authUser", userId],
    queryFn: () => UserApi.getSpecificUser(userId!),
    enabled: !!userId, 
    staleTime: 1000 * 60 * 5, 
  });

  // CHECK YOUR BROWSER CONSOLE FOR THIS:
  console.log("DEBUG - User Data from API:", data);

  return {
    user: data,
    role: data?.role.toLowerCase(), // Normalize to lowercase for easier checks
    isLoading,
    isError,
  };
};