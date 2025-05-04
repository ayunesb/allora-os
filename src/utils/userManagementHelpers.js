/**
 * This file is maintained for backward compatibility.
 * For new development, please import from '@/utils/users' instead.
 *
 * This file will be deprecated in a future release.
 */
import { fetchCompanyUsers, getUserIdByEmail, getUserProfileByEmail, updateUserRole, removeUserFromCompany } from './users';
// Import the inviteUserToCompany function and the renamed function
import { inviteUserToCompany } from './users/invitations';
import { assignUserToCompany } from './users/companyUsers';
// Re-export all functions for backward compatibility
export { fetchCompanyUsers, getUserIdByEmail, getUserProfileByEmail, updateUserRole, removeUserFromCompany, inviteUserToCompany, 
// Also export the legacy function
assignUserToCompany };
