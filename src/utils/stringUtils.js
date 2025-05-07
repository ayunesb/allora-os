/**
 * Safely converts a value to a string
 * @param value The value to convert to string
 * @returns A string representation of the value
 */
export function toSafeString(value) {
    if (value === null || value === undefined)
        return "";
    // Handle special case for numbers and other primitive types
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    // Already a string
    if (typeof value === "string")
        return value;
    // Try to stringify objects and arrays
    try {
        return JSON.stringify(value);
    }
    catch (error) {
        return String(value);
    }
}
