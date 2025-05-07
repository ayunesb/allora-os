var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export * from "./schema";
export * from "./urlValidators";
export * from "./contentValidators";
import { socialMediaPostSchema } from "./schema";
import { validateMediaUrls } from "./urlValidators";
/**
 * Validates a social media post with additional platform-specific logic
 */
export function validateSocialMediaPost(post) {
    return __awaiter(this, void 0, void 0, function* () {
        // First validate using the zod schema
        const schemaValidation = socialMediaPostSchema.safeParse(post);
        if (!schemaValidation.success) {
            return {
                valid: false,
                message: schemaValidation.error.issues[0].message,
            };
        }
        // Additional validation for content types that require media
        if (post.content_type === "image" || post.content_type === "video") {
            if (!post.media_urls || post.media_urls.length === 0) {
                return {
                    valid: false,
                    message: `Posts with content type '${post.content_type}' require at least one media URL`,
                };
            }
            if (!validateMediaUrls(post.media_urls)) {
                return {
                    valid: false,
                    message: "One or more media URLs are invalid",
                };
            }
        }
        // Additional validation for link type posts
        if (post.content_type === "link" && !post.link_url) {
            return {
                valid: false,
                message: "Link posts require a valid link URL",
            };
        }
        // All validations passed
        return { valid: true };
    });
}
