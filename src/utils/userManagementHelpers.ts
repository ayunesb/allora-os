
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

// Import the renamed function
import { assignUserToCompany } from './users/companyUsers';

// Re-export all functions for backward compatibility
export {
  fetchCompanyUsers,
  getUserIdByEmail,
  getUserProfileByEmail,
  updateUserRole,
  removeUserFromCompany,
  inviteUserToCompany,
  // Export the renamed function with the old name for backward compatibility
  assignUserToCompany as inviteUserToCompany
};
