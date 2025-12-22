import AxiosInstance from "./axios";

export const authApi =  {
    register: async (formData: any) => {
        const { data } = await AxiosInstance.post('/user/login', formData)
        return data
    }
}

export const UserApi =  {
    getSpecificUser: async (id: string) => {
        const { data } = await AxiosInstance.get(`/user/${id}`);
        return data;
    },

    getAllUsers: async () => {
    const { data } = await AxiosInstance.get(`/admin/users`);

    return data;
  }, 
}

export const adminApi =  {}