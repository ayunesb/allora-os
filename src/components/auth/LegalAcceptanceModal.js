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
exports.LegalAcceptanceModal = LegalAcceptanceModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var checkbox_1 = require("@/components/ui/checkbox");
var react_router_dom_1 = require("react-router-dom");
var sonner_1 = require("sonner");
var client_1 = require("@/integrations/supabase/client");
var lucide_react_1 = require("lucide-react");
var CURRENT_VERSIONS = {
  terms: "v2.0",
  privacy: "v2.4",
  messaging: "v1.0",
};
function LegalAcceptanceModal(_a) {
  var _this = this;
  var isOpen = _a.isOpen,
    userId = _a.userId,
    onClose = _a.onClose,
    onAccept = _a.onAccept;
  var _b = (0, react_1.useState)(false),
    termsAccepted = _b[0],
    setTermsAccepted = _b[1];
  var _c = (0, react_1.useState)(false),
    privacyAccepted = _c[0],
    setPrivacyAccepted = _c[1];
  var _d = (0, react_1.useState)(false),
    messagingAccepted = _d[0],
    setMessagingAccepted = _d[1];
  var _e = (0, react_1.useState)(false),
    isSubmitting = _e[0],
    setIsSubmitting = _e[1];
  var _f = (0, react_1.useState)(null),
    errorMessage = _f[0],
    setErrorMessage = _f[1];
  var allAccepted = termsAccepted && privacyAccepted && messagingAccepted;
  var handleSubmit = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var ipAddress,
        response_1,
        data,
        error_1,
        _a,
        existingRecord,
        checkError,
        updateError,
        error,
        _b,
        fetchError,
        existingRecords,
        recordId,
        updateError,
        refreshError,
        error_2;
      var _c;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            if (!allAccepted) {
              sonner_1.toast.error("You must accept all terms to continue");
              return [2 /*return*/];
            }
            if (!userId) {
              setErrorMessage("User information is missing");
              sonner_1.toast.error("User information is missing");
              return [2 /*return*/];
            }
            setIsSubmitting(true);
            setErrorMessage(null);
            _d.label = 1;
          case 1:
            _d.trys.push([1, 18, 19, 20]);
            console.log(
              "Attempting to save legal acceptance for user:",
              userId,
            );
            ipAddress = "127.0.0.1";
            _d.label = 2;
          case 2:
            _d.trys.push([2, 6, , 7]);
            return [4 /*yield*/, fetch("https://api.ipify.org?format=json")];
          case 3:
            response_1 = _d.sent();
            if (!response_1.ok) return [3 /*break*/, 5];
            return [4 /*yield*/, response_1.json()];
          case 4:
            data = _d.sent();
            ipAddress = data.ip;
            _d.label = 5;
          case 5:
            return [3 /*break*/, 7];
          case 6:
            error_1 = _d.sent();
            console.error("Could not determine IP address:", error_1);
            return [3 /*break*/, 7];
          case 7:
            return [
              4 /*yield*/,
              client_1.supabase
                .from("user_legal_acceptances")
                .select("id")
                .eq("user_id", userId)
                .eq("terms_version", CURRENT_VERSIONS.terms)
                .eq("privacy_version", CURRENT_VERSIONS.privacy)
                .eq("consent_version", CURRENT_VERSIONS.messaging)
                .maybeSingle(),
            ];
          case 8:
            (_a = _d.sent()),
              (existingRecord = _a.data),
              (checkError = _a.error);
            if (checkError) {
              console.error("Error checking for existing record:", checkError);
              // Continue with insert attempt
            }
            if (!existingRecord) return [3 /*break*/, 10];
            return [
              4 /*yield*/,
              client_1.supabase
                .from("user_legal_acceptances")
                .update({
                  terms_of_service: termsAccepted,
                  privacy_policy: privacyAccepted,
                  messaging_consent: messagingAccepted,
                  ip_address: ipAddress,
                  user_agent: navigator.userAgent,
                  accepted_at: new Date().toISOString(),
                })
                .eq("id", existingRecord.id),
            ];
          case 9:
            updateError = _d.sent().error;
            if (updateError) {
              throw updateError;
            }
            sonner_1.toast.success("Legal terms updated successfully");
            onAccept();
            return [2 /*return*/];
          case 10:
            return [
              4 /*yield*/,
              client_1.supabase.from("user_legal_acceptances").insert({
                user_id: userId,
                terms_of_service: termsAccepted,
                privacy_policy: privacyAccepted,
                messaging_consent: messagingAccepted,
                terms_version: CURRENT_VERSIONS.terms,
                privacy_version: CURRENT_VERSIONS.privacy,
                consent_version: CURRENT_VERSIONS.messaging,
                ip_address: ipAddress,
                user_agent: navigator.userAgent,
              }),
            ];
          case 11:
            error = _d.sent().error;
            if (!error) return [3 /*break*/, 17];
            console.error("Error details from Supabase:", error);
            if (!(error.code === "23505")) return [3 /*break*/, 14];
            return [
              4 /*yield*/,
              client_1.supabase
                .from("user_legal_acceptances")
                .select("id")
                .eq("user_id", userId)
                .limit(1),
            ];
          case 12:
            (_b = _d.sent()),
              (fetchError = _b.error),
              (existingRecords = _b.data);
            if (
              fetchError ||
              !existingRecords ||
              existingRecords.length === 0
            ) {
              throw error;
            }
            recordId = existingRecords[0].id;
            return [
              4 /*yield*/,
              client_1.supabase
                .from("user_legal_acceptances")
                .update({
                  terms_of_service: termsAccepted,
                  privacy_policy: privacyAccepted,
                  messaging_consent: messagingAccepted,
                  terms_version: CURRENT_VERSIONS.terms,
                  privacy_version: CURRENT_VERSIONS.privacy,
                  consent_version: CURRENT_VERSIONS.messaging,
                  ip_address: ipAddress,
                  user_agent: navigator.userAgent,
                  accepted_at: new Date().toISOString(),
                })
                .eq("id", recordId),
            ];
          case 13:
            updateError = _d.sent().error;
            if (updateError) {
              throw updateError;
            } else {
              // Update was successful
              sonner_1.toast.success("Legal terms accepted successfully");
              onAccept();
              return [2 /*return*/];
            }
            return [3 /*break*/, 16];
          case 14:
            if (
              !(
                error.code === "42501" ||
                ((_c = error.message) === null || _c === void 0
                  ? void 0
                  : _c.includes("permission denied"))
              )
            )
              return [3 /*break*/, 16];
            // This is an RLS policy error
            setErrorMessage(
              "Permission denied. Please make sure you are properly authenticated.",
            );
            sonner_1.toast.error(
              "Permission denied. Please make sure you are properly authenticated.",
            );
            return [4 /*yield*/, client_1.supabase.auth.refreshSession()];
          case 15:
            refreshError = _d.sent().error;
            if (refreshError) {
              console.error("Failed to refresh session:", refreshError);
            } else {
              // Retry after session refresh
              setTimeout(function () {
                return handleSubmit();
              }, 1000);
            }
            return [2 /*return*/];
          case 16:
            throw error;
          case 17:
            sonner_1.toast.success("Legal terms accepted successfully");
            onAccept();
            return [3 /*break*/, 20];
          case 18:
            error_2 = _d.sent();
            console.error("Error saving legal acceptances:", error_2);
            setErrorMessage(
              "Failed to save your acceptance. Please try again.",
            );
            sonner_1.toast.error(
              "Failed to save your acceptance. Please try again.",
            );
            return [3 /*break*/, 20];
          case 19:
            setIsSubmitting(false);
            return [7 /*endfinally*/];
          case 20:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isOpen,
    onOpenChange: function () {},
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "max-w-md max-h-[90vh] overflow-y-auto",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
              children: "Legal Agreements",
            }),
            (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
              children:
                "Please review and accept the following legal agreements to continue using Allora AI.",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-6 py-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-start space-x-3",
              children: [
                (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                  id: "terms",
                  checked: termsAccepted,
                  onCheckedChange: function (checked) {
                    return setTermsAccepted(!!checked);
                  },
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid gap-1.5 leading-none",
                  children: [
                    (0, jsx_runtime_1.jsxs)("label", {
                      htmlFor: "terms",
                      className:
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      children: [
                        "I accept the ",
                        (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                          to: "/legal/terms-of-service",
                          target: "_blank",
                          className: "text-primary hover:underline",
                          children: "Terms of Service",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "By checking this box, you agree to our terms of service and conditions.",
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-start space-x-3",
              children: [
                (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                  id: "privacy",
                  checked: privacyAccepted,
                  onCheckedChange: function (checked) {
                    return setPrivacyAccepted(!!checked);
                  },
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid gap-1.5 leading-none",
                  children: [
                    (0, jsx_runtime_1.jsxs)("label", {
                      htmlFor: "privacy",
                      className:
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      children: [
                        "I accept the ",
                        (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                          to: "/legal/privacy-policy",
                          target: "_blank",
                          className: "text-primary hover:underline",
                          children: "Privacy Policy",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "By checking this box, you consent to our collection and use of your data as described in our privacy policy.",
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-start space-x-3",
              children: [
                (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                  id: "messaging",
                  checked: messagingAccepted,
                  onCheckedChange: function (checked) {
                    return setMessagingAccepted(!!checked);
                  },
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid gap-1.5 leading-none",
                  children: [
                    (0, jsx_runtime_1.jsx)("label", {
                      htmlFor: "messaging",
                      className:
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                      children: "I consent to receive messaging communications",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "By checking this box, you consent to receive communications via Email, SMS, and WhatsApp from Allora AI.",
                    }),
                  ],
                }),
              ],
            }),
            errorMessage &&
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "p-3 mt-2 bg-destructive/10 border border-destructive rounded-md text-sm text-destructive",
                children: errorMessage,
              }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, {
          children: (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: handleSubmit,
            disabled: !allAccepted || isSubmitting,
            className: "w-full",
            children: isSubmitting
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    "Processing...",
                  ],
                })
              : "Accept & Continue",
          }),
        }),
      ],
    }),
  });
}
