import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios";

const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ transactionId, quantity }: any) => {
      const response = await axiosInstance.patch(
        `/transaction/${transactionId}`,
        { quantity }
      );
      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (error) => {
      console.log("Error updating transaction:");
    },
  });
};

export default useUpdateTransaction;
