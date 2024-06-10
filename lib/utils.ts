import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CategoryType } from "@/hooks/useCategories";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeUrl(path: string) {
  return `https:${path}`;
}

export function getSlug(title: string) {
  return title.toLowerCase().replace(" ", "-");
}

export function getReturnUrlFromCategoryType(type: CategoryType) {
  switch (type) {
    case "concept":
      return "/portfolio/concept";
    case "storytelling":
      return "/portfolio/storytelling";
    default:
      return "/portfolio";
  }
}

export function getUrlWithSlug(type: CategoryType, slug: string) {
  return `${getReturnUrlFromCategoryType(type)}/${slug}`;
}

export function getUrlWithSlugAndImageParam(
  type: CategoryType,
  slug: string,
  image: string,
) {
  return `${getUrlWithSlug(type, slug)}?image=${getSlug(image)}`;
}
