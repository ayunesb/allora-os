"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PlatformStability;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function PlatformStability() {
  var _a = (0, react_1.useState)(0),
    progress = _a[0],
    setProgress = _a[1];
  var totalItems = (0, react_1.useState)(6)[0];
  var stabilityItems = [
    {
      id: "build",
      text: "Check that the application builds without errors on Vercel or other hosting platforms",
      priority: "critical",
      checked: false,
    },
    {
      id: "supabase",
      text: "Confirm Supabase is connected, healthy, and shows no critical lints",
      priority: "critical",
      checked: false,
    },
    {
      id: "apis",
      text: "Verify Twilio, Stripe, Zoom, Heygen, Postmark, Zapier are connected with test data flows",
      priority: "high",
      checked: false,
    },
    {
      id: "flow",
      text: "Test full flow: Signup → Onboarding → Dashboard → Strategy → Campaigns → Calls → Leads → Payments",
      priority: "high",
      checked: false,
    },
    {
      id: "rls",
      text: "Verify Supabase tables and permissions are secured with Row Level Security activated",
      priority: "critical",
      checked: false,
    },
    {
      id: "errors",
      text: "Ensure the application displays appropriate user feedback for various error scenarios",
      priority: "normal",
      checked: false,
    },
  ];
  var _b = (0, react_1.useState)(stabilityItems),
    items = _b[0],
    setItems = _b[1];
  var handleToggleItem = function (id) {
    var updatedItems = items.map(function (item) {
      return item.id === id
        ? __assign(__assign({}, item), { checked: !item.checked })
        : item;
    });
    setItems(updatedItems);
    setProgress(
      updatedItems.filter(function (item) {
        return item.checked;
      }).length,
    );
    // Show toast for toggled items
    var item = items.find(function (item) {
      return item.id === id;
    });
    if (item) {
      var action = !item.checked ? "completed" : "reopened";
      sonner_1.toast.success(
        "Item ".concat(action, ": ").concat(item.text.substring(0, 30), "..."),
      );
    }
  };
  var handleSaveProgress = function () {
    sonner_1.toast.success("Progress saved successfully!");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "animate-fadeIn space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl sm:text-3xl font-bold",
            children: "Platform Stability",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground mt-1",
            children: "Verify core platform stability and integrations",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex justify-between items-center",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "text-sm text-muted-foreground",
          children: [progress, "/", totalItems, " Completed"],
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "space-y-4",
        children: items.map(function (item) {
          return (0, jsx_runtime_1.jsx)(
            card_1.Card,
            {
              className: "border p-4",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start gap-3",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    children: (0, jsx_runtime_1.jsx)("input", {
                      type: "checkbox",
                      id: item.id,
                      checked: item.checked,
                      onChange: function () {
                        return handleToggleItem(item.id);
                      },
                      className:
                        "h-5 w-5 mt-1 rounded border-gray-300 text-primary focus:ring-primary",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex flex-col flex-grow",
                    children: [
                      (0, jsx_runtime_1.jsx)("label", {
                        htmlFor: item.id,
                        className: "font-medium ".concat(
                          item.checked
                            ? "line-through text-muted-foreground"
                            : "",
                        ),
                        children: item.text,
                      }),
                      item.priority === "high" &&
                        (0, jsx_runtime_1.jsx)("span", {
                          className:
                            "mt-1 text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full w-fit",
                          children: "HIGH",
                        }),
                      item.priority === "critical" &&
                        (0, jsx_runtime_1.jsx)("span", {
                          className:
                            "mt-1 text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full w-fit",
                          children: "CRITICAL",
                        }),
                    ],
                  }),
                ],
              }),
            },
            item.id,
          );
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between pt-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.RotateCw, {
                    className: "h-4 w-4",
                  }),
                  "Load Saved",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
                    className: "h-4 w-4",
                  }),
                  "Export",
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: handleSaveProgress,
            className: "gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Save, {
                className: "h-4 w-4",
              }),
              "Save Progress",
            ],
          }),
        ],
      }),
    ],
  });
}
