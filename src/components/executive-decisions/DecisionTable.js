"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionTable = DecisionTable;
var jsx_runtime_1 = require("react/jsx-runtime");
var badge_1 = require("@/components/ui/badge");
var table_1 = require("@/components/ui/table");
var card_1 = require("@/components/ui/card");
var react_router_dom_1 = require("react-router-dom");
function DecisionTable(_a) {
  var decisions = _a.decisions,
    loading = _a.loading,
    error = _a.error;
  var getPriorityColor = function (priority) {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  if (loading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "flex justify-center items-center h-64",
      children: (0, jsx_runtime_1.jsx)("div", {
        className:
          "animate-spin rounded-full h-12 w-12 border-b-2 border-primary",
      }),
    });
  }
  if (error) {
    return (0, jsx_runtime_1.jsx)(card_1.Card, {
      className: "p-6 bg-red-50 border border-red-200 text-red-800",
      children: (0, jsx_runtime_1.jsx)("p", { children: error }),
    });
  }
  if (decisions.length === 0) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "p-8 text-center",
      children: [
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-xl font-medium mb-2",
          children: "No decisions found",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children:
            "No decisions match your current filters. Try adjusting your search criteria.",
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    className: "p-0 overflow-hidden",
    children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
          children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
            children: [
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Executive",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Task" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Decision",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Risk Assessment",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Priority",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Date" }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableBody, {
          children: decisions.map(function (decision) {
            return (0, jsx_runtime_1.jsxs)(
              table_1.TableRow,
              {
                children: [
                  (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                    className: "font-medium",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        children: (0, jsx_runtime_1.jsx)(
                          react_router_dom_1.Link,
                          {
                            to: "/dashboard/executives/".concat(
                              encodeURIComponent(decision.executiveName),
                            ),
                            className: "hover:underline hover:text-primary",
                            children: decision.executiveName,
                          },
                        ),
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-xs text-muted-foreground",
                        children: decision.executiveRole,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: decision.task,
                  }),
                  (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "font-medium",
                        children: decision.selectedOption,
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-sm text-muted-foreground mt-1",
                        children: decision.reasoning,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "max-w-xs",
                    children: decision.riskAssessment || "No risk assessment",
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children:
                      decision.priority &&
                      (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                        className: getPriorityColor(decision.priority),
                        children: decision.priority,
                      }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "whitespace-nowrap",
                    children: new Date(decision.timestamp).toLocaleString(),
                  }),
                ],
              },
              decision.id,
            );
          }),
        }),
      ],
    }),
  });
}
