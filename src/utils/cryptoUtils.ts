/**
 * Secure encryption utilities for handling sensitive data
 *
 * NOTE: For production, consider using a proper key management solution
 * instead of storing encryption keys in the browser.
 */

import { logger } from "./loggingService";

// Get a secure key for encryption (in a real app, this would be from a secure source)
const getEncryptionKey = (): string => {
  // In production, this would come from a secure source like a server-side API
  // For demo purposes, we use a fixed key - NEVER DO THIS IN PRODUCTION
  const devKey = "allora-platform-secure-key-2025";

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
export const encryptData = (data: string): string => {
  try {
    // In a real implementation, we would use the Web Crypto API
    // with proper key management

    // For now, we'll do a simple encoding for demonstration
    const key = getEncryptionKey();
    const encodedData = btoa(data);

    // In a real implementation, we would use AES-GCM or similar
    return encodedData;
  } catch (error) {
    logger.error("Error encrypting data:", error);
    // Fallback to unencrypted but marked as such
    return `unencrypted_fallback:${data}`;
  }
};

/**
 * Simple decryption for data retrieval
 *
 * @param encryptedData The encrypted data to decrypt
 * @returns Decrypted data as a string
 */
export const decryptData = (encryptedData: string): string => {
  try {
    // Handle fallback case
    if (encryptedData.startsWith("unencrypted_fallback:")) {
      return encryptedData.substring("unencrypted_fallback:".length);
    }

    // In a real implementation, we would use the Web Crypto API
    // with proper key management

    // For now, we'll do a simple decoding for demonstration
    const key = getEncryptionKey();
    return atob(encryptedData);
  } catch (error) {
    logger.error("Error decrypting data:", error);
    return "";
  }
};

/**
 * Secure storage interface with encryption
 */
export const secureStorage = {
  /**
   * Store data securely
   * @param key Storage key
   * @param value Value to store
   */
  setItem: (key: string, value: string): void => {
    try {
      const encryptedValue = encryptData(value);
      localStorage.setItem(`secure_${key}`, encryptedValue);
    } catch (error) {
      logger.error("Error in secure storage setItem:", error);
    }
  },

  /**
   * Retrieve data securely
   * @param key Storage key
   * @returns Decrypted value or null if not found
   */
  getItem: (key: string): string | null => {
    try {
      const encryptedValue = localStorage.getItem(`secure_${key}`);
      if (!encryptedValue) return null;

      return decryptData(encryptedValue);
    } catch (error) {
      logger.error("Error in secure storage getItem:", error);
      return null;
    }
  },

  /**
   * Remove data securely
   * @param key Storage key
   */
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(`secure_${key}`);
    } catch (error) {
      logger.error("Error in secure storage removeItem:", error);
    }
  },
};
