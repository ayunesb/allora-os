"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminEntities;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var responsive_table_1 = require("@/components/ui/responsive-table");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var mockEntities = [
  {
    id: "1",
    name: "User",
    type: "Core",
    createdAt: "2023-03-15",
    status: "active",
  },
  {
    id: "2",
    name: "Company",
    type: "Core",
    createdAt: "2023-03-15",
    status: "active",
  },
  {
    id: "3",
    name: "Strategy",
    type: "Business",
    createdAt: "2023-04-20",
    status: "active",
  },
  {
    id: "4",
    name: "Executive",
    type: "AI",
    createdAt: "2023-05-10",
    status: "active",
  },
];
function AdminEntities() {
  var columns = [
    {
      key: "name",
      title: "Entity Name",
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", {
          className: "font-medium",
          children: item.name,
        });
      },
    },
    {
      key: "type",
      title: "Type",
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", { children: item.type });
      },
    },
    {
      key: "createdAt",
      title: "Created",
      hideOnMobile: true,
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", { children: item.createdAt });
      },
    },
    {
      key: "status",
      title: "Status",
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", {
          className: "inline-flex px-2 py-1 text-xs rounded-full ".concat(
            item.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : item.status === "inactive"
                ? "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
          ),
          children: item.status,
        });
      },
    },
  ];
  var mobileColumns = [
    {
      key: "name",
      title: "Entity Name",
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", {
          className: "font-medium",
          children: item.name,
        });
      },
    },
    {
      key: "type",
      title: "Type",
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", { children: item.type });
      },
    },
    {
      key: "status",
      title: "Status",
      render: function (item) {
        return (0, jsx_runtime_1.jsx)("span", {
          className: "inline-flex px-2 py-1 text-xs rounded-full ".concat(
            item.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : item.status === "inactive"
                ? "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
          ),
          children: item.status,
        });
      },
    },
  ];
  var actions = function (item) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "flex gap-2 justify-end",
      children: [
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "outline",
          size: "sm",
          children: "Edit",
        }),
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "outline",
          size: "sm",
          className: "text-destructive hover:text-destructive",
          children: "Delete",
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
            children: "Entity Management",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            className: "w-full sm:w-auto",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                className: "h-4 w-4 mr-2",
              }),
              "Add Entity",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "System Entities",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)(
              responsive_table_1.ResponsiveTable,
              {
                data: mockEntities,
                columns: columns,
                mobileColumns: mobileColumns,
                actions: actions,
                emptyState: (0, jsx_runtime_1.jsxs)("div", {
                  className: "text-center py-8",
                  children: [
                    (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                      children:
                        "No entities found. Create your first entity to get started.",
                    }),
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      className: "mt-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                          className: "h-4 w-4 mr-2",
                        }),
                        "Add Entity",
                      ],
                    }),
                  ],
                }),
              },
            ),
          }),
        ],
      }),
    ],
  });
}
