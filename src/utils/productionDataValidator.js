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
exports.validateAndCleanProductionData = validateAndCleanProductionData;
var client_1 = require("@/integrations/supabase/client");
// Patterns for identifying test/demo data
var TEST_PATTERNS = [
  "%test%",
  "%demo%",
  "%example%",
  "%sample%",
  "%dummy%",
  "%mock%",
];
/**
 * Validates production data and removes test/demo data if necessary
 * This is used by the admin system to ensure the database is ready for production
 */
function validateAndCleanProductionData() {
  return __awaiter(this, void 0, void 0, function () {
    var results, connectionError, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          results = {
            success: true,
            validRecords: 0,
            errors: [],
            warnings: [],
            timestamp: new Date().toISOString(),
            cleanupPerformed: false,
            validationDetails: {
              companies: { total: 0, valid: 0, cleaned: 0 },
              leads: { total: 0, valid: 0, cleaned: 0 },
              strategies: { total: 0, valid: 0, cleaned: 0 },
              campaigns: { total: 0, valid: 0, cleaned: 0 },
            },
          };
          _a.label = 1;
        case 1:
          _a.trys.push([1, 7, , 8]);
          return [
            4 /*yield*/,
            client_1.supabase.from("companies").select("count").limit(1),
          ];
        case 2:
          connectionError = _a.sent().error;
          if (connectionError) {
            results.errors.push({
              table: "system",
              message: "Database connection error: ".concat(
                connectionError.message,
              ),
              severity: "error",
            });
            results.success = false;
            return [2 /*return*/, results];
          }
          // Begin validation process
          return [4 /*yield*/, validateCompanies(results)];
        case 3:
          // Begin validation process
          _a.sent();
          return [4 /*yield*/, validateLeads(results)];
        case 4:
          _a.sent();
          return [4 /*yield*/, validateStrategies(results)];
        case 5:
          _a.sent();
          return [4 /*yield*/, validateCampaigns(results)];
        case 6:
          _a.sent();
          // Calculate total valid records across all tables
          results.validRecords =
            results.validationDetails.companies.valid +
            results.validationDetails.leads.valid +
            results.validationDetails.strategies.valid +
            results.validationDetails.campaigns.valid;
          results.success = results.errors.length === 0;
          return [2 /*return*/, results];
        case 7:
          error_1 = _a.sent();
          console.error("Validation error:", error_1);
          results.success = false;
          results.errors.push({
            table: "system",
            message: "System error during validation: ".concat(error_1.message),
            severity: "error",
          });
          return [2 /*return*/, results];
        case 8:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Validates and cleans companies table
 */
function validateCompanies(results) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      totalCount,
      countError,
      orConditions,
      _b,
      testCompanies,
      companiesError,
      _i,
      testCompanies_1,
      company,
      deleteError,
      _c,
      validCount,
      validError,
      error_2;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          _d.trys.push([0, 8, , 9]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .select("*", { count: "exact", head: true }),
          ];
        case 1:
          (_a = _d.sent()), (totalCount = _a.count), (countError = _a.error);
          if (countError)
            throw new Error(
              "Error counting companies: ".concat(countError.message),
            );
          results.validationDetails.companies.total = totalCount || 0;
          orConditions = TEST_PATTERNS.map(function (pattern) {
            return "name.ilike.".concat(pattern);
          }).join(", ");
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .select("id, name, created_at")
              .or(orConditions),
          ];
        case 2:
          (_b = _d.sent()),
            (testCompanies = _b.data),
            (companiesError = _b.error);
          if (companiesError) {
            results.errors.push({
              table: "companies",
              message: "Error checking companies: ".concat(
                companiesError.message,
              ),
              severity: "error",
            });
            return [2 /*return*/];
          }
          if (!(testCompanies && testCompanies.length > 0))
            return [3 /*break*/, 6];
          results.cleanupPerformed = true;
          results.validationDetails.companies.cleaned = testCompanies.length;
          (_i = 0), (testCompanies_1 = testCompanies);
          _d.label = 3;
        case 3:
          if (!(_i < testCompanies_1.length)) return [3 /*break*/, 6];
          company = testCompanies_1[_i];
          return [
            4 /*yield*/,
            client_1.supabase.from("companies").delete().eq("id", company.id),
          ];
        case 4:
          deleteError = _d.sent().error;
          if (deleteError) {
            results.errors.push({
              table: "companies",
              message: "Error removing test company "
                .concat(company.name, ": ")
                .concat(deleteError.message),
              recordId: company.id,
              severity: "error",
            });
          } else {
            results.warnings.push({
              table: "companies",
              message: "Removed test/demo company: ".concat(company.name),
              recordId: company.id,
              severity: "warning",
            });
          }
          _d.label = 5;
        case 5:
          _i++;
          return [3 /*break*/, 3];
        case 6:
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .select("id", { count: "exact", head: true })
              .not("name", "ilike", "%test%")
              .not("name", "ilike", "%demo%")
              .not("name", "ilike", "%example%")
              .not("name", "ilike", "%sample%"),
          ];
        case 7:
          (_c = _d.sent()), (validCount = _c.count), (validError = _c.error);
          if (validError) {
            results.errors.push({
              table: "companies",
              message: "Error counting valid companies: ".concat(
                validError.message,
              ),
              severity: "error",
            });
          } else {
            results.validationDetails.companies.valid = validCount || 0;
          }
          return [3 /*break*/, 9];
        case 8:
          error_2 = _d.sent();
          results.errors.push({
            table: "companies",
            message: "Error during company validation: ".concat(
              error_2.message,
            ),
            severity: "error",
          });
          return [3 /*break*/, 9];
        case 9:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Validates and cleans leads table
 */
function validateLeads(results) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      totalCount,
      countError,
      nameConditions,
      emailConditions,
      _b,
      testLeads,
      leadsError,
      _i,
      testLeads_1,
      lead,
      deleteError,
      _c,
      validCount,
      validError,
      error_3;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          _d.trys.push([0, 8, , 9]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("leads")
              .select("*", { count: "exact", head: true }),
          ];
        case 1:
          (_a = _d.sent()), (totalCount = _a.count), (countError = _a.error);
          if (countError)
            throw new Error(
              "Error counting leads: ".concat(countError.message),
            );
          results.validationDetails.leads.total = totalCount || 0;
          nameConditions = TEST_PATTERNS.map(function (pattern) {
            return "name.ilike.".concat(pattern);
          }).join(", ");
          emailConditions = TEST_PATTERNS.map(function (pattern) {
            return "email.ilike.".concat(pattern);
          }).join(", ");
          return [
            4 /*yield*/,
            client_1.supabase
              .from("leads")
              .select("id, name, email")
              .or("".concat(nameConditions, ", ").concat(emailConditions)),
          ];
        case 2:
          (_b = _d.sent()), (testLeads = _b.data), (leadsError = _b.error);
          if (leadsError) {
            results.errors.push({
              table: "leads",
              message: "Error checking leads: ".concat(leadsError.message),
              severity: "error",
            });
            return [2 /*return*/];
          }
          if (!(testLeads && testLeads.length > 0)) return [3 /*break*/, 6];
          results.cleanupPerformed = true;
          results.validationDetails.leads.cleaned = testLeads.length;
          (_i = 0), (testLeads_1 = testLeads);
          _d.label = 3;
        case 3:
          if (!(_i < testLeads_1.length)) return [3 /*break*/, 6];
          lead = testLeads_1[_i];
          return [
            4 /*yield*/,
            client_1.supabase.from("leads").delete().eq("id", lead.id),
          ];
        case 4:
          deleteError = _d.sent().error;
          if (deleteError) {
            results.errors.push({
              table: "leads",
              message: "Error removing test lead "
                .concat(lead.name || lead.email, ": ")
                .concat(deleteError.message),
              recordId: lead.id,
              severity: "error",
            });
          } else {
            results.warnings.push({
              table: "leads",
              message: "Removed test/demo lead: ".concat(
                lead.name || lead.email,
              ),
              recordId: lead.id,
              severity: "warning",
            });
          }
          _d.label = 5;
        case 5:
          _i++;
          return [3 /*break*/, 3];
        case 6:
          return [
            4 /*yield*/,
            client_1.supabase
              .from("leads")
              .select("id", { count: "exact", head: true })
              .not("name", "ilike", "%test%")
              .not("name", "ilike", "%demo%")
              .not("name", "ilike", "%example%")
              .not("email", "ilike", "%test%")
              .not("email", "ilike", "%demo%")
              .not("email", "ilike", "%example%"),
          ];
        case 7:
          (_c = _d.sent()), (validCount = _c.count), (validError = _c.error);
          if (validError) {
            results.errors.push({
              table: "leads",
              message: "Error counting valid leads: ".concat(
                validError.message,
              ),
              severity: "error",
            });
          } else {
            results.validationDetails.leads.valid = validCount || 0;
          }
          return [3 /*break*/, 9];
        case 8:
          error_3 = _d.sent();
          results.errors.push({
            table: "leads",
            message: "Error during leads validation: ".concat(error_3.message),
            severity: "error",
          });
          return [3 /*break*/, 9];
        case 9:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Validates and cleans strategies table
 */
function validateStrategies(results) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      totalCount,
      countError,
      titleConditions,
      descConditions,
      _b,
      testStrategies,
      strategiesError,
      _i,
      testStrategies_1,
      strategy,
      deleteError,
      _c,
      validCount,
      validError,
      error_4;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          _d.trys.push([0, 8, , 9]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("strategies")
              .select("*", { count: "exact", head: true }),
          ];
        case 1:
          (_a = _d.sent()), (totalCount = _a.count), (countError = _a.error);
          if (countError)
            throw new Error(
              "Error counting strategies: ".concat(countError.message),
            );
          results.validationDetails.strategies.total = totalCount || 0;
          titleConditions = TEST_PATTERNS.map(function (pattern) {
            return "title.ilike.".concat(pattern);
          }).join(", ");
          descConditions = TEST_PATTERNS.map(function (pattern) {
            return "description.ilike.".concat(pattern);
          }).join(", ");
          return [
            4 /*yield*/,
            client_1.supabase
              .from("strategies")
              .select("id, title, description")
              .or("".concat(titleConditions, ", ").concat(descConditions)),
          ];
        case 2:
          (_b = _d.sent()),
            (testStrategies = _b.data),
            (strategiesError = _b.error);
          if (strategiesError) {
            results.errors.push({
              table: "strategies",
              message: "Error checking strategies: ".concat(
                strategiesError.message,
              ),
              severity: "error",
            });
            return [2 /*return*/];
          }
          if (!(testStrategies && testStrategies.length > 0))
            return [3 /*break*/, 6];
          results.cleanupPerformed = true;
          results.validationDetails.strategies.cleaned = testStrategies.length;
          (_i = 0), (testStrategies_1 = testStrategies);
          _d.label = 3;
        case 3:
          if (!(_i < testStrategies_1.length)) return [3 /*break*/, 6];
          strategy = testStrategies_1[_i];
          return [
            4 /*yield*/,
            client_1.supabase.from("strategies").delete().eq("id", strategy.id),
          ];
        case 4:
          deleteError = _d.sent().error;
          if (deleteError) {
            results.errors.push({
              table: "strategies",
              message: "Error removing test strategy "
                .concat(strategy.title, ": ")
                .concat(deleteError.message),
              recordId: strategy.id,
              severity: "error",
            });
          } else {
            results.warnings.push({
              table: "strategies",
              message: "Removed test/demo strategy: ".concat(strategy.title),
              recordId: strategy.id,
              severity: "warning",
            });
          }
          _d.label = 5;
        case 5:
          _i++;
          return [3 /*break*/, 3];
        case 6:
          return [
            4 /*yield*/,
            client_1.supabase
              .from("strategies")
              .select("id", { count: "exact", head: true })
              .not("title", "ilike", "%test%")
              .not("title", "ilike", "%demo%")
              .not("title", "ilike", "%example%")
              .not("description", "ilike", "%test%")
              .not("description", "ilike", "%demo%")
              .not("description", "ilike", "%example%"),
          ];
        case 7:
          (_c = _d.sent()), (validCount = _c.count), (validError = _c.error);
          if (validError) {
            results.errors.push({
              table: "strategies",
              message: "Error counting valid strategies: ".concat(
                validError.message,
              ),
              severity: "error",
            });
          } else {
            results.validationDetails.strategies.valid = validCount || 0;
          }
          return [3 /*break*/, 9];
        case 8:
          error_4 = _d.sent();
          results.errors.push({
            table: "strategies",
            message: "Error during strategies validation: ".concat(
              error_4.message,
            ),
            severity: "error",
          });
          return [3 /*break*/, 9];
        case 9:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Validates and cleans campaigns table
 */
function validateCampaigns(results) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      totalCount,
      countError,
      nameConditions,
      _b,
      testCampaigns,
      campaignsError,
      _i,
      testCampaigns_1,
      campaign,
      deleteError,
      _c,
      validCount,
      validError,
      error_5;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          _d.trys.push([0, 8, , 9]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("campaigns")
              .select("*", { count: "exact", head: true }),
          ];
        case 1:
          (_a = _d.sent()), (totalCount = _a.count), (countError = _a.error);
          if (countError)
            throw new Error(
              "Error counting campaigns: ".concat(countError.message),
            );
          results.validationDetails.campaigns.total = totalCount || 0;
          nameConditions = TEST_PATTERNS.map(function (pattern) {
            return "name.ilike.".concat(pattern);
          }).join(", ");
          return [
            4 /*yield*/,
            client_1.supabase
              .from("campaigns")
              .select("id, name")
              .or(nameConditions),
          ];
        case 2:
          (_b = _d.sent()),
            (testCampaigns = _b.data),
            (campaignsError = _b.error);
          if (campaignsError) {
            results.errors.push({
              table: "campaigns",
              message: "Error checking campaigns: ".concat(
                campaignsError.message,
              ),
              severity: "error",
            });
            return [2 /*return*/];
          }
          if (!(testCampaigns && testCampaigns.length > 0))
            return [3 /*break*/, 6];
          results.cleanupPerformed = true;
          results.validationDetails.campaigns.cleaned = testCampaigns.length;
          (_i = 0), (testCampaigns_1 = testCampaigns);
          _d.label = 3;
        case 3:
          if (!(_i < testCampaigns_1.length)) return [3 /*break*/, 6];
          campaign = testCampaigns_1[_i];
          return [
            4 /*yield*/,
            client_1.supabase.from("campaigns").delete().eq("id", campaign.id),
          ];
        case 4:
          deleteError = _d.sent().error;
          if (deleteError) {
            results.errors.push({
              table: "campaigns",
              message: "Error removing test campaign "
                .concat(campaign.name, ": ")
                .concat(deleteError.message),
              recordId: campaign.id,
              severity: "error",
            });
          } else {
            results.warnings.push({
              table: "campaigns",
              message: "Removed test/demo campaign: ".concat(campaign.name),
              recordId: campaign.id,
              severity: "warning",
            });
          }
          _d.label = 5;
        case 5:
          _i++;
          return [3 /*break*/, 3];
        case 6:
          return [
            4 /*yield*/,
            client_1.supabase
              .from("campaigns")
              .select("id", { count: "exact", head: true })
              .not("name", "ilike", "%test%")
              .not("name", "ilike", "%demo%")
              .not("name", "ilike", "%example%"),
          ];
        case 7:
          (_c = _d.sent()), (validCount = _c.count), (validError = _c.error);
          if (validError) {
            results.errors.push({
              table: "campaigns",
              message: "Error counting valid campaigns: ".concat(
                validError.message,
              ),
              severity: "error",
            });
          } else {
            results.validationDetails.campaigns.valid = validCount || 0;
          }
          return [3 /*break*/, 9];
        case 8:
          error_5 = _d.sent();
          results.errors.push({
            table: "campaigns",
            message: "Error during campaigns validation: ".concat(
              error_5.message,
            ),
            severity: "error",
          });
          return [3 /*break*/, 9];
        case 9:
          return [2 /*return*/];
      }
    });
  });
}
