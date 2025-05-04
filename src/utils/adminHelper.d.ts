/**
 * Checks if a table exists in the database
 */
export declare function checkTableExists(tableName: string): Promise<boolean>;
/**
 * Checks if Row Level Security is enabled for a table
 */
export declare function checkRlsEnabled(tableName: string): Promise<boolean>;
/**
 * Checks if the current user has admin privileges
 */
export declare function checkIfUserIsAdmin(): Promise<boolean>;
