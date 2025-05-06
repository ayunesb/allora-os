"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsTable = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var table_1 = require("@/components/ui/table");
var button_1 = require("@/components/ui/button");
var checkbox_1 = require("@/components/ui/checkbox");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var LeadStatusBadge_1 = require("@/components/admin/leads/LeadStatusBadge");
var LeadScoreBadge_1 = require("./LeadScoreBadge");
var LeadsTable = function (_a) {
  var leads = _a.leads,
    sortBy = _a.sortBy,
    sortOrder = _a.sortOrder,
    onSort = _a.onSort,
    onViewLead = _a.onViewLead,
    onStatusUpdate = _a.onStatusUpdate,
    onDelete = _a.onDelete,
    selectedLeads = _a.selectedLeads,
    onLeadSelect = _a.onLeadSelect,
    onSelectAll = _a.onSelectAll,
    getLeadScore = _a.getLeadScore,
    getNextBestAction = _a.getNextBestAction;
  var sortIcon =
    sortOrder === "asc"
      ? (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronUp, {
          className: "ml-2 h-4 w-4",
        })
      : (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, {
          className: "ml-2 h-4 w-4",
        });
  var allLeadsSelected =
    leads.length > 0 && selectedLeads.length === leads.length;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "rounded-md border",
    children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
          children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
            children: [
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "w-12",
                children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                  checked: allLeadsSelected,
                  onCheckedChange: onSelectAll,
                  "aria-label": "Select all leads",
                }),
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "cursor-pointer",
                onClick: function () {
                  return onSort("name");
                },
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center",
                  children: ["Name ", sortBy === "name" && sortIcon],
                }),
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Contact",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Status" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Score" }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Next Action",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "cursor-pointer",
                onClick: function () {
                  return onSort("created_at");
                },
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center",
                  children: [
                    "Date Added ",
                    sortBy === "created_at" && sortIcon,
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "w-12",
                children: "Actions",
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(table_1.TableBody, {
          children: leads.map(function (lead) {
            var leadScore = getLeadScore(lead);
            var nextAction = getNextBestAction(lead);
            return (0, jsx_runtime_1.jsxs)(
              table_1.TableRow,
              {
                children: [
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                      checked: selectedLeads.includes(lead.id),
                      onCheckedChange: function (checked) {
                        return onLeadSelect(lead.id, !!checked);
                      },
                      "aria-label": "Select ".concat(lead.name),
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "font-medium hover:underline cursor-pointer",
                    onClick: function () {
                      return onViewLead(lead);
                    },
                    children: lead.name,
                  }),
                  (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                    children: [
                      lead.email &&
                        (0, jsx_runtime_1.jsx)("div", { children: lead.email }),
                      lead.phone &&
                        (0, jsx_runtime_1.jsx)("div", { children: lead.phone }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(
                      LeadStatusBadge_1.LeadStatusBadge,
                      { status: lead.status },
                    ),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsx)(
                      LeadScoreBadge_1.LeadScoreBadge,
                      { score: leadScore },
                    ),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "max-w-xs truncate",
                    title: nextAction,
                    children: nextAction,
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: new Date(lead.created_at).toLocaleDateString(),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: (0, jsx_runtime_1.jsxs)(
                      dropdown_menu_1.DropdownMenu,
                      {
                        children: [
                          (0, jsx_runtime_1.jsx)(
                            dropdown_menu_1.DropdownMenuTrigger,
                            {
                              asChild: true,
                              children: (0, jsx_runtime_1.jsxs)(
                                button_1.Button,
                                {
                                  variant: "ghost",
                                  className: "h-8 w-8 p-0",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className: "sr-only",
                                      children: "Open menu",
                                    }),
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.MoreHorizontal,
                                      { className: "h-4 w-4" },
                                    ),
                                  ],
                                },
                              ),
                            },
                          ),
                          (0, jsx_runtime_1.jsxs)(
                            dropdown_menu_1.DropdownMenuContent,
                            {
                              align: "end",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  dropdown_menu_1.DropdownMenuItem,
                                  {
                                    onClick: function () {
                                      return onViewLead(lead);
                                    },
                                    children: "View Details",
                                  },
                                ),
                                (0, jsx_runtime_1.jsx)(
                                  dropdown_menu_1.DropdownMenuItem,
                                  {
                                    onClick: function () {
                                      return onStatusUpdate(
                                        lead.id,
                                        "contacted",
                                      );
                                    },
                                    children: "Mark as Contacted",
                                  },
                                ),
                                (0, jsx_runtime_1.jsx)(
                                  dropdown_menu_1.DropdownMenuItem,
                                  {
                                    onClick: function () {
                                      return onStatusUpdate(
                                        lead.id,
                                        "qualified",
                                      );
                                    },
                                    children: "Mark as Qualified",
                                  },
                                ),
                                (0, jsx_runtime_1.jsx)(
                                  dropdown_menu_1.DropdownMenuItem,
                                  {
                                    onClick: function () {
                                      return onDelete(lead.id);
                                    },
                                    className: "text-destructive",
                                    children: "Delete",
                                  },
                                ),
                              ],
                            },
                          ),
                        ],
                      },
                    ),
                  }),
                ],
              },
              lead.id,
            );
          }),
        }),
      ],
    }),
  });
};
exports.LeadsTable = LeadsTable;
