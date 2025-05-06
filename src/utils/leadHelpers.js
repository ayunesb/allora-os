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
exports.fetchCompanyLeads = fetchCompanyLeads;
exports.updateLeadStatus = updateLeadStatus;
exports.deleteLead = deleteLead;
exports.createLead = createLead;
exports.getStatusColor = getStatusColor;
exports.formatLeadData = formatLeadData;
var supabase_1 = require("@/backend/supabase");
var errorHandling_1 = require("@/utils/api/errorHandling");
/**
 * Fetch leads for a specific campaign
 */
function fetchCompanyLeads(companyId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("leads")
              .select("*, campaigns(name)")
              .eq("campaigns.company_id", companyId)
              .order("created_at", { ascending: false }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [2 /*return*/, data || []];
        case 2:
          error_1 = _b.sent();
          (0, errorHandling_1.handleApiError)(error_1, {
            customMessage: "Failed to fetch company leads",
            rethrow: false,
          });
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Update the status of a lead
 */
function updateLeadStatus(leadId, status) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("leads")
              .update({ status: status })
              .eq("id", leadId),
          ];
        case 1:
          error = _a.sent().error;
          if (error) throw error;
          return [2 /*return*/, true];
        case 2:
          error_2 = _a.sent();
          (0, errorHandling_1.handleApiError)(error_2, {
            customMessage: "Failed to update lead status",
            rethrow: false,
          });
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Delete a lead
 */
function deleteLead(leadId) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.from("leads").delete().eq("id", leadId),
          ];
        case 1:
          error = _a.sent().error;
          if (error) throw error;
          return [2 /*return*/, true];
        case 2:
          error_3 = _a.sent();
          (0, errorHandling_1.handleApiError)(error_3, {
            customMessage: "Failed to delete lead",
            rethrow: false,
          });
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Create a new lead
 */
function createLead(leadData) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("leads")
              .insert([leadData])
              .select()
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [2 /*return*/, data];
        case 2:
          error_4 = _b.sent();
          (0, errorHandling_1.handleApiError)(error_4, {
            customMessage: "Failed to create new lead",
            rethrow: false,
          });
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Example function using LeadStatus
function getStatusColor(status) {
  switch (status) {
    case "new":
      return "blue";
    case "contacted":
      return "orange";
    case "qualified":
      return "green";
    case "proposal":
      return "purple";
    case "negotiation":
      return "yellow";
    case "closed":
      return "emerald";
    case "lost":
      return "red";
    default:
      return "gray";
  }
}
// Other lead helper functions
function formatLeadData(lead) {
  var _a;
  return __assign(__assign({}, lead), {
    status: lead.status || "new",
    campaignName:
      ((_a = lead.campaigns) === null || _a === void 0 ? void 0 : _a.name) ||
      "Unknown Campaign",
  });
}
