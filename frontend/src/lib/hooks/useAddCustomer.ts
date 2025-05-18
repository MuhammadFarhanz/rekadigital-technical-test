import { error } from "console";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "../axios";
import { Customer } from "@/app/interfaces/interface";
import { AxiosError } from "axios";
import { queryClient } from "../react-query";
import { toast } from "sonner";

export const useAddCustomer = () => {
  return useMutation({
    mutationFn: (newCustomer: any) => {
      return axiosInstance.post("/customer", newCustomer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    // onError: (err: AxiosError<{ errors?: string }>) => {
    //   toast.error(err.response?.data?.errors);
    // },
  });
};
