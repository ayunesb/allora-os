"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var table_1 = require("@/components/ui/table");
var badge_1 = require("@/components/ui/badge");
var skeleton_1 = require("@/components/ui/skeleton");
var lucide_react_1 = require("lucide-react");
var formatters_1 = require("@/utils/formatters");
var CampaignTable = function (_a) {
  var campaigns = _a.campaigns,
    isLoading = _a.isLoading,
    error = _a.error,
    onRetry = _a.onRetry;
  // Loading state with skeletons
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
        children: [
          (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
            children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
              children: [
                (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Name" }),
                (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                  children: "Company",
                }),
                (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                  children: "Platform",
                }),
                (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                  children: "Budget",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(table_1.TableBody, {
            children: [1, 2, 3, 4].map(function (i) {
              return (0, jsx_runtime_1.jsxs)(
                table_1.TableRow,
                {
                  children: [
                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                      children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-5 w-[150px]",
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                      children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-5 w-[120px]",
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                      children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-6 w-[100px]",
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                      children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                        className: "h-5 w-[80px]",
                      }),
                    }),
                  ],
                },
                i,
              );
            }),
          }),
        ],
      }),
    });
  }
  // Error state
  if (error) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className:
        "flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-md my-4",
      children: [
        (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className: "h-8 w-8 text-red-500 mb-2",
        }),
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-lg font-medium text-red-800",
          children: "Failed to load campaigns",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-red-600 mb-4",
          children: error,
        }),
        onRetry &&
          (0, jsx_runtime_1.jsx)("button", {
            onClick: onRetry,
            className:
              "px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors",
            children: "Try Again",
          }),
      ],
    });
  }
  // Empty state
  if (campaigns.length === 0) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className:
        "flex flex-col items-center justify-center p-6 bg-muted/40 border border-border rounded-md my-4",
      children: [
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-lg font-medium mb-1",
          children: "No campaigns found",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground mb-4",
          children: "Create your first campaign to get started.",
        }),
      ],
    });
  }
  // Data table
  return (0, jsx_runtime_1.jsxs)(table_1.Table, {
    children: [
      (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
        children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
          children: [
            (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Name" }),
            (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Company" }),
            (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Platform" }),
            (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Budget" }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(table_1.TableBody, {
        children: campaigns.map(function (campaign) {
          var _a;
          // Type cast to handle potential companies property
          var campaignWithCompany = campaign;
          return (0, jsx_runtime_1.jsxs)(
            table_1.TableRow,
            {
              children: [
                (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                  className: "font-medium",
                  children: campaign.name,
                }),
                (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                  children:
                    ((_a = campaignWithCompany.companies) === null ||
                    _a === void 0
                      ? void 0
                      : _a.name) || "-",
                }),
                (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                  children: (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                    variant: "outline",
                    className: "bg-primary/10 text-primary",
                    children: campaign.platform,
                  }),
                }),
                (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                  children: (0, formatters_1.formatCurrency)(
                    campaign.budget || 0,
                  ),
                }),
              ],
            },
            campaign.id,
          );
        }),
      }),
    ],
  });
};
exports.default = CampaignTable;
