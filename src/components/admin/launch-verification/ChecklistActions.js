"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistActions = ChecklistActions;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function ChecklistActions(_a) {
  var isSaving = _a.isSaving,
    isLoading = _a.isLoading,
    onLoadChecklist = _a.onLoadChecklist,
    onSaveChecklist = _a.onSaveChecklist;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-wrap gap-2 mt-4",
    children: [
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        onClick: onSaveChecklist,
        disabled: isSaving,
        variant: "default",
        className: "gap-2",
        children: isSaving
          ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                  className: "h-4 w-4 animate-spin",
                }),
                "Saving...",
              ],
            })
          : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Save, {
                  className: "h-4 w-4",
                }),
                "Save Progress",
              ],
            }),
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        onClick: onLoadChecklist,
        disabled: isLoading,
        variant: "outline",
        className: "gap-2",
        children: isLoading
          ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                  className: "h-4 w-4 animate-spin",
                }),
                "Loading...",
              ],
            })
          : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                  className: "h-4 w-4",
                }),
                "Load Saved Progress",
              ],
            }),
      }),
    ],
  });
}
