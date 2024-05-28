import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeUrl(path: string) {
  return `https:${path}`;
}

export function getSlug(title: string) {
  return title.toLowerCase().replace(" ", "-");
}
