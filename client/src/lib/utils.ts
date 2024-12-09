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

export const formatIsoDateToLocale = (isoDate: string) => {
  const date = new Date(isoDate);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return formattedDate;
};

export const timeDiffForHumans = (isoTimestamp: string): string => {
  const givenDate = new Date(isoTimestamp);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - givenDate.getTime()) / 1000,
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
};
