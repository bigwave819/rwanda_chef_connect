import { useQuery } from "@tanstack/react-query";
import { UserApi } from "@/lib/api";
import AxiosInstance from "@/lib/axios";

type DashboardStats = {
  totalUsers: number;
  approvedUsers: number;
  unapprovedUsers: number; 
  rolesCount: Record<string, number>;
};

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


export const useDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await AxiosInstance.get<DashboardStats>('/admin/dashboard');
      return data 
    }
  })

  return {
    data,
    isLoading,
    isError
  }
}
