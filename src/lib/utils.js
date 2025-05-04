import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export function formatDate(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}
export function truncate(str, length) {
    if (!str || str.length <= length)
        return str;
    return str.slice(0, length) + '...';
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
