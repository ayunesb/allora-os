"use strict";
/**
 * Security Headers Utility
 *
 * This file contains utilities for setting security headers
 * to protect against common web vulnerabilities.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSP = generateCSP;
exports.getSecurityHeaders = getSecurityHeaders;
exports.applySecurityHeaders = applySecurityHeaders;
/**
 * Generate Content Security Policy
 * @returns CSP header value
 */
function generateCSP() {
  // Create a nonce for inline scripts
  var nonce = Math.random().toString(36).substring(2, 15);
  // Store the nonce for reference by components
  if (typeof window !== "undefined") {
    window.__CSP_NONCE = nonce;
  }
  return "\n    default-src 'self';\n    script-src 'self' 'nonce-"
    .concat(
      nonce,
      "' https://cdn.jsdelivr.net;\n    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;\n    img-src 'self' data: https://* blob:;\n    font-src 'self' https://fonts.gstatic.com;\n    connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.stripe.com;\n    frame-src 'self' https://js.stripe.com https://hooks.stripe.com;\n    form-action 'self';\n    base-uri 'self';\n    frame-ancestors 'self';\n    object-src 'none';\n    upgrade-insecure-requests;\n  ",
    )
    .replace(/\s+/g, " ")
    .trim();
}
/**
 * Generate security headers for fetch requests
 * @param options Security headers options
 * @returns Record of security headers
 */
function getSecurityHeaders(options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.isProduction,
    isProduction = _a === void 0 ? process.env.NODE_ENV === "production" : _a,
    _b = options.includeCSP,
    includeCSP = _b === void 0 ? true : _b,
    _c = options.includeCacheControl,
    includeCacheControl = _c === void 0 ? true : _c;
  var headers = {
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
function applySecurityHeaders() {
  if (typeof document === "undefined") return;
  try {
    // Set CSP
    var cspMeta = document.createElement("meta");
    cspMeta.httpEquiv = "Content-Security-Policy";
    cspMeta.content = generateCSP();
    document.head.appendChild(cspMeta);
    // Set other security headers as meta tags
    var headers = {
      "X-XSS-Protection": "1; mode=block",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };
    Object.entries(headers).forEach(function (_a) {
      var name = _a[0],
        content = _a[1];
      var meta = document.createElement("meta");
      meta.httpEquiv = name;
      meta.content = content;
      document.head.appendChild(meta);
    });
  } catch (error) {
    console.error("Failed to apply security headers:", error);
  }
}
