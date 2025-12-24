import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "@/lib/axios";
import Cookies from "js-cookie";


type Profile ={
  _id: string
  user: string
  image: string[]
  phone: string
  bio: string
  email: string
  username: string
}

export const useProfile = () => {
    const { data, isLoading, isError } = useQuery<Profile>({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await AxiosInstance.get(`/user/profile/`)
            return data
        },
        enabled: !!Cookies.get("userId"),
    })

    return {
        data,
        isLoading, 
        isError
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