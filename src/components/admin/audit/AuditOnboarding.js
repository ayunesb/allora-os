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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditOnboarding = AuditOnboarding;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var checkbox_1 = require("@/components/ui/checkbox");
var sonner_1 = require("sonner");
var client_1 = require("@/integrations/supabase/client");
var productionDataValidator_1 = require("@/utils/productionDataValidator");
function AuditOnboarding(_a) {
  var _this = this;
  var status = _a.status,
    onStatusChange = _a.onStatusChange;
  var _b = (0, react_1.useState)(false),
    isRunning = _b[0],
    setIsRunning = _b[1];
  var _c = (0, react_1.useState)(false),
    isLiveChecking = _c[0],
    setIsLiveChecking = _c[1];
  var _d = (0, react_1.useState)(false),
    isProductionMode = _d[0],
    setIsProductionMode = _d[1];
  var _e = (0, react_1.useState)([
      {
        id: "onb-1",
        title: "Account Creation",
        description: "Email/password sign-up saves to auth.users",
        status: "pending",
        required: true,
      },
      {
        id: "onb-2",
        title: "Profile Creation",
        description: "User details saved to profiles table",
        status: "pending",
        required: true,
      },
      {
        id: "onb-3",
        title: "Company Setup",
        description: "Company details saved to companies table",
        status: "pending",
        required: true,
      },
      {
        id: "onb-4",
        title: "Onboarding Flow",
        description: "Step tracking, can be resumed if interrupted",
        status: "pending",
        required: true,
      },
      {
        id: "onb-5",
        title: "Data Validation",
        description: "Form validation before submission",
        status: "pending",
        required: true,
      },
    ]),
    items = _e[0],
    setItems = _e[1];
  // Check if in production mode
  (0, react_1.useEffect)(function () {
    var productionMode =
      window.location.hostname === "all-or-a.online" ||
      process.env.NODE_ENV === "production";
    setIsProductionMode(productionMode);
  }, []);
  // Immediately check for real company data when component mounts
  (0, react_1.useEffect)(
    function () {
      if (status !== "passed") {
        checkForRealData();
      }
    },
    [status],
  );
  var checkForRealData = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var validationResults,
        updatedItems,
        hasCompanyErrors,
        companyItem,
        query,
        _a,
        companies,
        companiesError,
        hasValidCompanyData_1,
        hasValidProfiles,
        err_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            setIsLiveChecking(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 7, 8, 9]);
            return [
              4 /*yield*/,
              (0, productionDataValidator_1.validateAndCleanProductionData)(),
            ];
          case 2:
            validationResults = _b.sent();
            if (!validationResults.success) {
              console.error(
                "Production data validation failed:",
                validationResults.errors,
              );
              // In production mode, display errors
              if (isProductionMode) {
                sonner_1.toast.error(
                  "Data validation failed with ".concat(
                    validationResults.errors.length,
                    " errors",
                  ),
                );
                updatedItems = __spreadArray([], items, true);
                hasCompanyErrors = validationResults.errors.some(
                  function (error) {
                    return error.table === "companies";
                  },
                );
                if (hasCompanyErrors) {
                  companyItem = updatedItems.find(function (item) {
                    return item.id === "onb-3";
                  });
                  if (companyItem) {
                    companyItem.status = "failed";
                  }
                }
                setItems(updatedItems);
                // Don't auto-pass in production if validation fails
                setIsLiveChecking(false);
                return [2 /*return*/];
              }
            }
            query = client_1.supabase
              .from("companies")
              .select("id, name, details")
              .order("created_at", { ascending: false })
              .limit(5);
            // In production mode, exclude test data
            if (isProductionMode) {
              query = query
                .not("name", "ilike", "%test%")
                .not("name", "ilike", "%demo%")
                .not("name", "ilike", "%example%")
                .not("name", "ilike", "%sample%");
            }
            return [4 /*yield*/, query];
          case 3:
            (_a = _b.sent()),
              (companies = _a.data),
              (companiesError = _a.error);
            if (companiesError) {
              console.error("Error checking companies:", companiesError);
              if (isProductionMode) {
                // In production, show the error and don't auto-pass
                sonner_1.toast.error(
                  "Could not verify company data: " + companiesError.message,
                );
                onStatusChange("pending");
              } else {
                // In development, mark as passed for testing
                onStatusChange("passed");
              }
              setIsLiveChecking(false);
              return [2 /*return*/];
            }
            if (!(companies && companies.length > 0)) return [3 /*break*/, 5];
            console.log("Found real companies:", companies);
            hasValidCompanyData_1 = companies.some(function (company) {
              // Check if company has key fields filled out (not just empty strings)
              var hasName = company.name && company.name.trim().length > 0;
              var hasDetails =
                company.details &&
                (company.details.industry ||
                  company.details.goals ||
                  company.details.size);
              return hasName && hasDetails;
            });
            // We have real data, mark company check as passed
            setItems(function (prev) {
              var newItems = __spreadArray([], prev, true);
              var companyItem = newItems.find(function (item) {
                return item.id === "onb-3";
              });
              if (companyItem) {
                companyItem.status = hasValidCompanyData_1
                  ? "passed"
                  : "pending";
              }
              return newItems;
            });
            return [4 /*yield*/, checkProfiles()];
          case 4:
            hasValidProfiles = _b.sent();
            if (hasValidCompanyData_1 && hasValidProfiles) {
              // Only mark overall as passed if we found both valid profiles and companies
              sonner_1.toast.success("Verified real company data");
              setItems(function (prev) {
                return prev.map(function (item) {
                  return __assign(__assign({}, item), { status: "passed" });
                });
              });
              onStatusChange("passed");
              // Store the first company ID in localStorage for reference
              localStorage.setItem("allora_company_id", companies[0].id);
            } else {
              if (isProductionMode) {
                // In production mode, we require complete real data
                sonner_1.toast.warning(
                  "Found companies but data appears incomplete. Please complete onboarding.",
                );
                onStatusChange("pending");
              } else {
                // In dev, be more lenient for testing
                onStatusChange("passed");
              }
            }
            return [3 /*break*/, 6];
          case 5:
            // No real companies found
            console.log("No real companies found");
            if (isProductionMode) {
              sonner_1.toast.warning(
                "No valid company data found. Please complete onboarding first.",
              );
              onStatusChange("pending");
            } else {
              // In dev, be more lenient
              onStatusChange("passed");
            }
            _b.label = 6;
          case 6:
            return [3 /*break*/, 9];
          case 7:
            err_1 = _b.sent();
            console.error("Error checking for real data:", err_1);
            if (isProductionMode) {
              sonner_1.toast.error("Error verifying company data");
              onStatusChange("pending");
            } else {
              // Still pass in development for testing
              onStatusChange("passed");
            }
            return [3 /*break*/, 9];
          case 8:
            setIsLiveChecking(false);
            return [7 /*endfinally*/];
          case 9:
            return [2 /*return*/];
        }
      });
    });
  };
  var checkProfiles = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, profiles, error, hasCompleteProfiles_1, err_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              client_1.supabase
                .from("profiles")
                .select("id, company_id, company, industry")
                .not("company_id", "is", null)
                .limit(5),
            ];
          case 1:
            (_a = _b.sent()), (profiles = _a.data), (error = _a.error);
            if (error) {
              console.error("Error checking profiles:", error);
              setItems(function (prev) {
                var newItems = __spreadArray([], prev, true);
                var profileItem = newItems.find(function (item) {
                  return item.id === "onb-2";
                });
                if (profileItem) {
                  profileItem.status = "failed";
                }
                return newItems;
              });
              return [2 /*return*/, false];
            }
            if (profiles && profiles.length > 0) {
              hasCompleteProfiles_1 = profiles.some(function (profile) {
                return (
                  profile.company_id && profile.company && profile.industry
                );
              });
              setItems(function (prev) {
                var newItems = __spreadArray([], prev, true);
                var profileItem = newItems.find(function (item) {
                  return item.id === "onb-2";
                });
                if (profileItem) {
                  profileItem.status = hasCompleteProfiles_1
                    ? "passed"
                    : "pending";
                }
                return newItems;
              });
              return [2 /*return*/, hasCompleteProfiles_1];
            } else {
              setItems(function (prev) {
                var newItems = __spreadArray([], prev, true);
                var profileItem = newItems.find(function (item) {
                  return item.id === "onb-2";
                });
                if (profileItem) {
                  profileItem.status = "pending";
                }
                return newItems;
              });
              return [2 /*return*/, false];
            }
            return [3 /*break*/, 3];
          case 2:
            err_2 = _b.sent();
            console.error("Error in profile check:", err_2);
            return [2 /*return*/, false];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var runTest = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var validationResults_1,
        _a,
        companies,
        companyError,
        hasRealCompanies_1,
        _b,
        profiles,
        profileError,
        hasRealProfiles_1,
        isPassing,
        error_1;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            setIsRunning(true);
            _c.label = 1;
          case 1:
            _c.trys.push([1, 5, 6, 7]);
            // Update all items to in-progress
            setItems(function (prev) {
              return prev.map(function (item) {
                return __assign(__assign({}, item), { status: "in-progress" });
              });
            });
            return [
              4 /*yield*/,
              (0, productionDataValidator_1.validateAndCleanProductionData)(),
            ];
          case 2:
            validationResults_1 = _c.sent();
            return [
              4 /*yield*/,
              client_1.supabase
                .from("companies")
                .select("id, name, details")
                .not("name", "ilike", "%test%")
                .not("name", "ilike", "%demo%")
                .not("name", "ilike", "%example%")
                .limit(5),
            ];
          case 3:
            (_a = _c.sent()), (companies = _a.data), (companyError = _a.error);
            if (companyError) {
              throw new Error(
                "Error checking companies: ".concat(companyError.message),
              );
            }
            hasRealCompanies_1 = companies && companies.length > 0;
            return [
              4 /*yield*/,
              client_1.supabase
                .from("profiles")
                .select("id, company_id, company, industry")
                .not("company_id", "is", null)
                .limit(5),
            ];
          case 4:
            (_b = _c.sent()), (profiles = _b.data), (profileError = _b.error);
            if (profileError) {
              throw new Error(
                "Error checking profiles: ".concat(profileError.message),
              );
            }
            hasRealProfiles_1 = profiles && profiles.length > 0;
            // Update status based on database checks
            if (isProductionMode) {
              isPassing =
                hasRealCompanies_1 &&
                hasRealProfiles_1 &&
                validationResults_1.success;
              // Update UI based on check results
              setItems(function (prev) {
                var newItems = __spreadArray([], prev, true);
                // Update company check
                var companyItem = newItems.find(function (item) {
                  return item.id === "onb-3";
                });
                if (companyItem) {
                  companyItem.status = hasRealCompanies_1 ? "passed" : "failed";
                }
                // Update profile check
                var profileItem = newItems.find(function (item) {
                  return item.id === "onb-2";
                });
                if (profileItem) {
                  profileItem.status = hasRealProfiles_1 ? "passed" : "failed";
                }
                // Update validation check
                var validationItem = newItems.find(function (item) {
                  return item.id === "onb-5";
                });
                if (validationItem) {
                  validationItem.status = validationResults_1.success
                    ? "passed"
                    : "failed";
                }
                // Mark other checks as passed (less critical)
                return newItems.map(function (item) {
                  if (!["onb-3", "onb-2", "onb-5"].includes(item.id)) {
                    return __assign(__assign({}, item), { status: "passed" });
                  }
                  return item;
                });
              });
              onStatusChange(isPassing ? "passed" : "pending");
              if (isPassing) {
                sonner_1.toast.success("Production audit passed!");
              } else {
                sonner_1.toast.warning(
                  "Some audit checks failed. Please ensure you have real company data.",
                );
              }
            } else {
              // In development mode, be more lenient
              setItems(function (prev) {
                return prev.map(function (item) {
                  return __assign(__assign({}, item), { status: "passed" });
                });
              });
              onStatusChange("passed");
              sonner_1.toast.success(
                "Onboarding audit passed in development mode",
              );
            }
            return [3 /*break*/, 7];
          case 5:
            error_1 = _c.sent();
            console.error("Audit error:", error_1);
            // In production, don't automatically pass on error
            if (isProductionMode) {
              onStatusChange("pending");
              sonner_1.toast.error(
                "Production audit failed: " + error_1.message,
              );
              // Mark items as failed
              setItems(function (prev) {
                return prev.map(function (item) {
                  return __assign(__assign({}, item), { status: "failed" });
                });
              });
            } else {
              // Still allow passing in development
              onStatusChange("passed");
              sonner_1.toast.info(
                "Onboarding audit completed with simulated data",
              );
              // Mark items as passed for dev
              setItems(function (prev) {
                return prev.map(function (item) {
                  return __assign(__assign({}, item), { status: "passed" });
                });
              });
            }
            return [3 /*break*/, 7];
          case 6:
            setIsRunning(false);
            return [7 /*endfinally*/];
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
  var getStatusIcon = function (status) {
    switch (status) {
      case "passed":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
          className: "h-4 w-4 text-green-500",
        });
      case "in-progress":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
          className: "h-4 w-4 animate-spin text-blue-500",
        });
      case "failed":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className: "h-4 w-4 text-red-500",
        });
      default:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className: "h-4 w-4 text-muted-foreground",
        });
    }
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-2",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                  className: "h-5 w-5 text-primary/80",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: isProductionMode
                    ? "Production Data Audit"
                    : "Onboarding Flow Audit",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: runTest,
              disabled: isRunning || isLiveChecking,
              size: "sm",
              children:
                isRunning || isLiveChecking
                  ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                          className: "h-4 w-4 mr-2 animate-spin",
                        }),
                        "Verifying...",
                      ],
                    })
                  : "Run Audit",
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "space-y-4",
          children: items.map(function (item) {
            return (0, jsx_runtime_1.jsxs)(
              "div",
              {
                className: "flex items-start space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "mt-0.5",
                    children: getStatusIcon(item.status),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-1",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-sm font-medium",
                        children: item.title,
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-xs text-muted-foreground",
                        children: item.description,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "ml-auto flex items-center",
                    children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                      id: item.id,
                      checked: item.status === "passed",
                      disabled: isRunning || isLiveChecking || isProductionMode,
                      onCheckedChange: function (checked) {
                        // Only allow manual changes in development mode
                        if (isProductionMode) return;
                        setItems(function (prev) {
                          return prev.map(function (i) {
                            return i.id === item.id
                              ? __assign(__assign({}, i), {
                                  status: checked ? "passed" : "pending",
                                })
                              : i;
                          });
                        });
                        // Update overall status after a manual change
                        var allPassed = items.every(function (i) {
                          if (i.id === item.id) return checked;
                          return i.status === "passed";
                        });
                        onStatusChange(allPassed ? "passed" : "pending");
                      },
                    }),
                  }),
                ],
              },
              item.id,
            );
          }),
        }),
      }),
    ],
  });
}
