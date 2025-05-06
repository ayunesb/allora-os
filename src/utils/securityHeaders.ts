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
export function generateCSP(): string {
  // Create a nonce for inline scripts
  const nonce = Math.random().toString(36).substring(2, 15);

  // Store the nonce for reference by components
  if (typeof window !== "undefined") {
    window.__CSP_NONCE = nonce;
  }

  return `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https://* blob:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com;
    frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
    form-action 'self';
    base-uri 'self';
    frame-ancestors 'self';
    object-src 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s+/g, " ")
    .trim();
}

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
export function getSecurityHeaders(
  options: SecurityHeadersInit = {},
): Record<string, string> {
  const {
    isProduction = process.env.NODE_ENV === "production",
    includeCSP = true,
    includeCacheControl = true,
  } = options;

  const headers: Record<string, string> = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  };

  // Only add Strict-Transport-Security in production
  if (isProduction) {
    headers["Strict-Transport-Security"] =
      "max-age=31536000; includeSubDomains";
  }

  // Add CSP if requested
  if (includeCSP) {
    headers["Content-Security-Policy"] = generateCSP();
  }

  // Add Cache-Control if requested
  if (includeCacheControl) {
    headers["Cache-Control"] = "no-store, max-age=0";
  }

  return headers;
}

/**
 * Apply security headers to the document
 * This should be called once on application initialization
 */
export function applySecurityHeaders(): void {
  if (typeof document === "undefined") return;

  try {
    // Set CSP
    const cspMeta = document.createElement("meta");
    cspMeta.httpEquiv = "Content-Security-Policy";
    cspMeta.content = generateCSP();
    document.head.appendChild(cspMeta);

    // Set other security headers as meta tags
    const headers = {
      "X-XSS-Protection": "1; mode=block",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };

    Object.entries(headers).forEach(([name, content]) => {
      const meta = document.createElement("meta");
      meta.httpEquiv = name;
      meta.content = content;
      document.head.appendChild(meta);
    });
  } catch (error) {
    console.error("Failed to apply security headers:", error);
  }
}

/**
 * Types for global window object
 */
declare global {
  interface Window {
    __CSP_NONCE?: string;
  }
}
