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


  return {
    user: data,
    role: data?.role.toLowerCase(),
    isLoading,
    isError,
  };
};