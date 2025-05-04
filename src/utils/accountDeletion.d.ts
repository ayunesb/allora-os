/**
 * Deletes a user account and all associated data
 * This is a destructive action that cannot be undone
 */
export declare function deleteUserAccount(): Promise<{
    success: boolean;
    error?: string;
}>;
