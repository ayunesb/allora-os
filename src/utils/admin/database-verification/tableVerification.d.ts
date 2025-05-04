import { DatabaseTableStatus } from '@/types/databaseVerification';
/**
 * Verifies if required tables exist in the database
 */
export declare function verifyDatabaseTables(): Promise<DatabaseTableStatus[]>;
