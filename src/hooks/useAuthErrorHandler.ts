import { useState, useCallback } from "react";
import { toast } from "sonner";
import { logger } from "@/utils/loggingService";
import { useNavigate } from "react-router-dom";

// Common authentication error types
export type AuthErrorType =
  | "invalid_credentials"
  | "email_not_confirmed"
  | "user_not_found"
  | "signup_failed"
  | "session_expired"
  | "network_error"
  | "rate_limit"
  | "weak_password"
  | "email_already_exists"
  | "password_recovery_failed"
  | "unauthorized"
  | "unknown";

interface AuthError {
  type: AuthErrorType;
  message: string;
  originalError?: any;
}

export function useAuthErrorHandler() {
  const [lastError, setLastError] = useState<AuthError | null>(null);
  const navigate = useNavigate();

  /**
   * Map Supabase error message to a standardized error type
   */
  const getErrorTypeFromMessage = useCallback((error: any): AuthErrorType => {
    const message = error?.message?.toLowerCase() || "";

    if (
      message.includes("invalid login") ||
      message.includes("invalid credentials")
    ) {
      return "invalid_credentials";
    } else if (message.includes("email not confirmed")) {
      return "email_not_confirmed";
    } else if (message.includes("user not found")) {
      return "user_not_found";
    } else if (
      message.includes("already registered") ||
      message.includes("already in use")
    ) {
      return "email_already_exists";
    } else if (message.includes("weak password")) {
      return "weak_password";
    } else if (message.includes("rate limit")) {
      return "rate_limit";
    } else if (
      message.includes("unauthorized") ||
      message.includes("not authorized")
    ) {
      return "unauthorized";
    } else if (message.includes("network") || message.includes("connection")) {
      return "network_error";
    } else if (message.includes("expired")) {
      return "session_expired";
    }

    return "unknown";
  }, []);

  /**
   * Format error message to be user-friendly
   */
  const getUserFriendlyMessage = useCallback(
    (errorType: AuthErrorType, originalMessage?: string): string => {
      switch (errorType) {
        case "invalid_credentials":
          return "Invalid email or password. Please try again.";
        case "email_not_confirmed":
          return "Please verify your email before logging in.";
        case "user_not_found":
          return "No account found with this email address.";
        case "email_already_exists":
          return "An account with this email already exists.";
        case "weak_password":
          return "Password is too weak. Please use a stronger password.";
        case "session_expired":
          return "Your session has expired. Please log in again.";
        case "network_error":
          return "Unable to connect to the authentication service. Please check your internet connection.";
        case "rate_limit":
          return "Too many attempts. Please try again later.";
        case "password_recovery_failed":
          return "Failed to send password recovery email. Please try again later.";
        case "unauthorized":
          return "You don't have permission to access this resource.";
        default:
          return (
            originalMessage || "An unexpected authentication error occurred."
          );
      }
    },
    [],
  );

  /**
   * Handle authentication error
   */
  const handleAuthError = useCallback(
    (
      error: any,
      options: {
        showToast?: boolean;
        redirectTo?: string;
        logError?: boolean;
      } = {},
    ) => {
      const { showToast = true, redirectTo, logError = true } = options;

      // Extract error details
      const errorMessage =
        error?.message || error?.error || "Authentication error";
      const errorType = getErrorTypeFromMessage(error);
      const userFriendlyMessage = getUserFriendlyMessage(
        errorType,
        errorMessage,
      );

      // Create structured error
      const authError: AuthError = {
        type: errorType,
        message: userFriendlyMessage,
        originalError: error,
      };

      // Store the error
      setLastError(authError);

      // Log the error
      if (logError) {
        logger.error("Authentication error:", {
          type: errorType,
          message: errorMessage,
          originalError: error,
        });
      }

      // Show toast notification
      if (showToast) {
        toast.error(userFriendlyMessage);
      }

      // Redirect if specified
      if (redirectTo) {
        if (errorType === "session_expired") {
          navigate(redirectTo, { state: { expired: true } });
        } else {
          navigate(redirectTo);
        }
      }

      return authError;
    },
    [getErrorTypeFromMessage, getUserFriendlyMessage, navigate],
  );

  /**
   * Clear the last error
   */
  const clearError = useCallback(() => {
    setLastError(null);
  }, []);

  /**
   * Check if the current error is of a specific type
   */
  const isErrorType = useCallback(
    (type: AuthErrorType) => {
      return lastError?.type === type;
    },
    [lastError],
  );

  return {
    lastError,
    handleAuthError,
    clearError,
    isErrorType,
  };
}
