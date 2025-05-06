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
exports.InviteUserDialog = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var button_1 = require("@/components/ui/button");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
var users_1 = require("@/utils/users"); // Import directly from users module
var sonner_1 = require("sonner");
var use_mobile_1 = require("@/hooks/use-mobile");
var InviteUserDialog = function (_a) {
  var companies = _a.companies,
    loadingCompanies = _a.loadingCompanies,
    onSuccess = _a.onSuccess;
  var _b = (0, react_1.useState)(false),
    open = _b[0],
    setOpen = _b[1];
  var _c = (0, react_1.useState)(""),
    email = _c[0],
    setEmail = _c[1];
  var _d = (0, react_1.useState)("user"),
    role = _d[0],
    setRole = _d[1];
  var _e = (0, react_1.useState)(""),
    company = _e[0],
    setCompany = _e[1];
  var _f = (0, react_1.useState)(false),
    isSubmitting = _f[0],
    setIsSubmitting = _f[1];
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  var handleInviteUser = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var success, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!email) {
              sonner_1.toast.error("Email is required");
              return [2 /*return*/];
            }
            if (!company) {
              sonner_1.toast.error("Please select a company");
              return [2 /*return*/];
            }
            setIsSubmitting(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              (0, users_1.inviteUserToCompany)(email, company, role),
            ];
          case 2:
            success = _a.sent();
            if (success) {
              sonner_1.toast.success("User invitation sent successfully");
              setOpen(false);
              setEmail("");
              setRole("user");
              onSuccess();
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error inviting user:", error_1);
            sonner_1.toast.error("Failed to send invitation");
            return [3 /*break*/, 5];
          case 4:
            setIsSubmitting(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, {
    open: open,
    onOpenChange: setOpen,
    children: [
      (0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, {
        asChild: true,
        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
          className: "".concat(
            isMobileView ? "w-full" : "",
            " bg-[#5A67D8] hover:bg-[#4C5BC7] text-white",
          ),
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.UserPlus, {
              className: "mr-2 h-4 w-4",
            }),
            "Add New User",
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
        className: "".concat(
          isMobileView ? "w-[calc(100%-32px)] p-4" : "sm:max-w-md",
          " bg-[#1A1F2C] text-white border-white/10",
        ),
        children: [
          (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                children: "Invite New User",
              }),
              (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
                className: "text-gray-400",
                children:
                  "Send an invitation email to add a new user to the platform.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-4 py-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "email",
                    className: "text-gray-300",
                    children: "Email Address",
                  }),
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    id: "email",
                    placeholder: "user@example.com",
                    value: email,
                    onChange: function (e) {
                      return setEmail(e.target.value);
                    },
                    className: "w-full bg-[#0F1729] border-white/10 text-white",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "company",
                    className: "text-gray-300",
                    children: "Company",
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.Select, {
                    value: company,
                    onValueChange: setCompany,
                    disabled: loadingCompanies,
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                        className:
                          "w-full bg-[#0F1729] border-white/10 text-white",
                        children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                          placeholder: loadingCompanies
                            ? "Loading companies..."
                            : "Select company",
                        }),
                      }),
                      (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                        className: "bg-[#1A1F2C] border-white/10 text-white",
                        children: [
                          companies.map(function (company) {
                            return (0, jsx_runtime_1.jsx)(
                              select_1.SelectItem,
                              { value: company.id, children: company.name },
                              company.id,
                            );
                          }),
                          companies.length === 0 &&
                            !loadingCompanies &&
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "no-companies",
                              disabled: true,
                              children: "No companies available",
                            }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "role",
                    className: "text-gray-300",
                    children: "User Role",
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.Select, {
                    value: role,
                    onValueChange: function (value) {
                      return setRole(value);
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                        className:
                          "w-full bg-[#0F1729] border-white/10 text-white",
                        children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                          placeholder: "Select role",
                        }),
                      }),
                      (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                        className: "bg-[#1A1F2C] border-white/10 text-white",
                        children: [
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "user",
                            children: "User",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "admin",
                            children: "Admin",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, {
            className: isMobileView ? "flex-col space-y-2" : "",
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              type: "submit",
              onClick: handleInviteUser,
              disabled: isSubmitting || !email || !company,
              className: "".concat(
                isMobileView ? "w-full" : "w-full sm:w-auto",
                " bg-[#5A67D8] hover:bg-[#4C5BC7] text-white",
              ),
              children: isSubmitting
                ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                        className: "mr-2 h-4 w-4 animate-spin",
                      }),
                      "Sending...",
                    ],
                  })
                : "Send Invitation",
            }),
          }),
        ],
      }),
    ],
  });
};
exports.InviteUserDialog = InviteUserDialog;
