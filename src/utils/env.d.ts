/**
 * Helper functions to safely access environment variables
 */
export declare function getAppUrl(): string;
export declare function getSupabaseUrl(): any;
export declare function getSupabaseAnonKey(): any;
/**
 * Type-safe mapping of environment variable names to their expected types
 */
type EnvVar = {
  name: string;
  required: boolean;
  fallback?: string;
};
declare const ENV_VARS: Record<string, EnvVar>;
/**
 * Gets an environment variable, with type checking and fallbacks
 */
export declare function getEnvVariable(key: keyof typeof ENV_VARS): string;
export {};
