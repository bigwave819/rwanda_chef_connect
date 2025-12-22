import { useQuery } from "@tanstack/react-query";
import { UserApi } from "@/lib/api";

export const useAdmin = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: UserApi.getAllUsers,
  });

  return {
    getAllUser: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
