import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AxiosInstance from "@/lib/axios";

// Booking type
export type Booking = {
  _id: string;
  user: { _id: string; name: string; email: string; role: string };
  bookedUser: { _id: string; name: string; email: string; role: string };
  service: string;
  date: string; // store as ISO string
  notes?: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  createdAt: string;
  updatedAt: string;
};

// Booking form type
export type BookingFormData = {
  bookedUserId: string;
  service: string;
  date: string;
  notes?: string;
};

export const useBooking = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<Booking[]>({
    queryKey: ["booking"],
    queryFn: async () => {
      const { data } = await AxiosInstance.get("/bookings/");
      return data;
    },
  });

  const createBooking = useMutation({
    mutationFn: async (formData: BookingFormData) => {
      const { data } = await AxiosInstance.post("/bookings/create", formData, {
        withCredentials: true
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["booking"] }),
  });

  const deleteBooking = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await AxiosInstance.delete(`/bookings/${id}`, {
        withCredentials: true,
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["booking"] }),
  });

  return {
    bookings: data,
    isLoading,
    isError,
    createBooking,
    isCreatingBooking: createBooking.isPending,
    isErrorCreatingBooking: createBooking.isError,
    deleteBooking,
    isDeletingBooking: deleteBooking.isPending,
    isErrorDeletingBooking: deleteBooking.isError,
  };
};
