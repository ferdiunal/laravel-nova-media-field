import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatBytes(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    if (bytes === 0) return "0 Bytes";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Get bytes
 * @param {Number} bytes
 * @returns {Number}
 */
export function getBytes(bytes) {
    if (bytes === 0) return 0;
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
}

/**
 *
 * @param  {...ClassValue} inputs
 * @returns {string}
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
