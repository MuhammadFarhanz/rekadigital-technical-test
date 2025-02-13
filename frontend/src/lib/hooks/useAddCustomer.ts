import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../axios";

export const useAddCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCustomer) => {
      return axiosInstance.post("/customer", newCustomer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log("Error Creating customer:", error);
    },
  });
};
