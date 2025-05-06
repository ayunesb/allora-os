"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileLeadCards = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var LeadStatusBadge_1 = require("@/components/admin/leads/LeadStatusBadge");
var LeadScoreBadge_1 = require("./LeadScoreBadge");
var lucide_react_1 = require("lucide-react");
var MobileLeadCards = function (_a) {
  var leads = _a.leads,
    onViewLead = _a.onViewLead,
    onStatusUpdate = _a.onStatusUpdate,
    onDelete = _a.onDelete,
    getLeadScore = _a.getLeadScore,
    getNextBestAction = _a.getNextBestAction;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-4",
    children: leads.map(function (lead) {
      var leadScore = getLeadScore(lead);
      var nextAction = getNextBestAction(lead);
      return (0, jsx_runtime_1.jsxs)(
        card_1.Card,
        {
          className: "overflow-hidden",
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              className: "pb-2",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-between items-start",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-base font-medium",
                    children: lead.name,
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(
                        LeadStatusBadge_1.LeadStatusBadge,
                        { status: lead.status },
                      ),
                      (0, jsx_runtime_1.jsx)(LeadScoreBadge_1.LeadScoreBadge, {
                        score: leadScore,
                      }),
                    ],
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "pb-2",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "grid gap-1",
                children: [
                  lead.email &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center text-sm",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, {
                          className: "h-4 w-4 mr-2 text-muted-foreground",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          children: lead.email,
                        }),
                      ],
                    }),
                  lead.phone &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center text-sm",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
                          className: "h-4 w-4 mr-2 text-muted-foreground",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          children: lead.phone,
                        }),
                      ],
                    }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "pt-2 text-sm",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "font-medium",
                        children: "Next action: ",
                      }),
                      nextAction,
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-xs text-muted-foreground pt-1",
                    children: [
                      "Added on ",
                      new Date(lead.created_at).toLocaleDateString(),
                    ],
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
              className: "flex justify-between pt-2",
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  size: "sm",
                  variant: "secondary",
                  onClick: function () {
                    return onViewLead(lead);
                  },
                  children: "View Details",
                }),
                (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, {
                  children: [
                    (0, jsx_runtime_1.jsx)(
                      dropdown_menu_1.DropdownMenuTrigger,
                      {
                        asChild: true,
                        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                          variant: "ghost",
                          size: "icon",
                          className: "h-8 w-8",
                          children: (0, jsx_runtime_1.jsx)(
                            lucide_react_1.MoreHorizontal,
                            { className: "h-4 w-4" },
                          ),
                        }),
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
                                return onStatusUpdate(lead.id, "contacted");
                              },
                              children: "Mark as Contacted",
                            },
                          ),
                          (0, jsx_runtime_1.jsx)(
                            dropdown_menu_1.DropdownMenuItem,
                            {
                              onClick: function () {
                                return onStatusUpdate(lead.id, "qualified");
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
                }),
              ],
            }),
          ],
        },
        lead.id,
      );
    }),
  });
};
exports.MobileLeadCards = MobileLeadCards;
