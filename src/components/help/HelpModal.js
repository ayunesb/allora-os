"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpModal = HelpModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var HelpContext_1 = require("@/context/HelpContext");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function HelpModal() {
  var _a = (0, HelpContext_1.useHelp)(),
    isHelpOpen = _a.isHelpOpen,
    closeHelp = _a.closeHelp,
    currentHelp = _a.currentHelp;
  if (!currentHelp) {
    return null;
  }
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isHelpOpen,
    onOpenChange: closeHelp,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "sm:max-w-[500px]",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogTitle, {
              className: "flex justify-between items-center",
              children: [
                (0, jsx_runtime_1.jsx)("span", { children: currentHelp.title }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "ghost",
                  size: "icon",
                  onClick: closeHelp,
                  className: "h-8 w-8 rounded-full",
                  "aria-label": "Close help dialog",
                  children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
                    className: "h-4 w-4",
                  }),
                }),
              ],
            }),
            currentHelp.description &&
              (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
                children: currentHelp.description,
              }),
          ],
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "space-y-4 max-h-[60vh] overflow-auto py-4",
          children:
            currentHelp.content &&
            (0, jsx_runtime_1.jsx)("div", {
              className: "prose prose-sm dark:prose-invert max-w-none",
              dangerouslySetInnerHTML: { __html: currentHelp.content },
            }),
        }),
        (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, {
          children: (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: closeHelp,
            children: "Close",
          }),
        }),
      ],
    }),
  });
}
