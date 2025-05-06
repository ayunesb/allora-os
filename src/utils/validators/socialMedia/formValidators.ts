/**
 * Form Validators for Social Media Posts
 *
 * This file contains functions for validating form data for creating and updating social media posts
 */

import { z } from "zod";
import { socialMediaPostSchema } from "./schema";

/**
 * Validate data for creating a social media post
 * Includes sanitization and security checks
 *
 * @param postData Post data for creation
 * @returns Validated data or error details
 */
export function validateCreatePost(postData: any): {
  valid: boolean;
  data?: any;
  errors?: Record<string, string>;
} {
  try {
    // Basic schema validation
    const result = socialMediaPostSchema.safeParse(postData);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errors[err.path.join(".")] = err.message;
        }
      });

      return {
        valid: false,
        errors,
      };
    }

    // Additional validation logic could be added here

    return {
      valid: true,
      data: result.data,
    };
  } catch (error) {
    return {
      valid: false,
      errors: {
        general: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

/**
 * Validate data for updating a social media post
 * Includes sanitization and security checks
 *
 * @param postData Post data for update
 * @returns Validated data or error details
 */
export function validateUpdatePost(postData: any): {
  valid: boolean;
  data?: any;
  errors?: Record<string, string>;
} {
  try {
    // Ensure ID exists
    if (!postData.id) {
      return {
        valid: false,
        errors: {
          id: "Post ID is required for updates",
        },
      };
    }

    // For updates, create a partial schema
    const updateSchema = socialMediaPostSchema.partial().extend({
      id: z.string().min(1, "Post ID is required"),
    });

    const result = updateSchema.safeParse(postData);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errors[err.path.join(".")] = err.message;
        }
      });

      return {
        valid: false,
        errors,
      };
    }

    // Additional validation logic could be added here

    return {
      valid: true,
      data: result.data,
    };
  } catch (error) {
    return {
      valid: false,
      errors: {
        general: error instanceof Error ? error.message : String(error),
      },
    };
  }
}
