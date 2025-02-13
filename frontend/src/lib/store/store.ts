import { create } from "zustand";

interface CustomerFilterState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useCustomerStore = create<CustomerFilterState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
