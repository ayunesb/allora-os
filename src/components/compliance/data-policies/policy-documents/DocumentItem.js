"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentItem;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var tooltip_1 = require("@/components/ui/tooltip");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var ComplianceContext_1 = require("@/context/ComplianceContext");
function DocumentItem(_a) {
  var document = _a.document,
    updatingDocId = _a.updatingDocId;
  var _b = (0, ComplianceContext_1.useCompliance)(),
    applyUpdate = _b.applyUpdate,
    isApplyingUpdate = _b.isApplyingUpdate;
  var handleUpdateDocument = function (docId) {
    applyUpdate(docId);
  };
  return (0, jsx_runtime_1.jsxs)("li", {
    className: "flex justify-between items-center p-3 border rounded-md",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col gap-1",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)("span", { children: document.name }),
              document.updateAvailable &&
                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                  variant: "outline",
                  className: "border-amber-500 text-amber-500",
                  children: "Update Available",
                }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "text-xs text-muted-foreground",
            children: [
              (0, jsx_runtime_1.jsxs)("span", {
                className: "mr-2",
                children: ["Version: ", document.version],
              }),
              (0, jsx_runtime_1.jsxs)("span", {
                children: ["Last updated: ", document.lastUpdated],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex space-x-2",
        children: [
          document.updateAvailable &&
            (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
              children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                children: [
                  (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                    asChild: true,
                    children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      size: "sm",
                      className: "text-amber-500 border-amber-500",
                      onClick: function () {
                        return handleUpdateDocument(document.id);
                      },
                      disabled:
                        updatingDocId === document.id || isApplyingUpdate,
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                          className: "h-4 w-4 mr-1 ".concat(
                            updatingDocId === document.id ? "animate-spin" : "",
                          ),
                        }),
                        updatingDocId === document.id
                          ? "Updating..."
                          : "Update",
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                    children: (0, jsx_runtime_1.jsx)("p", {
                      children: "Update to the latest version",
                    }),
                  }),
                ],
              }),
            }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            size: "sm",
            asChild: true,
            children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
              to: document.path,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
                  className: "h-4 w-4 mr-1",
                }),
                "View",
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            children: (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
              className: "h-4 w-4",
            }),
          }),
        ],
      }),
    ],
  });
}
