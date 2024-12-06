import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "toString" in error) {
    return error.toString();
  }
  return "An unknown error occurred.";
};

export const getInitials = (input: string): string => {
  const trimmedInput = input.trim(); // Remove extra spaces
  const words = trimmedInput.split(/\s+/); // Split by spaces

  if (words.length === 1) {
    // If only one word, take the first two letters
    return words[0].slice(0, 2).toUpperCase();
  }

  // If more than one word, take the first letter of the first two words
  return words[0][0]?.toUpperCase() + (words[1]?.[0]?.toUpperCase() || "");
};
