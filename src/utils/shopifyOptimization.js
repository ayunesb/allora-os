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
exports.analyzeShopifyStore = analyzeShopifyStore;
exports.implementOptimization = implementOptimization;
var supabase_1 = require("@/backend/supabase");
var sonner_1 = require("sonner");
/**
 * Analyzes a Shopify store and provides optimization recommendations
 * @param storeId The Shopify store ID to analyze
 * @returns Promise with the optimization report
 */
function analyzeShopifyStore(storeId) {
  return __awaiter(this, void 0, void 0, function () {
    var storeData, recommendations, report, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 4, , 5]);
          return [4 /*yield*/, getShopifyStoreData(storeId)];
        case 1:
          storeData = _a.sent();
          if (!storeData) {
            throw new Error("Store data not found");
          }
          return [4 /*yield*/, generateStoreRecommendations(storeData)];
        case 2:
          recommendations = _a.sent();
          report = {
            storeId: storeData.id,
            storeName: storeData.name,
            score: calculateHealthScore(storeData, recommendations),
            recommendations: recommendations,
            lastUpdated: new Date().toISOString(),
          };
          // Save report to database
          return [4 /*yield*/, saveOptimizationReport(report)];
        case 3:
          // Save report to database
          _a.sent();
          sonner_1.toast.success("Shopify store analysis complete");
          return [2 /*return*/, report];
        case 4:
          error_1 = _a.sent();
          console.error("Error analyzing Shopify store:", error_1);
          sonner_1.toast.error(
            "Failed to analyze Shopify store: ".concat(error_1.message),
          );
          return [2 /*return*/, null];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Retrieves basic data about a Shopify store
 * @param storeId The Shopify store ID
 * @returns Promise with the store data
 */
function getShopifyStoreData(storeId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("shopify", {
              body: { action: "get-store-data", storeId: storeId },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data.success) {
            return [2 /*return*/, data.store];
          } else {
            throw new Error(data.error || "Failed to get store data");
          }
          return [3 /*break*/, 3];
        case 2:
          error_2 = _b.sent();
          console.error("Error getting Shopify store data:", error_2);
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Generates optimization recommendations based on store data
 * @param storeData The Shopify store data
 * @returns Promise with the list of recommendations
 */
function generateStoreRecommendations(storeData) {
  return __awaiter(this, void 0, void 0, function () {
    var recommendations;
    return __generator(this, function (_a) {
      recommendations = [
        {
          id: crypto.randomUUID(),
          category: "seo",
          title: "Improve product descriptions",
          description:
            "Add more detailed product descriptions with relevant keywords to improve search engine visibility.",
          impact: "high",
          effort: "medium",
          automated: false,
          implemented: false,
        },
        {
          id: crypto.randomUUID(),
          category: "checkout",
          title: "Optimize checkout process",
          description:
            "Reduce number of steps in checkout process to improve conversion rate.",
          impact: "high",
          effort: "medium",
          automated: true,
          implemented: false,
        },
        {
          id: crypto.randomUUID(),
          category: "performance",
          title: "Optimize image sizes",
          description: "Compress product images to improve page load times.",
          impact: "medium",
          effort: "low",
          automated: true,
          implemented: false,
        },
      ];
      return [2 /*return*/, recommendations];
    });
  });
}
/**
 * Calculates a health score for the Shopify store
 * @param storeData The Shopify store data
 * @param recommendations The list of recommendations
 * @returns A health score from 0-100
 */
function calculateHealthScore(storeData, recommendations) {
  // This is a simplified scoring algorithm
  // In a real implementation, this would be more sophisticated
  // Start with a base score
  var score = 70;
  // Adjust based on store metrics if available
  if (storeData.conversion_rate) {
    // Boost score for good conversion rate (above 2%)
    score += storeData.conversion_rate > 0.02 ? 10 : 0;
  }
  // Reduce score based on high-impact issues
  var highImpactIssues = recommendations.filter(function (r) {
    return r.impact === "high" && !r.implemented;
  }).length;
  score -= highImpactIssues * 5;
  // Ensure score stays within 0-100 range
  return Math.max(0, Math.min(100, score));
}
/**
 * Saves an optimization report to the database
 * @param report The optimization report to save
 * @returns Promise that resolves when the report is saved
 */
function saveOptimizationReport(report) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.from("shopify_optimization_reports").upsert({
              store_id: report.storeId,
              store_name: report.storeName,
              score: report.score,
              recommendations: report.recommendations,
              last_updated: report.lastUpdated,
            }),
          ];
        case 1:
          error = _a.sent().error;
          if (error) throw error;
          return [3 /*break*/, 3];
        case 2:
          error_3 = _a.sent();
          console.error("Error saving optimization report:", error_3);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Implements an optimization recommendation
 * @param storeId The Shopify store ID
 * @param recommendationId The recommendation ID to implement
 * @returns Promise indicating success
 */
function implementOptimization(storeId, recommendationId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      reportData,
      reportError_1,
      report,
      updatedRecommendations,
      updateError,
      error_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("shopify_optimization_reports")
              .select("*")
              .eq("store_id", storeId)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (reportData = _a.data), (reportError_1 = _a.error);
          if (reportError_1) throw reportError_1;
          report = reportData;
          updatedRecommendations = report.recommendations.map(function (rec) {
            if (rec.id === recommendationId) {
              return __assign(__assign({}, rec), { implemented: true });
            }
            return rec;
          });
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("shopify_optimization_reports")
              .update({
                recommendations: updatedRecommendations,
                score: calculateHealthScore(
                  { id: report.storeId, name: report.storeName },
                  updatedRecommendations,
                ),
                last_updated: new Date().toISOString(),
              })
              .eq("store_id", storeId),
          ];
        case 2:
          updateError = _b.sent().error;
          if (updateError) throw updateError;
          sonner_1.toast.success("Optimization implemented successfully");
          return [2 /*return*/, true];
        case 3:
          error_4 = _b.sent();
          console.error("Error implementing optimization:", error_4);
          sonner_1.toast.error(
            "Failed to implement optimization: ".concat(error_4.message),
          );
          return [2 /*return*/, false];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
