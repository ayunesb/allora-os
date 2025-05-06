"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfileDiagnostics;
var jsx_runtime_1 = require("react/jsx-runtime");
var AuthContext_1 = require("@/context/AuthContext");
var card_1 = require("@/components/ui/card");
function ProfileDiagnostics() {
  var auth = (0, AuthContext_1.useAuth)();
  var user = auth.user,
    session = auth.session,
    isLoading = auth.isLoading,
    hasInitialized = auth.hasInitialized;
  if (isLoading || !hasInitialized) {
    return null;
  }
  if (!user) {
    return (0, jsx_runtime_1.jsx)(card_1.Card, {
      className: "mb-6 bg-red-50 dark:bg-red-900/10",
      children: (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-3",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-red-600 dark:text-red-400",
            children: "Not Authenticated",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "You are not currently authenticated. Please sign in to view your profile.",
          }),
        ],
      }),
    });
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "mb-6 bg-green-50 dark:bg-green-900/10",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-3",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-green-600 dark:text-green-400",
            children: "Authentication Status",
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
            children: ["You are authenticated as ", user.email],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "text-sm space-y-1.5",
          children: [
            (0, jsx_runtime_1.jsxs)("p", {
              children: [
                (0, jsx_runtime_1.jsx)("strong", { children: "User ID:" }),
                " ",
                user.id,
              ],
            }),
            (0, jsx_runtime_1.jsxs)("p", {
              children: [
                (0, jsx_runtime_1.jsx)("strong", { children: "Role:" }),
                " ",
                user.role,
              ],
            }),
            (0, jsx_runtime_1.jsxs)("p", {
              children: [
                (0, jsx_runtime_1.jsx)("strong", {
                  children: "Session Active:",
                }),
                " ",
                session ? "Yes" : "No",
              ],
            }),
            session &&
              (0, jsx_runtime_1.jsxs)("div", {
                className: "mt-2",
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    children: (0, jsx_runtime_1.jsx)("strong", {
                      children: "Session Details:",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)("pre", {
                    className:
                      "bg-slate-100 dark:bg-slate-800 p-2 rounded text-xs overflow-x-auto",
                    children: JSON.stringify(
                      {
                        provider: (
                          session === null || session === void 0
                            ? void 0
                            : session.provider_token
                        )
                          ? "OAuth provider"
                          : "Email/Password",
                        expires_at: (
                          session === null || session === void 0
                            ? void 0
                            : session.expires_at
                        )
                          ? new Date(session.expires_at * 1000).toLocaleString()
                          : "Unknown",
                        last_accessed: (
                          session === null || session === void 0
                            ? void 0
                            : session.last_sign_in_at
                        )
                          ? new Date(session.last_sign_in_at).toLocaleString()
                          : "Unknown",
                      },
                      null,
                      2,
                    ),
                  }),
                ],
              }),
          ],
        }),
      }),
    ],
  });
}
