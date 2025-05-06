"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrfTokenSchema =
  exports.dateSchema =
  exports.phoneSchema =
  exports.urlSchema =
  exports.nameSchema =
  exports.passwordSchema =
  exports.emailSchema =
    void 0;
exports.validateAndSanitize = validateAndSanitize;
exports.withCsrfProtection = withCsrfProtection;
var z = require("zod");
var sanitizers_1 = require("./sanitizers");
/**
 * Core form validation utilities
 */
/**
 * Enhanced form validation with sanitization
 * @param schema Zod schema for validation
 * @param data Data to validate
 * @returns Validation result
 */
function validateAndSanitize(schema, data) {
  try {
    // First sanitize all string inputs
    var sanitizedData =
      typeof data === "object" && data !== null
        ? (0, sanitizers_1.sanitizeFormData)(data)
        : data;
    // Then validate with zod
    var result = schema.safeParse(sanitizedData);
    if (!result.success) {
      var errors_1 = {};
      result.error.errors.forEach(function (err) {
        var path = err.path.join(".");
        errors_1[path] = err.message;
      });
      return {
        success: false,
        errors: errors_1,
      };
    }
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
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
exports.emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address")
  .min(5, "Email must be at least 5 characters")
  .max(100, "Email must be 100 characters or less");
// Password validation schema with strength requirements
exports.passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be 100 characters or less")
  .refine(
    function (password) {
      return /[A-Z]/.test(password);
    },
    {
      message: "Password must contain at least 1 uppercase letter",
    },
  )
  .refine(
    function (password) {
      return /[a-z]/.test(password);
    },
    {
      message: "Password must contain at least 1 lowercase letter",
    },
  )
  .refine(
    function (password) {
      return /[0-9]/.test(password);
    },
    {
      message: "Password must contain at least 1 number",
    },
  )
  .refine(
    function (password) {
      return /[^A-Za-z0-9]/.test(password);
    },
    {
      message: "Password must contain at least 1 special character",
    },
  );
// Name validation schema
exports.nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be 100 characters or less")
  .refine(
    function (name) {
      return /^[a-zA-Z\s'-]+$/.test(name);
    },
    {
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    },
  );
// URL validation schema
exports.urlSchema = z
  .string()
  .trim()
  .url("Please enter a valid URL")
  .optional()
  .or(z.literal(""));
// Phone validation schema
exports.phoneSchema = z
  .string()
  .trim()
  .min(10, "Phone number must be at least 10 digits")
  .max(20, "Phone number must be 20 characters or less")
  .refine(
    function (phone) {
      return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
        phone,
      );
    },
    {
      message: "Please enter a valid phone number",
    },
  )
  .optional()
  .or(z.literal(""));
// Date validation schema
exports.dateSchema = z
  .string()
  .trim()
  .refine(
    function (date) {
      return !isNaN(Date.parse(date));
    },
    {
      message: "Please enter a valid date",
    },
  );
// CSRF token schema
exports.csrfTokenSchema = z.string().min(1, "CSRF token is required");
/**
 * Create a schema with CSRF protection
 * @param schema Base schema to enhance with CSRF protection
 * @returns Enhanced schema with CSRF token field
 */
function withCsrfProtection(schema) {
  return schema.extend({
    csrfToken: exports.csrfTokenSchema,
  });
}
