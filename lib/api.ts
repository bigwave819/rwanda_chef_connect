import AxiosInstance from "./axios";


export const UserApi =  {
    getSpecificUser: async (id: string) => {
        const { data } = await AxiosInstance.get(`/user/user-info/${id}`);
        return data;
    },

    getAllUsers: async () => {
    const { data } = await AxiosInstance.get(`/admin/users`);

    return data;
  }, 
}