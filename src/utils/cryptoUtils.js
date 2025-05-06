"use strict";
/**
 * Secure encryption utilities for handling sensitive data
 *
 * NOTE: For production, consider using a proper key management solution
 * instead of storing encryption keys in the browser.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureStorage = exports.decryptData = exports.encryptData = void 0;
var loggingService_1 = require("./loggingService");
// Get a secure key for encryption (in a real app, this would be from a secure source)
var getEncryptionKey = function () {
  // In production, this would come from a secure source like a server-side API
  // For demo purposes, we use a fixed key - NEVER DO THIS IN PRODUCTION
  var devKey = "allora-platform-secure-key-2025";
  // In a real app, we would use a proper key management system
  return devKey;
};
/**
 * Simple encryption for data storage
 * Note: This is a basic implementation for demonstration
 * In production, use a proper crypto library with proper key management
 *
 * @param data The data to encrypt
 * @returns Encrypted data as a string
 */
var encryptData = function (data) {
  try {
    // In a real implementation, we would use the Web Crypto API
    // with proper key management
    // For now, we'll do a simple encoding for demonstration
    var key = getEncryptionKey();
    var encodedData = btoa(data);
    // In a real implementation, we would use AES-GCM or similar
    return encodedData;
  } catch (error) {
    loggingService_1.logger.error("Error encrypting data:", error);
    // Fallback to unencrypted but marked as such
    return "unencrypted_fallback:".concat(data);
  }
};
exports.encryptData = encryptData;
/**
 * Simple decryption for data retrieval
 *
 * @param encryptedData The encrypted data to decrypt
 * @returns Decrypted data as a string
 */
var decryptData = function (encryptedData) {
  try {
    // Handle fallback case
    if (encryptedData.startsWith("unencrypted_fallback:")) {
      return encryptedData.substring("unencrypted_fallback:".length);
    }
    // In a real implementation, we would use the Web Crypto API
    // with proper key management
    // For now, we'll do a simple decoding for demonstration
    var key = getEncryptionKey();
    return atob(encryptedData);
  } catch (error) {
    loggingService_1.logger.error("Error decrypting data:", error);
    return "";
  }
};
exports.decryptData = decryptData;
/**
 * Secure storage interface with encryption
 */
exports.secureStorage = {
  /**
   * Store data securely
   * @param key Storage key
   * @param value Value to store
   */
  setItem: function (key, value) {
    try {
      var encryptedValue = (0, exports.encryptData)(value);
      localStorage.setItem("secure_".concat(key), encryptedValue);
    } catch (error) {
      loggingService_1.logger.error("Error in secure storage setItem:", error);
    }
  },
  /**
   * Retrieve data securely
   * @param key Storage key
   * @returns Decrypted value or null if not found
   */
  getItem: function (key) {
    try {
      var encryptedValue = localStorage.getItem("secure_".concat(key));
      if (!encryptedValue) return null;
      return (0, exports.decryptData)(encryptedValue);
    } catch (error) {
      loggingService_1.logger.error("Error in secure storage getItem:", error);
      return null;
    }
  },
  /**
   * Remove data securely
   * @param key Storage key
   */
  removeItem: function (key) {
    try {
      localStorage.removeItem("secure_".concat(key));
    } catch (error) {
      loggingService_1.logger.error(
        "Error in secure storage removeItem:",
        error,
      );
    }
  },
};
