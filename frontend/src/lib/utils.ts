import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatIDR = (amount?: number) => {
  if (!amount) return "0";
  return Number(amount).toLocaleString("id-ID").replace(/,/g, ".");
};
