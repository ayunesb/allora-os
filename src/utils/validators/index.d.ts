import { validateUserAuthentication } from "./authValidator";
export { validateUserAuthentication };
export declare const validateLegalAcceptance: () => Promise<{
  valid: boolean;
  message: string;
}>;
export declare const validateApiConnections: () => Promise<{
  valid: boolean;
  message: string;
}>;
export declare const validateExecutiveBoardroom: () => Promise<{
  valid: boolean;
  message: string;
}>;
export declare const validateDatabaseSecurity: () => Promise<{
  valid: boolean;
  message: string;
}>;
export declare const validatePerformanceOptimization: () => Promise<{
  valid: boolean;
  message: string;
}>;
export declare const validateRLSPolicies: () => Promise<{
  valid: boolean;
  message: string;
}>;
export declare const validateDatabaseFunctions: () => Promise<{
  valid: boolean;
  message: string;
}>;
