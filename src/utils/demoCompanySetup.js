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
exports.createDemoCompany = createDemoCompany;
exports.convertDemoToPublicCaseStudy = convertDemoToPublicCaseStudy;
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
var DEFAULT_DEMO = {
  name: "Allora Demo",
  industry: "SaaS",
  size: "10-50",
  goals: ["Showcase Platform", "Generate Leads", "Demonstrate AI Capabilities"],
  riskAppetite: "medium",
  channels: ["Email", "WhatsApp", "Zoom", "Phone"],
  marketingBudget: "$1k-$5k",
  targetMarkets: ["North America", "Europe"],
  isPublic: true,
};
/**
 * Creates a demo company with sample data
 */
function createDemoCompany(userId_1) {
  return __awaiter(this, arguments, void 0, function (userId, options) {
    var demoSettings,
      _a,
      companyData,
      companyError,
      companyId,
      profileError,
      error_1;
    if (options === void 0) {
      options = {};
    }
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, , 6]);
          demoSettings = __assign(__assign({}, DEFAULT_DEMO), options);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .insert({
                name: demoSettings.name,
                industry: demoSettings.industry,
                size: demoSettings.size,
                created_by: userId,
                is_demo: true,
                is_public: demoSettings.isPublic,
                status: "active",
              })
              .select()
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (companyData = _a.data), (companyError = _a.error);
          if (companyError) {
            throw new Error(
              "Error creating demo company: ".concat(companyError.message),
            );
          }
          companyId = companyData.id;
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .update({
                company_id: companyId,
                company: demoSettings.name,
                industry: demoSettings.industry,
                company_size: demoSettings.size,
                goals: demoSettings.goals,
                risk_appetite: demoSettings.riskAppetite,
                preferred_channels: demoSettings.channels,
                marketing_budget: demoSettings.marketingBudget,
                target_markets: demoSettings.targetMarkets,
                is_demo_account: true,
              })
              .eq("id", userId),
          ];
        case 2:
          profileError = _b.sent().error;
          if (profileError) {
            console.error(
              "Error updating user profile with demo company:",
              profileError,
            );
          }
          // Create demo content using edge function
          return [
            4 /*yield*/,
            generateDemoContent(userId, companyId, demoSettings),
          ];
        case 3:
          // Create demo content using edge function
          _b.sent();
          // Create sample leads
          return [4 /*yield*/, createSampleLeads(companyId)];
        case 4:
          // Create sample leads
          _b.sent();
          return [2 /*return*/, { success: true, companyId: companyId }];
        case 5:
          error_1 = _b.sent();
          console.error("Error creating demo company:", error_1);
          return [
            2 /*return*/,
            {
              success: false,
              error:
                error_1 instanceof Error ? error_1.message : String(error_1),
            },
          ];
        case 6:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Generates AI content for the demo company
 */
function generateDemoContent(userId, companyId, settings) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("generate-ai-content", {
              body: {
                userId: userId,
                companyId: companyId,
                industry: settings.industry,
                riskAppetite: settings.riskAppetite,
                companyName: settings.name,
                companyDetails: {
                  goals: settings.goals,
                  size: settings.size,
                  marketingBudget: settings.marketingBudget,
                  targetMarkets: settings.targetMarkets,
                },
                isDemo: true,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error generating demo content:", error);
            sonner_1.toast.error("Failed to generate demo content");
          } else {
            console.log("Demo content generated:", data);
            sonner_1.toast.success("Demo content generated successfully");
          }
          return [3 /*break*/, 3];
        case 2:
          error_2 = _b.sent();
          console.error("Error calling generate-ai-content function:", error_2);
          sonner_1.toast.error("Error generating demo content");
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Creates sample leads for the demo company
 */
function createSampleLeads(companyId) {
  return __awaiter(this, void 0, void 0, function () {
    var demoLeads, _i, demoLeads_1, lead, _a, leadData, leadError, error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          demoLeads = [
            {
              name: "John Smith",
              company: "TechCorp Inc.",
              email: "john.smith@example.com",
              phone: "(555) 123-4567",
              source: "Website",
              status: "new",
              score: 85,
            },
            {
              name: "Sarah Johnson",
              company: "Marketing Solutions",
              email: "sarah.j@example.com",
              phone: "(555) 987-6543",
              source: "LinkedIn",
              status: "contacted",
              score: 72,
            },
            {
              name: "Michael Brown",
              company: "Global Enterprises",
              email: "mbrown@example.com",
              phone: "(555) 555-5555",
              source: "Referral",
              status: "qualified",
              score: 93,
            },
          ];
          (_i = 0), (demoLeads_1 = demoLeads);
          _b.label = 1;
        case 1:
          if (!(_i < demoLeads_1.length)) return [3 /*break*/, 7];
          lead = demoLeads_1[_i];
          _b.label = 2;
        case 2:
          _b.trys.push([2, 5, , 6]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("leads")
              .insert({
                company_id: companyId,
                name: lead.name,
                company: lead.company,
                email: lead.email,
                phone: lead.phone,
                source: lead.source,
                status: lead.status,
                score: lead.score,
                is_demo: true,
              })
              .select()
              .single(),
          ];
        case 3:
          (_a = _b.sent()), (leadData = _a.data), (leadError = _a.error);
          if (leadError) {
            console.error("Error creating demo lead:", leadError);
            return [3 /*break*/, 6];
          }
          // Trigger Zapier event for the new lead
          return [
            4 /*yield*/,
            onNewLeadAdded({
              company: lead.company,
              leadName: lead.name,
              source: lead.source,
              leadId: leadData.id,
            }),
          ];
        case 4:
          // Trigger Zapier event for the new lead
          _b.sent();
          return [3 /*break*/, 6];
        case 5:
          error_3 = _b.sent();
          console.error("Error in sample lead creation:", error_3);
          return [3 /*break*/, 6];
        case 6:
          _i++;
          return [3 /*break*/, 1];
        case 7:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Converts a demo company to a case study (makes it public)
 */
function convertDemoToPublicCaseStudy(companyId) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .update({
                is_public: true,
                is_case_study: true,
                published_at: new Date().toISOString(),
              })
              .eq("id", companyId)
              .eq("is_demo", true),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw new Error(
              "Error converting to case study: ".concat(error.message),
            );
          }
          return [2 /*return*/, { success: true }];
        case 2:
          error_4 = _a.sent();
          console.error("Error converting demo to case study:", error_4);
          return [
            2 /*return*/,
            {
              success: false,
              error:
                error_4 instanceof Error ? error_4.message : String(error_4),
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function onNewLeadAdded(arg0) {
  throw new Error("Function not implemented.");
}
