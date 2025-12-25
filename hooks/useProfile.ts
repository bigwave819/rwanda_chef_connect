import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "@/lib/axios";
import Cookies from "js-cookie";

type UserRef = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "chef" | "protocol" | "admin";
};


type Profile ={
  _id: string
  user: UserRef
  image: string[]
  phone: string
  bio: string
  email: string
  username: string
}

export const useProfile = () => {
  const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery<Profile>({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await AxiosInstance.get(`/user/profile/`)
            return data
        },
        enabled: !!Cookies.get("userId"),
    })

    const deleteProfile = useMutation({
      mutationFn: async (id: string) => {
        const { data } = await AxiosInstance.delete<{ profile: Profile }>(`/user/delete-account/${id}`)
        return data
      },

      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] })
    })

    const updateProfile = useMutation({
      mutationFn: async (formData: FormData) => {
        const { data } = await AxiosInstance.put<{ profile: Profile }>(`/user/update/`, formData, {
          headers: {
            'Content-Type': 'multipart/formdata'
          }
        })
        return data
      },
    })

    return {
        data,
        isLoading, 
        isError,
        deleteProfile: deleteProfile.mutate,
        isDeletingProfile: deleteProfile.isPending,
        updateProfile: updateProfile.mutate,
        isUpdatingProfile: updateProfile.isPending
    }
}

export const useAddProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await AxiosInstance.post(
        "/user/profile/create",
        formData
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
  })
}

export const useViewProfiles = () => {
  const { data, isLoading, isError } = useQuery<Profile[]>({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data } = await AxiosInstance.get('/user/all-profiles')
      return data
    }
  })
  return {
        data,
        isLoading, 
        isError
    }
}

export const useViewSpecificProfiles = (id: string) => {
  const { data, isLoading, isError } = useQuery<Profile>({
    queryKey: ['profiles', id],
    queryFn: async () => {
      const { data } = await AxiosInstance.get(`/user/public-profile/${id}`)
      return data
    }
  })
  return {
        data,
        isLoading, 
        isError
    }
}