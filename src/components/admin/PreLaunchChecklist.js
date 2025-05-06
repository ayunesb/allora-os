"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PreLaunchChecklist;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var usePreLaunchChecklist_1 = require("@/hooks/admin/usePreLaunchChecklist");
var pre_launch_checklist_1 = require("./pre-launch-checklist");
function PreLaunchChecklist() {
  var _a = (0, usePreLaunchChecklist_1.usePreLaunchChecklist)(),
    toggleItem = _a.toggleItem,
    criticalItemsCompleted = _a.criticalItemsCompleted,
    allItemsCompleted = _a.allItemsCompleted,
    getItemsByCategory = _a.getItemsByCategory;
  var apiItems = getItemsByCategory("Supabase");
  var cleanupItems = getItemsByCategory("Cleanup");
  var testingItems = getItemsByCategory("Testing");
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "border-primary/10 shadow-sm",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "text-2xl flex items-center gap-2",
            children: [
              "Pre-Launch Checklist",
              allItemsCompleted
                ? (0, jsx_runtime_1.jsx)("span", {
                    className:
                      "text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full",
                    children: "Ready for Launch",
                  })
                : criticalItemsCompleted
                  ? (0, jsx_runtime_1.jsx)("span", {
                      className:
                        "text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full",
                      children: "Ready for Launch",
                    })
                  : (0, jsx_runtime_1.jsx)("span", {
                      className:
                        "text-sm bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full",
                      children: "Critical Items Pending",
                    }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "All items completed - ready for launch!",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, jsx_runtime_1.jsx)(pre_launch_checklist_1.ChecklistSection, {
              title: "API Integrations",
              items: apiItems,
              onToggle: toggleItem,
            }),
            (0, jsx_runtime_1.jsx)(pre_launch_checklist_1.ChecklistSection, {
              title: "Code Cleanup",
              items: cleanupItems,
              onToggle: toggleItem,
            }),
            (0, jsx_runtime_1.jsx)(pre_launch_checklist_1.ChecklistSection, {
              title: "Final Testing",
              items: testingItems,
              onToggle: toggleItem,
            }),
            (0, jsx_runtime_1.jsx)(pre_launch_checklist_1.LaunchStatusFooter, {
              allItemsCompleted: allItemsCompleted,
              criticalItemsCompleted: criticalItemsCompleted,
            }),
          ],
        }),
      }),
    ],
  });
}
