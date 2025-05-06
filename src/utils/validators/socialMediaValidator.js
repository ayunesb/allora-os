/**
 * Social Media Validators
 *
 * This file re-exports all validators from the restructured socialMedia directory
 * for backwards compatibility.
 */
export * from "./socialMedia";
export function validateCreatePost(input) {
    return !!input.content && !!input.platform;
}
export function validateUpdatePost(input) {
    return !!input.postId && validateCreatePost(input);
}
