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
exports.usePreLaunchChecklist = usePreLaunchChecklist;
var react_1 = require("react");
function usePreLaunchChecklist() {
  var _a = (0, react_1.useState)([
      // API Integrations
      {
        id: "1",
        category: "Supabase",
        task: "Connect to real database (NOT test project)",
        completed: true,
        critical: true,
      },
      {
        id: "2",
        category: "Supabase",
        task: "Ensure real tables exist (profiles, companies, strategies, campaigns, leads)",
        completed: true,
        critical: true,
      },
      {
        id: "3",
        category: "Stripe",
        task: "Connect real Stripe API keys (test mode is fine)",
        completed: true,
        critical: true,
      },
      {
        id: "4",
        category: "Postmark",
        task: "Hook real Postmark API Key for emails",
        completed: true,
        critical: true,
      },
      {
        id: "5",
        category: "Twilio",
        task: "Hook Twilio API Key for SMS functionality",
        completed: true,
        critical: true,
      },
      {
        id: "6",
        category: "Heygen",
        task: "Hook Heygen API Key for AI video generation",
        completed: true,
        critical: true,
      },
      {
        id: "7",
        category: "Zapier",
        task: "Make sure Zapier hooks are ready (if applicable)",
        completed: true,
        critical: false,
      },
      // Code Cleanups
      {
        id: "8",
        category: "Cleanup",
        task: "Remove any dummy/test data",
        completed: true,
        critical: true,
      },
      {
        id: "9",
        category: "Cleanup",
        task: "Set environment variables in Supabase Edge Functions",
        completed: true,
        critical: true,
      },
      {
        id: "10",
        category: "Cleanup",
        task: "Turn off test modes in API calls",
        completed: true,
        critical: true,
      },
      {
        id: "11",
        category: "Cleanup",
        task: "Format and lint all files",
        completed: true,
        critical: false,
      },
      {
        id: "12",
        category: "Cleanup",
        task: "Remove console.logs and TODO comments",
        completed: true,
        critical: false,
      },
      // Final Checks
      {
        id: "13",
        category: "Testing",
        task: "Test user authentication flows",
        completed: true,
        critical: true,
      },
      {
        id: "14",
        category: "Testing",
        task: "Test lead management functionality",
        completed: true,
        critical: true,
      },
      {
        id: "15",
        category: "Testing",
        task: "Test payment processing",
        completed: true,
        critical: true,
      },
      {
        id: "16",
        category: "Testing",
        task: "Test email notifications",
        completed: true,
        critical: true,
      },
      {
        id: "17",
        category: "Testing",
        task: "Test SMS functionality",
        completed: true,
        critical: true,
      },
      {
        id: "18",
        category: "Testing",
        task: "Test video generation",
        completed: true,
        critical: true,
      },
    ]),
    checklistItems = _a[0],
    setChecklistItems = _a[1];
  var toggleItem = function (id) {
    setChecklistItems(function (items) {
      return items.map(function (item) {
        return item.id === id
          ? __assign(__assign({}, item), { completed: !item.completed })
          : item;
      });
    });
  };
  var criticalItemsCompleted =
    checklistItems.filter(function (item) {
      return item.critical && !item.completed;
    }).length === 0;
  var allItemsCompleted =
    checklistItems.filter(function (item) {
      return !item.completed;
    }).length === 0;
  var getItemsByCategory = function (category) {
    return checklistItems.filter(function (item) {
      return (
        item.category === category ||
        (category === "Supabase" &&
          [
            "Supabase",
            "Stripe",
            "Postmark",
            "Twilio",
            "Heygen",
            "Zapier",
          ].includes(item.category))
      );
    });
  };
  return {
    checklistItems: checklistItems,
    toggleItem: toggleItem,
    criticalItemsCompleted: criticalItemsCompleted,
    allItemsCompleted: allItemsCompleted,
    getItemsByCategory: getItemsByCategory,
  };
}
