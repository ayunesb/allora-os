"use strict";
/**
 * Form Validators for Social Media Posts
 *
 * This file contains functions for validating form data for creating and updating social media posts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreatePost = validateCreatePost;
exports.validateUpdatePost = validateUpdatePost;
var zod_1 = require("zod");
var schema_1 = require("./schema");
/**
 * Validate data for creating a social media post
 * Includes sanitization and security checks
 *
 * @param postData Post data for creation
 * @returns Validated data or error details
 */
function validateCreatePost(postData) {
  try {
    // Basic schema validation
    var result = schema_1.socialMediaPostSchema.safeParse(postData);
    if (!result.success) {
      var errors_1 = {};
      result.error.errors.forEach(function (err) {
        if (err.path.length > 0) {
          errors_1[err.path.join(".")] = err.message;
        }
      });
      return {
        valid: false,
        errors: errors_1,
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
function validateUpdatePost(postData) {
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
    var updateSchema = schema_1.socialMediaPostSchema.partial().extend({
      id: zod_1.z.string().min(1, "Post ID is required"),
    });
    var result = updateSchema.safeParse(postData);
    if (!result.success) {
      var errors_2 = {};
      result.error.errors.forEach(function (err) {
        if (err.path.length > 0) {
          errors_2[err.path.join(".")] = err.message;
        }
      });
      return {
        valid: false,
        errors: errors_2,
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
