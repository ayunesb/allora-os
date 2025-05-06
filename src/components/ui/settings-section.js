"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingsSection;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function SettingsSection(_a) {
  var title = _a.title,
    description = _a.description,
    icon = _a.icon,
    children = _a.children;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center space-x-2",
          children: [
            icon && (0, jsx_runtime_1.jsx)("div", { children: icon }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: title }),
                description &&
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: description,
                  }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: children }),
    ],
  });
}
