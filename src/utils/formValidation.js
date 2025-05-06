import * as z from "zod";
import { sanitizeFormData } from "./sanitizers";
/**
 * Core form validation utilities
 */
/**
 * Enhanced form validation with sanitization
 * @param schema Zod schema for validation
 * @param data Data to validate
 * @returns Validation result
 */
export function validateAndSanitize(schema, data) {
    try {
        // First sanitize all string inputs
        const sanitizedData = typeof data === "object" && data !== null
            ? sanitizeFormData(data)
            : data;
        // Then validate with zod
        const result = schema.safeParse(sanitizedData);
        if (!result.success) {
            const errors = {};
            result.error.errors.forEach((err) => {
                const path = err.path.join(".");
                errors[path] = err.message;
            });
            return {
                success: false,
                errors,
            };
        }
        return {
            success: true,
            data: result.data,
        };
    }
    catch (error) {
        console.error("Validation error:", error);
        return {
            success: false,
            errors: {
                _form: error instanceof Error ? error.message : String(error),
            },
        };
    }
}
/**
 * Common schema definitions for reuse across the application
 */
// Email validation schema
export const emailSchema = z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be 100 characters or less");
// Password validation schema with strength requirements
export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be 100 characters or less")
    .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least 1 uppercase letter",
})
    .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least 1 lowercase letter",
})
    .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least 1 number",
})
    .refine((password) => /[^A-Za-z0-9]/.test(password), {
    message: "Password must contain at least 1 special character",
});
// Name validation schema
export const nameSchema = z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or less")
    .refine((name) => /^[a-zA-Z\s'-]+$/.test(name), {
    message: "Name can only contain letters, spaces, hyphens, and apostrophes",
});
// URL validation schema
export const urlSchema = z
    .string()
    .trim()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal(""));
// Phone validation schema
export const phoneSchema = z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be 20 characters or less")
    .refine((phone) => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone), {
    message: "Please enter a valid phone number",
})
    .optional()
    .or(z.literal(""));
// Date validation schema
export const dateSchema = z
    .string()
    .trim()
    .refine((date) => !isNaN(Date.parse(date)), {
    message: "Please enter a valid date",
});
// CSRF token schema
export const csrfTokenSchema = z.string().min(1, "CSRF token is required");
/**
 * Create a schema with CSRF protection
 * @param schema Base schema to enhance with CSRF protection
 * @returns Enhanced schema with CSRF token field
 */
export function withCsrfProtection(schema) {
    return schema.extend({
        csrfToken: csrfTokenSchema,
    });
}
