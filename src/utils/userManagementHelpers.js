"use strict";
/**
 * This file is maintained for backward compatibility.
 * For new development, please import from '@/utils/users' instead.
 *
 * This file will be deprecated in a future release.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignUserToCompany =
  exports.inviteUserToCompany =
  exports.removeUserFromCompany =
  exports.updateUserRole =
  exports.getUserProfileByEmail =
  exports.getUserIdByEmail =
  exports.fetchCompanyUsers =
    void 0;
var users_1 = require("./users");
Object.defineProperty(exports, "fetchCompanyUsers", {
  enumerable: true,
  get: function () {
    return users_1.fetchCompanyUsers;
  },
});
Object.defineProperty(exports, "getUserIdByEmail", {
  enumerable: true,
  get: function () {
    return users_1.getUserIdByEmail;
  },
});
Object.defineProperty(exports, "getUserProfileByEmail", {
  enumerable: true,
  get: function () {
    return users_1.getUserProfileByEmail;
  },
});
Object.defineProperty(exports, "updateUserRole", {
  enumerable: true,
  get: function () {
    return users_1.updateUserRole;
  },
});
Object.defineProperty(exports, "removeUserFromCompany", {
  enumerable: true,
  get: function () {
    return users_1.removeUserFromCompany;
  },
});
// Import the inviteUserToCompany function and the renamed function
var invitations_1 = require("./users/invitations");
Object.defineProperty(exports, "inviteUserToCompany", {
  enumerable: true,
  get: function () {
    return invitations_1.inviteUserToCompany;
  },
});
var companyUsers_1 = require("./users/companyUsers");
Object.defineProperty(exports, "assignUserToCompany", {
  enumerable: true,
  get: function () {
    return companyUsers_1.assignUserToCompany;
  },
});
