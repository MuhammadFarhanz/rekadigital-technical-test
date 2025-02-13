import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";

export const useViewDetailCustomer = (id: any) => {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/customer/${id}`);
      return response?.data?.data ?? {};
    },
    enabled: !!id,
  });
};
