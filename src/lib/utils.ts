import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  date: string | number | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' },
  fallback = 'Sana mavjud emas',
): string {
  if (!date) return fallback;
  const parsed = typeof date === 'object' && date instanceof Date ? date : new Date(date);
  if (isNaN(parsed.getTime())) return fallback;
  try {
    return new Intl.DateTimeFormat('uz-UZ', options).format(parsed);
  } catch {
    return fallback;
  }
}

