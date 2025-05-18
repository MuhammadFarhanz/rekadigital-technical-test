import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { queryClient } from "../react-query";

const useUpdateTransaction = () => {
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
