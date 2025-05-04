/**
 * Updates a user's role within the system
 * @param userId The ID of the user to update
 * @param role The new role to assign
 * @returns Boolean indicating success
 */
export declare function updateUserRole(userId: string, role: 'admin' | 'user'): Promise<boolean>;
