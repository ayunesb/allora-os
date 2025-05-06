/**
 * Send an alert to a Slack webhook
 * @param message The message to send
 * @param severity Optional severity level (info, warning, error)
 * @returns Success status
 */
export declare function sendSlackAlert(
  message: string,
  severity?: "info" | "warning" | "error",
): Promise<boolean>;
/**
 * Helper function to wrap operations with Slack error reporting
 * @param operation Function to execute
 * @param errorMessage Error message to send to Slack if the operation fails
 * @returns Result of the operation
 */
export declare function withSlackErrorReporting<T>(
  operation: () => Promise<T>,
  errorMessage?: string,
): Promise<T>;
