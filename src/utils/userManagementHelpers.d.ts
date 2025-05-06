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
} from "./users";
import { inviteUserToCompany } from "./users/invitations";
import { assignUserToCompany } from "./users/companyUsers";
export {
  fetchCompanyUsers,
  getUserIdByEmail,
  getUserProfileByEmail,
  updateUserRole,
  removeUserFromCompany,
  inviteUserToCompany,
  assignUserToCompany,
};
