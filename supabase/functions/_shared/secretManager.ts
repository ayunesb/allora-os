/**
 * Secret management utility for Supabase Edge Functions
 * Use this to safely access secrets using Deno.env
 */

/**
 * Gets a secret value from Deno.env
 * @param key The secret key
 * @param required Whether the secret is required
 * @returns The secret value or empty string if not found
 */
export function getSecret(key: string, required = true): string {
  const value = Deno.env.get(key) || "";

  if (!value && required) {
    console.error(`Missing required secret: ${key}`);
  }

  return value;
}

/**
 * Validates that all required secrets are present
 * @param keys Array of required secret keys
 * @returns Object with validation result and any missing keys
 */
export function validateRequiredSecrets(keys: string[]): {
  valid: boolean;
  missingKeys: string[];
} {
  const missingKeys: string[] = [];

  for (const key of keys) {
    if (!Deno.env.get(key)) {
      missingKeys.push(key);
    }
  }

  return {
    valid: missingKeys.length === 0,
    missingKeys,
  };
}

/**
 * Returns masked version of a secret for logging
 * @param secret The secret to mask
 * @returns Masked version of the secret
 */
export function maskSecret(secret: string): string {
  if (!secret) return "";

  // Keep first 4 characters visible if longer than 8 chars
  if (secret.length > 8) {
    return `${secret.substring(0, 4)}${"•".repeat(secret.length - 4)}`;
  }

  // Otherwise mask all but first character
  return `${secret.substring(0, 1)}${"•".repeat(secret.length - 1)}`;
}
