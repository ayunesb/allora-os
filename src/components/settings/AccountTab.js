"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AccountTab;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var AuthContext_1 = require("@/context/AuthContext");
var lucide_react_1 = require("lucide-react");
function AccountTab() {
  var user = (0, AuthContext_1.useAuth)().user;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "grid gap-6",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.User, {
                    className: "h-5 w-5",
                  }),
                  "Profile Settings",
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Manage your personal information and preferences",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "name",
                    children: "Name",
                  }),
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    id: "name",
                    placeholder: "Your name",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "email",
                    children: "Email",
                  }),
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    id: "email",
                    value:
                      (user === null || user === void 0
                        ? void 0
                        : user.email) || "",
                    disabled: true,
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-xs text-muted-foreground",
                    children: "Your account email cannot be changed",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
            className: "justify-end",
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              children: "Save Changes",
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.KeyRound, {
                    className: "h-5 w-5",
                  }),
                  "Password",
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Update your password",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "current-password",
                    children: "Current Password",
                  }),
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    id: "current-password",
                    type: "password",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "new-password",
                    children: "New Password",
                  }),
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    id: "new-password",
                    type: "password",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "confirm-password",
                    children: "Confirm New Password",
                  }),
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    id: "confirm-password",
                    type: "password",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
            className: "justify-end",
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              children: "Update Password",
            }),
          }),
        ],
      }),
    ],
  });
}
