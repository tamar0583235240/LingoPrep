import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// מחבר classNames ומוודא שאין התנגשויות ב־Tailwind
export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs));
}