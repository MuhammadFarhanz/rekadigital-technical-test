import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { queryClient } from "../react-query";

export const useDeleteCustomer = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/customer/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"] as const);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("Error deleting customer:", error.message);
    },
  });
};
