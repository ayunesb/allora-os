"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCheckHandler = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var adminHelper_1 = require("@/utils/adminHelper");
var auditLogger_1 = require("@/utils/auditLogger");
var AdminCheckHandler = function (_a) {
  var user = _a.user,
    roleRequired = _a.roleRequired,
    adminOnly = _a.adminOnly,
    hasInitialized = _a.hasInitialized,
    children = _a.children;
  var _b = (0, react_1.useState)(false),
    adminCheckDone = _b[0],
    setAdminCheckDone = _b[1];
  var _c = (0, react_1.useState)(false),
    isUserAdmin = _c[0],
    setIsUserAdmin = _c[1];
  var _d = (0, react_1.useState)(0),
    verificationAttempts = _d[0],
    setVerificationAttempts = _d[1];
  var _e = (0, react_1.useState)(null),
    lastVerificationTime = _e[0],
    setLastVerificationTime = _e[1];
  // Enhanced security check with detailed logging and timing analysis
  (0, react_1.useEffect)(
    function () {
      var verifyAdminStatus = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var startTime, isAdmin, endTime, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!(user && (adminOnly || roleRequired === "admin")))
                  return [3 /*break*/, 10];
                _a.label = 1;
              case 1:
                _a.trys.push([1, 7, , 9]);
                if (
                  !(
                    lastVerificationTime &&
                    new Date().getTime() - lastVerificationTime.getTime() < 1000
                  )
                )
                  return [3 /*break*/, 3];
                console.warn(
                  "Admin verification attempts happening too quickly - possible abuse",
                );
                // Log suspicious rapid verification attempts
                return [
                  4 /*yield*/,
                  (0, auditLogger_1.logSecurityEvent)({
                    user: user.email || user.id || "unknown",
                    action: "SECURITY_EVENT",
                    resource: "admin_verification",
                    details: {
                      warning: "Rapid verification attempts detected",
                      attempts_count: verificationAttempts + 1,
                      time_window: "less than 1 second",
                    },
                    severity: "high",
                  }),
                ];
              case 2:
                // Log suspicious rapid verification attempts
                _a.sent();
                _a.label = 3;
              case 3:
                // Track verification attempts for security monitoring
                setVerificationAttempts(function (prev) {
                  return prev + 1;
                });
                setLastVerificationTime(new Date());
                // Log the admin verification attempt for security audit
                return [
                  4 /*yield*/,
                  (0, auditLogger_1.logSecurityEvent)({
                    user: user.email || user.id || "unknown",
                    action: "SECURITY_EVENT",
                    resource: "admin_verification",
                    details: {
                      attempt: verificationAttempts + 1,
                      method: "database_check",
                      timestamp: new Date().toISOString(),
                      user_agent: navigator.userAgent,
                      route: window.location.pathname,
                    },
                    severity: verificationAttempts > 3 ? "high" : "medium",
                  }),
                ];
              case 4:
                // Log the admin verification attempt for security audit
                _a.sent();
                startTime = performance.now();
                return [4 /*yield*/, (0, adminHelper_1.checkIfUserIsAdmin)()];
              case 5:
                isAdmin = _a.sent();
                endTime = performance.now();
                console.log(
                  "Admin check result:",
                  isAdmin,
                  "for user:",
                  user.email,
                  "(took ".concat(endTime - startTime, "ms)"),
                );
                setIsUserAdmin(isAdmin);
                setAdminCheckDone(true);
                // Log the verification result with timing information
                return [
                  4 /*yield*/,
                  (0, auditLogger_1.logSecurityEvent)({
                    user: user.email || user.id || "unknown",
                    action: "SECURITY_EVENT",
                    resource: "admin_verification",
                    details: {
                      result: isAdmin ? "success" : "denied",
                      timestamp: new Date().toISOString(),
                      verification_time_ms: Math.round(endTime - startTime),
                      total_attempts: verificationAttempts + 1,
                    },
                    severity: isAdmin ? "medium" : "high",
                  }),
                ];
              case 6:
                // Log the verification result with timing information
                _a.sent();
                // Alert on suspicious activity: multiple failed attempts
                if (!isAdmin && verificationAttempts > 3) {
                  console.error(
                    "Suspicious admin access attempts by user: ".concat(
                      user.email || user.id,
                    ),
                  );
                  // In production, this would trigger a security alert
                }
                return [3 /*break*/, 9];
              case 7:
                error_1 = _a.sent();
                console.error("Error checking admin status:", error_1);
                // Log the verification error with detailed information
                return [
                  4 /*yield*/,
                  (0, auditLogger_1.logSecurityEvent)({
                    user: user.email || user.id || "unknown",
                    action: "SECURITY_EVENT",
                    resource: "admin_verification",
                    details: {
                      result: "error",
                      error:
                        error_1 instanceof Error
                          ? error_1.message
                          : String(error_1),
                      timestamp: new Date().toISOString(),
                      stack:
                        error_1 instanceof Error ? error_1.stack : undefined,
                    },
                    severity: "high",
                  }),
                ];
              case 8:
                // Log the verification error with detailed information
                _a.sent();
                setAdminCheckDone(true); // Continue even on error
                setIsUserAdmin(false); // Fail secure - deny admin access on error
                return [3 /*break*/, 9];
              case 9:
                return [3 /*break*/, 11];
              case 10:
                setAdminCheckDone(true);
                _a.label = 11;
              case 11:
                return [2 /*return*/];
            }
          });
        });
      };
      if (user && !adminCheckDone && hasInitialized) {
        verifyAdminStatus();
      }
    },
    [
      user,
      adminOnly,
      roleRequired,
      adminCheckDone,
      hasInitialized,
      verificationAttempts,
      lastVerificationTime,
    ],
  );
  return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {
    children: children(isUserAdmin, adminCheckDone),
  });
};
exports.AdminCheckHandler = AdminCheckHandler;
