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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("@/context/AuthContext");
var accountDeletion_1 = require("@/utils/accountDeletion");
var sonner_1 = require("sonner");
var alert_dialog_1 = require("@/components/ui/alert-dialog");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var button_2 = require("@/components/ui/button");
var DeleteAccountDialog = function () {
  var _a = (0, react_1.useState)(false),
    isInitialDialogOpen = _a[0],
    setIsInitialDialogOpen = _a[1];
  var _b = (0, react_1.useState)(false),
    isConfirmDialogOpen = _b[0],
    setIsConfirmDialogOpen = _b[1];
  var _c = (0, react_1.useState)(""),
    confirmText = _c[0],
    setConfirmText = _c[1];
  var _d = (0, react_1.useState)(false),
    isDeleting = _d[0],
    setIsDeleting = _d[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  var signOut = (0, AuthContext_1.useAuth)().signOut;
  var handleDeleteAccount = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var result, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsDeleting(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, 7, 8]);
            return [4 /*yield*/, (0, accountDeletion_1.deleteUserAccount)()];
          case 2:
            result = _a.sent();
            if (!result.success) return [3 /*break*/, 4];
            return [4 /*yield*/, signOut()];
          case 3:
            _a.sent();
            sonner_1.toast.success("Your account has been deleted");
            // If there was a partial deletion warning, show it
            if (result.error) {
              sonner_1.toast.warning(result.error);
            }
            // Redirect to home page after account deletion
            navigate("/");
            return [3 /*break*/, 5];
          case 4:
            sonner_1.toast.error(
              "Failed to delete account: ".concat(result.error),
            );
            setIsConfirmDialogOpen(false);
            setIsInitialDialogOpen(false);
            _a.label = 5;
          case 5:
            return [3 /*break*/, 8];
          case 6:
            error_1 = _a.sent();
            sonner_1.toast.error("An error occurred: ".concat(error_1.message));
            return [3 /*break*/, 8];
          case 7:
            setIsDeleting(false);
            return [7 /*endfinally*/];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleFirstStep = function () {
    setIsInitialDialogOpen(false);
    setIsConfirmDialogOpen(true);
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialog, {
        open: isInitialDialogOpen,
        onOpenChange: setIsInitialDialogOpen,
        children: [
          (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogTrigger, {
            asChild: true,
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "destructive",
              className: "mt-8",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
                  className: "h-4 w-4 mr-2",
                }),
                "Delete Account",
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogContent, {
            children: [
              (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogHeader, {
                children: [
                  (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogTitle, {
                    children: "Are you sure you want to delete your account?",
                  }),
                  (0, jsx_runtime_1.jsx)(
                    alert_dialog_1.AlertDialogDescription,
                    {
                      children:
                        "This action will permanently delete your account and all associated data. This action cannot be undone.",
                    },
                  ),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogFooter, {
                children: [
                  (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogCancel, {
                    children: "Cancel",
                  }),
                  (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogAction, {
                    className: (0, utils_1.cn)(
                      (0, button_2.buttonVariants)({ variant: "destructive" }),
                    ),
                    onClick: handleFirstStep,
                    children: "Continue to Deletion",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
        open: isConfirmDialogOpen,
        onOpenChange: setIsConfirmDialogOpen,
        children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
          className: "sm:max-w-md",
          children: [
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                  className: "text-destructive",
                  children: "Final confirmation required",
                }),
                (0, jsx_runtime_1.jsxs)(dialog_1.DialogDescription, {
                  children: [
                    "Please type ",
                    (0, jsx_runtime_1.jsx)("strong", { children: "DELETE" }),
                    " to confirm that you understand this action is permanent and cannot be undone. All your data, including profile information, company data (if you're the last admin), and account settings will be permanently deleted.",
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2 py-4",
              children: [
                (0, jsx_runtime_1.jsx)(label_1.Label, {
                  htmlFor: "confirmText",
                  className: "text-destructive",
                  children: "Type DELETE to confirm:",
                }),
                (0, jsx_runtime_1.jsx)(input_1.Input, {
                  id: "confirmText",
                  value: confirmText,
                  onChange: function (e) {
                    return setConfirmText(e.target.value);
                  },
                  placeholder: "DELETE",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, {
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  onClick: function () {
                    return setIsConfirmDialogOpen(false);
                  },
                  children: "Cancel",
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "destructive",
                  onClick: handleDeleteAccount,
                  disabled: confirmText !== "DELETE" || isDeleting,
                  children: isDeleting
                    ? "Deleting..."
                    : "Permanently Delete Account",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
exports.default = DeleteAccountDialog;
