/**
 * Secure encryption utilities for handling sensitive data
 *
 * NOTE: For production, consider using a proper key management solution
 * instead of storing encryption keys in the browser.
 */
/**
 * Simple encryption for data storage
 * Note: This is a basic implementation for demonstration
 * In production, use a proper crypto library with proper key management
 *
 * @param data The data to encrypt
 * @returns Encrypted data as a string
 */
export declare const encryptData: (data: string) => string;
/**
 * Simple decryption for data retrieval
 *
 * @param encryptedData The encrypted data to decrypt
 * @returns Decrypted data as a string
 */
export declare const decryptData: (encryptedData: string) => string;
/**
 * Secure storage interface with encryption
 */
export declare const secureStorage: {
    /**
     * Store data securely
     * @param key Storage key
     * @param value Value to store
     */
    setItem: (key: string, value: string) => void;
    /**
     * Retrieve data securely
     * @param key Storage key
     * @returns Decrypted value or null if not found
     */
    getItem: (key: string) => string | null;
    /**
     * Remove data securely
     * @param key Storage key
     */
    removeItem: (key: string) => void;
};
