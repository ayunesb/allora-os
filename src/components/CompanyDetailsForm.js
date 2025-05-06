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
exports.default = CompanyDetailsForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var sonner_1 = require("sonner");
var company_1 = require("@/utils/company");
var company_details_1 = require("@/components/onboarding/company-details");
var companyHelpers_1 = require("@/utils/companyHelpers");
var authCompatibility_1 = require("@/utils/authCompatibility");
function CompanyDetailsForm() {
  var _this = this;
  var authContext = (0, AuthContext_1.useAuth)();
  var auth = (0, authCompatibility_1.createAuthCompatibilityLayer)(authContext);
  var _a = (0, react_1.useState)(false),
    isUpdating = _a[0],
    setIsUpdating = _a[1];
  var _b = (0, react_1.useState)(true),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)({}),
    companyDetails = _c[0],
    setCompanyDetails = _c[1];
  var _d = (0, react_1.useState)(undefined),
    errorMessage = _d[0],
    setErrorMessage = _d[1];
  // Load company details when profile changes
  (0, react_1.useEffect)(
    function () {
      function loadCompanyData() {
        return __awaiter(this, void 0, void 0, function () {
          var company, additionalDetails, error_1;
          var _a, _b;
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                if (
                  !((_a = auth.profile) === null || _a === void 0
                    ? void 0
                    : _a.company_id)
                ) {
                  setIsLoading(false);
                  return [2 /*return*/];
                }
                setIsLoading(true);
                _c.label = 1;
              case 1:
                _c.trys.push([1, 3, 4, 5]);
                console.log(
                  "Loading company details for company ID:",
                  auth.profile.company_id,
                );
                return [
                  4 /*yield*/,
                  (0, companyHelpers_1.fetchUserCompany)(
                    ((_b = auth.user) === null || _b === void 0
                      ? void 0
                      : _b.id) || "",
                  ),
                ];
              case 2:
                company = _c.sent();
                if (company) {
                  console.log("Company details loaded:", company);
                  additionalDetails = company.details || {};
                  setCompanyDetails(additionalDetails);
                }
                return [3 /*break*/, 5];
              case 3:
                error_1 = _c.sent();
                console.error("Error loading company details:", error_1);
                return [3 /*break*/, 5];
              case 4:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 5:
                return [2 /*return*/];
            }
          });
        });
      }
      loadCompanyData();
    },
    [auth.profile, auth.user],
  );
  var updateCompanyDetailsState = function (details) {
    setCompanyDetails(__assign(__assign({}, companyDetails), details));
  };
  var handleSaveCompanyDetails = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var companyName, industryName, result, error_2, errorMsg;
      var _a, _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!auth.user) {
              sonner_1.toast.error(
                "You must be logged in to update company details",
              );
              return [2 /*return*/];
            }
            setIsUpdating(true);
            setErrorMessage(undefined);
            _c.label = 1;
          case 1:
            _c.trys.push([1, 5, 6, 7]);
            companyName =
              ((_a = auth.profile) === null || _a === void 0
                ? void 0
                : _a.company) || "";
            industryName =
              ((_b = auth.profile) === null || _b === void 0
                ? void 0
                : _b.industry) || "";
            console.log("Saving company details for user:", auth.user.id);
            console.log("Company name:", companyName);
            console.log("Industry:", industryName);
            console.log("Company details:", companyDetails);
            return [
              4 /*yield*/,
              (0, company_1.updateCompanyDetails)(auth.user.id, {
                name: companyName,
                industry: industryName,
                description: companyDetails.description || "",
                mission: companyDetails.mission || "",
                vision: companyDetails.vision || "",
                headquarters: companyDetails.headquarters || "",
                phone: companyDetails.phone || "",
                additionalDetails: companyDetails,
              }),
            ];
          case 2:
            result = _c.sent();
            if (!result.success) {
              throw new Error(
                result.error || "Failed to update company details",
              );
            }
            if (!auth.refreshProfile) return [3 /*break*/, 4];
            return [4 /*yield*/, auth.refreshProfile()];
          case 3:
            _c.sent();
            _c.label = 4;
          case 4:
            sonner_1.toast.success("Company details updated successfully!");
            return [3 /*break*/, 7];
          case 5:
            error_2 = _c.sent();
            console.error("Error updating company details:", error_2);
            errorMsg = error_2.message || "An error occurred during update";
            setErrorMessage(errorMsg);
            sonner_1.toast.error(errorMsg);
            return [3 /*break*/, 7];
          case 6:
            setIsUpdating(false);
            return [7 /*endfinally*/];
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Company Details",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "Loading company information...",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("div", {
            className: "h-40 flex items-center justify-center",
            children: (0, jsx_runtime_1.jsx)("div", {
              className:
                "animate-spin rounded-full h-8 w-8 border-b-2 border-primary",
            }),
          }),
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Company Details",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Provide comprehensive information about your company to help us better understand your business",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "space-y-6",
          children: (0, jsx_runtime_1.jsx)(
            company_details_1.CompanyDetailsSurvey,
            {
              companyDetails: companyDetails,
              updateCompanyDetails: updateCompanyDetailsState,
              error: errorMessage,
            },
          ),
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "flex justify-end space-x-2",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            disabled: isUpdating,
            children: "Cancel",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: handleSaveCompanyDetails,
            disabled: isUpdating,
            children: isUpdating ? "Saving..." : "Save Company Details",
          }),
        ],
      }),
    ],
  });
}
