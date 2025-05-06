/**
 * Security Headers Utility
 *
 * This file contains utilities for setting security headers
 * to protect against common web vulnerabilities.
 */
/**
 * Generate Content Security Policy
 * @returns CSP header value
 */
export declare function generateCSP(): string;
interface SecurityHeadersInit {
  isProduction?: boolean;
  includeCSP?: boolean;
  includeCacheControl?: boolean;
}
/**
 * Generate security headers for fetch requests
 * @param options Security headers options
 * @returns Record of security headers
 */
export declare function getSecurityHeaders(
  options?: SecurityHeadersInit,
): Record<string, string>;
/**
 * Apply security headers to the document
 * This should be called once on application initialization
 */
export declare function applySecurityHeaders(): void;
/**
 * Types for global window object
 */
declare global {
  interface Window {
    __CSP_NONCE?: string;
  }
}
export {};
