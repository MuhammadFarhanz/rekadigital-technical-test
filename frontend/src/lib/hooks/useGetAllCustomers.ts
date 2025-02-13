import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios";

export const useGetAllCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/customers`);
      return response?.data?.data;
    },
  });
};
