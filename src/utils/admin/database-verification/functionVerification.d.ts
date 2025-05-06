import { FunctionStatus } from "@/types/databaseVerification";
/**
 * Verifies the existence and security of required database functions
 * @returns Promise with array of function verification results
 */
export declare function verifyDatabaseFunctions(): Promise<FunctionStatus[]>;
