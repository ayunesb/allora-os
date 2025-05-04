/**
 * Removes a user from a company by updating their company_id to null
 * @param userId The ID of the user to remove
 * @returns Boolean indicating success
 */
export declare function removeUserFromCompany(userId: string): Promise<boolean>;
/**
 * Invites a user to join a company and assigns them a role (DEPRECATED)
 * This is a legacy function that is maintained for backward compatibility.
 * For new code, use the inviteUserToCompany function from invitations.ts instead.
 *
 * @deprecated Use inviteUserToCompany from invitations.ts instead
 * @param userEmail The email of the user to invite
 * @param companyId The company ID to assign the user to
 * @param role The role to assign to the user
 * @returns Boolean indicating success
 */
export declare function assignUserToCompany(userEmail: string, companyId: string, role?: 'admin' | 'user'): Promise<boolean>;
