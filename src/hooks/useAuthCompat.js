"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthCompat = void 0;
var AuthContext_1 = require("@/context/AuthContext");
var authCompatibility_1 = require("@/utils/authCompatibility");
var useAuthCompat = function () {
  var auth = (0, AuthContext_1.useAuth)();
  var authCompat = (0, authCompatibility_1.createAuthCompatibilityLayer)(auth);
  // Ensure session is properly passed through
  return __assign(__assign({}, authCompat), {
    session: auth.session,
    isAuthenticated: !!auth.user,
  });
};
exports.useAuthCompat = useAuthCompat;
exports.default = exports.useAuthCompat;
