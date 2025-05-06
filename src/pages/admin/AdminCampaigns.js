"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminCampaigns;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var button_1 = require("@/components/ui/button");
var responsive_table_1 = require("@/components/ui/responsive-table");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
var mockCampaigns = [
  {
    id: "1",
    name: "Q2 Product Launch",
    status: "active",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    budget: "$15,000",
    platform: "Multi-channel",
  },
  {
    id: "2",
    name: "Summer Promotion",
    status: "draft",
    startDate: "2025-06-15",
    endDate: "2025-08-15",
    budget: "$8,500",
    platform: "Facebook, Instagram",
  },
  {
    id: "3",
    name: "Black Friday Sale",
    status: "scheduled",
    startDate: "2025-11-20",
    endDate: "2025-11-30",
    budget: "$25,000",
    platform: "All platforms",
  },
  {
    id: "4",
    name: "Spring Collection",
    status: "ended",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    budget: "$12,000",
    platform: "Meta Ads",
  },
];
function AdminCampaigns() {
  var renderStatusBadge = function (status) {
    switch (status) {
      case "active":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30",
          children: status,
        });
      case "draft":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          children: status,
        });
      case "scheduled":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30",
          children: status,
        });
      case "ended":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "secondary",
          children: status,
        });
      default:
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          children: status,
        });
    }
  };
  var columns = [
    {
      key: "name",
      title: "Campaign Name",
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", {
          className: "font-medium",
          children: item.name,
        });
      },
    },
    {
      key: "status",
      title: "Status",
      render: function (item) {
        return renderStatusBadge(item.status);
      },
    },
    {
      key: "dateRange",
      title: "Date Range",
      hideOnMobile: true,
      render: function (item) {
        return (0, jsx_runtime_1.jsxs)("span", {
          children: [item.startDate, " to ", item.endDate],
        });
      },
    },
    {
      key: "budget",
      title: "Budget",
      hideOnMobile: true,
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", { children: item.budget });
      },
    },
    {
      key: "platform",
      title: "Platform",
      hideOnMobile: true,
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", { children: item.platform });
      },
    },
  ];
  var mobileColumns = [
    {
      key: "name",
      title: "Campaign",
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", {
          className: "font-medium",
          children: item.name,
        });
      },
    },
    {
      key: "status",
      title: "Status",
      render: function (item) {
        return renderStatusBadge(item.status);
      },
    },
    {
      key: "budget",
      title: "Budget",
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", { children: item.budget });
      },
    },
  ];
  var actions = function (item) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "flex gap-2 justify-end",
      children: [
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          size: "icon",
          variant: "ghost",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart, {
            className: "h-4 w-4",
          }),
        }),
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          size: "icon",
          variant: "ghost",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, {
            className: "h-4 w-4",
          }),
        }),
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          size: "icon",
          variant: "ghost",
          className: "text-destructive hover:text-destructive",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
            className: "h-4 w-4",
          }),
        }),
      ],
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "Campaign Management",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            className: "w-full sm:w-auto",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                className: "h-4 w-4 mr-2",
              }),
              "New Campaign",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "All Campaigns",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)(
              responsive_table_1.ResponsiveTable,
              {
                data: mockCampaigns,
                columns: columns,
                mobileColumns: mobileColumns,
                actions: actions,
              },
            ),
          }),
        ],
      }),
    ],
  });
}
