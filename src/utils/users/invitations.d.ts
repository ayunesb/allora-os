/**
 * Invites a user to join a company
 * @param email Email of the user to invite
 * @param companyId ID of the company to invite to
 * @param role Role to assign to the user (default: 'user')
 * @returns Boolean indicating success
 */
export declare function inviteUserToCompany(
  email: string,
  companyId: string,
  role?: "admin" | "user",
): Promise<boolean>;
