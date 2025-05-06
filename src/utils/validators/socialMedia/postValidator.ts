/**
 * Post Validator for Social Media
 *
 * This file contains the main validation function for entire social media posts
 */

import { ValidationResult } from "../types";
import { socialMediaPostSchema } from "./schema";
import { validateContentLength } from "./contentValidators";
import { validateHashtags } from "./contentValidators";
import { SocialPlatform } from "@/types/socialMedia";

/**
 * Validate a social media post for security and data integrity
 * Performs deep validation of all post properties
 *
 * @param postData Social media post data to validate
 * @returns Validation result with success status and message
 *
 * @example
 * // Validate post data before submission
 * const validation = validateSocialMediaPost(postFormData);
 * if (!validation.valid) {
 *   showError(validation.message);
 *   return;
 * }
 */
export async function validateSocialMediaPost(
  postData: any,
): Promise<ValidationResult> {
  try {
    // Basic schema validation
    const result = socialMediaPostSchema.safeParse(postData);

    if (!result.success) {
      const errorMessage =
        result.error.errors[0]?.message || "Invalid post data";
      return {
        valid: false,
        message: errorMessage,
      };
    }

    const data = result.data;

    // Platform-specific validations
    if (!validateContentLength(data.content, data.platform)) {
      return {
        valid: false,
        message: `Content exceeds maximum length for ${data.platform}`,
      };
    }

    // Media validations based on content type
    if (
      data.content_type !== "text" &&
      (!data.media_urls || data.media_urls.length === 0)
    ) {
      return {
        valid: false,
        message: `${data.content_type} posts require at least one media URL`,
      };
    }

    // Link validation for link type posts
    if (data.content_type === "link" && !data.link_url) {
      return {
        valid: false,
        message: "Link posts require a valid link URL",
      };
    }

    // Hashtag validation
    if (data.tags && data.tags.length > 0 && !validateHashtags(data.tags)) {
      return {
        valid: false,
        message: "One or more hashtags are invalid",
      };
    }

    // All validations passed
    return {
      valid: true,
      message: "Social media post validation successful",
    };
  } catch (error) {
    return {
      valid: false,
      message:
        "Error validating social media post: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}
