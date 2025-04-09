
/**
 * This file is maintained for backward compatibility.
 * For new development, please import from '@/utils/users' instead.
 * 
 * This file will be deprecated in a future release.
 */

import { 
  fetchCompanyUsers,
  getUserIdByEmail,
  getUserProfileByEmail,
  updateUserRole,
  removeUserFromCompany,
  inviteUserToCompany
} from './users';

// Re-export all functions for backward compatibility
export {
  fetchCompanyUsers,
  getUserIdByEmail,
  getUserProfileByEmail,
  updateUserRole,
  removeUserFromCompany,
  inviteUserToCompany
};
