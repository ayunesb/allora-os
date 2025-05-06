"use strict";
/**
 * Secret management utility for Supabase Edge Functions
 * Use this to safely access secrets using Deno.env
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecret = getSecret;
exports.validateRequiredSecrets = validateRequiredSecrets;
exports.maskSecret = maskSecret;
/**
 * Gets a secret value from Deno.env
 * @param key The secret key
 * @param required Whether the secret is required
 * @returns The secret value or empty string if not found
 */
function getSecret(key, required) {
  if (required === void 0) {
    required = true;
  }
  var value = Deno.env.get(key) || "";
  if (!value && required) {
    console.error("Missing required secret: ".concat(key));
  }
  return value;
}
/**
 * Validates that all required secrets are present
 * @param keys Array of required secret keys
 * @returns Object with validation result and any missing keys
 */
function validateRequiredSecrets(keys) {
  var missingKeys = [];
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i];
    if (!Deno.env.get(key)) {
      missingKeys.push(key);
    }
  }
  return {
    valid: missingKeys.length === 0,
    missingKeys: missingKeys,
  };
}
/**
 * Returns masked version of a secret for logging
 * @param secret The secret to mask
 * @returns Masked version of the secret
 */
function maskSecret(secret) {
  if (!secret) return "";
  // Keep first 4 characters visible if longer than 8 chars
  if (secret.length > 8) {
    return ""
      .concat(secret.substring(0, 4))
      .concat("•".repeat(secret.length - 4));
  }
  // Otherwise mask all but first character
  return ""
    .concat(secret.substring(0, 1))
    .concat("•".repeat(secret.length - 1));
}
