import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const paginateFunc = (data: Character[], page: number) => {
  if (!data || data.length === 0) return { paginatedData: [], totalPages: 1 };
  const itemsPerPage = 20;

  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(start, end);
  return { paginatedData, totalPages };
};
