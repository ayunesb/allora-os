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
exports.logSystemChange = exports.log = void 0;
exports.logSecurityEvent = logSecurityEvent;
exports.logAuditEvent = logAuditEvent;
exports.logComplianceChange = logComplianceChange;
var client_1 = require("@/integrations/supabase/client");
var loggingService_1 = require("@/utils/loggingService");
function logSecurityEvent(eventTypeOrDetails_1, details_1, userId_1) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function (eventTypeOrDetails, details, userId, severity, metadata) {
      var user, action, resource, details_2, severity_1, error_1;
      if (severity === void 0) {
        severity = 1;
      }
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 4, , 5]);
            if (!(typeof eventTypeOrDetails === "object"))
              return [3 /*break*/, 2];
            (user = eventTypeOrDetails.user),
              (action = eventTypeOrDetails.action),
              (resource = eventTypeOrDetails.resource),
              (details_2 = eventTypeOrDetails.details),
              (severity_1 = eventTypeOrDetails.severity);
            // Log to console in development
            if (process.env.NODE_ENV === "development") {
              loggingService_1.logger.warn(
                "SECURITY EVENT ["
                  .concat(severity_1, "]: ")
                  .concat(action, " - ")
                  .concat(resource, " ")
                  .concat(user ? "(User: ".concat(user, ")") : ""),
              );
            }
            // Log to audit_logs table in Supabase
            return [
              4 /*yield*/,
              client_1.supabase.from("agent_logs").insert({
                type: "security",
                event: action,
                details: JSON.stringify(details_2 || {}),
                user_id: user || null,
                severity:
                  severity_1 === "high" ? 3 : severity_1 === "medium" ? 2 : 1,
                metadata: details_2 || {},
                tenant_id: "development",
              }),
            ];
          case 1:
            // Log to audit_logs table in Supabase
            _a.sent();
            return [2 /*return*/, true];
          case 2:
            // Legacy format
            // Log to console in development
            if (process.env.NODE_ENV === "development") {
              loggingService_1.logger.warn(
                "SECURITY EVENT ["
                  .concat(severity, "]: ")
                  .concat(eventTypeOrDetails, " - ")
                  .concat(details, " ")
                  .concat(userId ? "(User: ".concat(userId, ")") : ""),
              );
            }
            // Log to audit_logs table in Supabase
            return [
              4 /*yield*/,
              client_1.supabase.from("agent_logs").insert({
                type: "security",
                event: eventTypeOrDetails,
                details: details,
                user_id: userId || null,
                severity: severity,
                metadata: metadata || {},
                tenant_id: "development",
              }),
            ];
          case 3:
            // Log to audit_logs table in Supabase
            _a.sent();
            return [2 /*return*/, true];
          case 4:
            error_1 = _a.sent();
            loggingService_1.logger.error(
              "Failed to log security event",
              error_1,
            );
            return [2 /*return*/, false];
          case 5:
            return [2 /*return*/];
        }
      });
    },
  );
}
/**
 * Log an audit event for compliance or record-keeping
 *
 * @param eventType The type of audit event
 * @param details Details about the event
 * @param userId Optional user ID associated with the event
 * @param metadata Any additional metadata to log
 * @returns Success status
 */
function logAuditEvent(eventType, details, userId, metadata) {
  return __awaiter(this, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          // Log to console in development
          if (process.env.NODE_ENV === "development") {
            loggingService_1.logger.info(
              "AUDIT EVENT: "
                .concat(eventType, " - ")
                .concat(details, " ")
                .concat(userId ? "(User: ".concat(userId, ")") : ""),
            );
          }
          // Log to audit_logs table in Supabase
          return [
            4 /*yield*/,
            client_1.supabase.from("agent_logs").insert({
              type: "audit",
              event: eventType,
              details: details,
              user_id: userId || null,
              metadata: metadata || {},
              tenant_id: "development",
            }),
          ];
        case 1:
          // Log to audit_logs table in Supabase
          _a.sent();
          return [2 /*return*/, true];
        case 2:
          error_2 = _a.sent();
          loggingService_1.logger.error("Failed to log audit event", error_2);
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Log a compliance change for audit purposes
 *
 * @param userId User who made the change
 * @param details Details about the compliance change
 * @param metadata Any additional metadata to log
 * @returns Success status
 */
function logComplianceChange(userId, details, metadata) {
  return __awaiter(this, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          // Log to console in development
          if (process.env.NODE_ENV === "development") {
            loggingService_1.logger.info(
              "COMPLIANCE CHANGE: "
                .concat(details, " ")
                .concat(userId ? "(User: ".concat(userId, ")") : ""),
            );
          }
          // Log to audit_logs table in Supabase
          return [
            4 /*yield*/,
            client_1.supabase.from("agent_logs").insert({
              type: "compliance",
              event: "compliance_change",
              details: details,
              user_id: userId || null,
              metadata: metadata || {},
              tenant_id: "development",
            }),
          ];
        case 1:
          // Log to audit_logs table in Supabase
          _a.sent();
          return [2 /*return*/, true];
        case 2:
          error_3 = _a.sent();
          loggingService_1.logger.error(
            "Failed to log compliance change",
            error_3,
          );
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Add the log export that was missing and causing errors
exports.log = logAuditEvent;
// Also add logSystemChange for backward compatibility
exports.logSystemChange = logAuditEvent;
function logAudit(_a) {
  var _b = _a.severity,
    severity = _b === void 0 ? 1 : _b,
    eventType = _a.eventType,
    details = _a.details,
    userId = _a.userId,
    metadata = _a.metadata;
  // ...existing code...
}
