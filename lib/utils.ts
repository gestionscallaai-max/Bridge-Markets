import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDateUpperCase(date: string | Date, locale: string = 'es-ES') {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale, {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).toUpperCase();
}
