"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyTable = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var table_1 = require("@/components/ui/table");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var tooltip_1 = require("@/components/ui/tooltip");
var CompanyTable = function (_a) {
  var companies = _a.companies,
    isLoading = _a.isLoading,
    onViewUsers = _a.onViewUsers,
    onEditCompany = _a.onEditCompany,
    onDeleteCompany = _a.onDeleteCompany;
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "flex justify-center items-center py-8",
      children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
        className: "h-8 w-8 animate-spin text-primary",
      }),
    });
  }
  return (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
    children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
          children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
            children: [
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Name" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Industry",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Created",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Actions",
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableBody, {
          children:
            companies.length === 0
              ? (0, jsx_runtime_1.jsx)(table_1.TableRow, {
                  children: (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    colSpan: 4,
                    className: "text-center py-8 text-muted-foreground",
                    children:
                      "No companies found. Add your first company to get started.",
                  }),
                })
              : companies.map(function (company) {
                  return (0, jsx_runtime_1.jsxs)(
                    table_1.TableRow,
                    {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "font-medium",
                          children: company.name,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          children: company.industry || "Not specified",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          children: new Date(
                            company.created_at,
                          ).toLocaleDateString(),
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex space-x-2",
                            children: [
                              (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    tooltip_1.TooltipTrigger,
                                    {
                                      asChild: true,
                                      children: (0, jsx_runtime_1.jsxs)(
                                        button_1.Button,
                                        {
                                          variant: "ghost",
                                          size: "sm",
                                          onClick: function () {
                                            return onViewUsers(company.id);
                                          },
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              lucide_react_1.Users,
                                              { className: "h-4 w-4 mr-1" },
                                            ),
                                            "Users",
                                          ],
                                        },
                                      ),
                                    },
                                  ),
                                  (0, jsx_runtime_1.jsx)(
                                    tooltip_1.TooltipContent,
                                    { children: "View company users" },
                                  ),
                                ],
                              }),
                              onEditCompany &&
                                (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      tooltip_1.TooltipTrigger,
                                      {
                                        asChild: true,
                                        children: (0, jsx_runtime_1.jsxs)(
                                          button_1.Button,
                                          {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: function () {
                                              return onEditCompany(company);
                                            },
                                            children: [
                                              (0, jsx_runtime_1.jsx)(
                                                lucide_react_1.Pencil,
                                                { className: "h-4 w-4 mr-1" },
                                              ),
                                              "Edit",
                                            ],
                                          },
                                        ),
                                      },
                                    ),
                                    (0, jsx_runtime_1.jsx)(
                                      tooltip_1.TooltipContent,
                                      { children: "Edit company details" },
                                    ),
                                  ],
                                }),
                              onDeleteCompany &&
                                (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      tooltip_1.TooltipTrigger,
                                      {
                                        asChild: true,
                                        children: (0, jsx_runtime_1.jsxs)(
                                          button_1.Button,
                                          {
                                            variant: "ghost",
                                            size: "sm",
                                            className:
                                              "text-destructive hover:bg-destructive/10",
                                            onClick: function () {
                                              return onDeleteCompany(
                                                company.id,
                                              );
                                            },
                                            children: [
                                              (0, jsx_runtime_1.jsx)(
                                                lucide_react_1.Trash2,
                                                { className: "h-4 w-4 mr-1" },
                                              ),
                                              "Delete",
                                            ],
                                          },
                                        ),
                                      },
                                    ),
                                    (0, jsx_runtime_1.jsx)(
                                      tooltip_1.TooltipContent,
                                      { children: "Delete this company" },
                                    ),
                                  ],
                                }),
                            ],
                          }),
                        }),
                      ],
                    },
                    company.id,
                  );
                }),
        }),
      ],
    }),
  });
};
exports.CompanyTable = CompanyTable;
