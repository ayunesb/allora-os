"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var AuthContext_1 = require("@/context/AuthContext");
var AdminCheckHandler_1 = require("@/components/auth/AdminCheckHandler");
var DevHelperRedirect = function () {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var user = (0, AuthContext_1.useAuth)().user;
  // Define hasInitialized based on user presence
  var hasInitialized = user !== undefined;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "container mx-auto py-10",
    children: (0, jsx_runtime_1.jsx)("div", {
      className: "max-w-md mx-auto",
      children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                    className: "h-5 w-5 text-primary",
                  }),
                  "Admin Verification",
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Verifying your admin access level...",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)(
              AdminCheckHandler_1.AdminCheckHandler,
              {
                user: user,
                roleRequired: "admin",
                adminOnly: true,
                hasInitialized: hasInitialized,
                children: function (isUserAdmin, adminCheckDone) {
                  return (0, jsx_runtime_1.jsx)("div", {
                    className: "space-y-4",
                    children: !adminCheckDone
                      ? (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center justify-center py-6",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Loader, {
                              className: "h-8 w-8 animate-spin text-primary",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "ml-2 text-muted-foreground",
                              children: "Verifying admin access...",
                            }),
                          ],
                        })
                      : isUserAdmin
                        ? (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-md",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.Shield,
                                    { className: "h-5 w-5 mr-2" },
                                  ),
                                  (0, jsx_runtime_1.jsx)("h3", {
                                    className: "font-medium",
                                    children: "Admin Access Verified",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "mt-1 text-sm",
                                children:
                                  "You have admin access to the system.",
                              }),
                            ],
                          })
                        : (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.Shield,
                                    { className: "h-5 w-5 mr-2" },
                                  ),
                                  (0, jsx_runtime_1.jsx)("h3", {
                                    className: "font-medium",
                                    children: "Admin Access Required",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "mt-1 text-sm",
                                children:
                                  "You do not have the required admin privileges.",
                              }),
                            ],
                          }),
                  });
                },
              },
            ),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
            className: "flex flex-col gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: function () {
                  return navigate("/dev-admin-helper");
                },
                className: "w-full",
                children: "Go to Admin Helper",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                onClick: function () {
                  return navigate("/");
                },
                className: "w-full",
                children: "Return to Dashboard",
              }),
            ],
          }),
        ],
      }),
    }),
  });
};
exports.default = DevHelperRedirect;
