import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../axios";

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

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
      console.error("Error deleting customer:", error);
    },
  });
};
