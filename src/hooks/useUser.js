"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = void 0;
var AuthContext_1 = require("@/context/AuthContext");
var authCompatibility_1 = require("@/utils/authCompatibility");
var useUser = function () {
  var _a, _b, _c, _d;
  var auth = (0, AuthContext_1.useAuth)();
  var normalizedUser = (0, authCompatibility_1.normalizeUserObject)(
    (auth === null || auth === void 0 ? void 0 : auth.user) ||
      (auth === null || auth === void 0 ? void 0 : auth.profile),
  );
  // Safely return user or null if not available
  return {
    user: normalizedUser,
    userDetails: normalizedUser
      ? {
          id: normalizedUser.id,
          email: normalizedUser.email,
          name:
            normalizedUser.name ||
            ""
              .concat(normalizedUser.firstName || "", " ")
              .concat(normalizedUser.lastName || "")
              .trim(),
          firstName:
            normalizedUser.firstName ||
            ((_a = normalizedUser.user_metadata) === null || _a === void 0
              ? void 0
              : _a.firstName) ||
            "",
          lastName:
            normalizedUser.lastName ||
            ((_b = normalizedUser.user_metadata) === null || _b === void 0
              ? void 0
              : _b.lastName) ||
            "",
          avatar_url: normalizedUser.avatar_url || normalizedUser.avatar,
          is_admin:
            ((_c = normalizedUser.app_metadata) === null || _c === void 0
              ? void 0
              : _c.is_admin) || normalizedUser.role === "admin",
          role: normalizedUser.role || "user",
          company: normalizedUser.company || "",
          company_id: normalizedUser.company_id || "",
          industry: normalizedUser.industry || "",
        }
      : null,
    isAdmin:
      ((_d =
        normalizedUser === null || normalizedUser === void 0
          ? void 0
          : normalizedUser.app_metadata) === null || _d === void 0
        ? void 0
        : _d.is_admin) ||
      (normalizedUser === null || normalizedUser === void 0
        ? void 0
        : normalizedUser.role) === "admin" ||
      false,
    isLoading:
      (auth === null || auth === void 0 ? void 0 : auth.loading) ||
      (auth === null || auth === void 0 ? void 0 : auth.isLoading) ||
      false,
    isAuthenticated: !!normalizedUser,
    session: auth === null || auth === void 0 ? void 0 : auth.session,
  };
};
exports.useUser = useUser;
