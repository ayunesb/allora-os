"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadProfileDrawer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var drawer_1 = require("@/components/ui/drawer");
var button_1 = require("@/components/ui/button");
var separator_1 = require("@/components/ui/separator");
var LeadStatusBadge_1 = require("@/components/admin/leads/LeadStatusBadge");
var LeadScoreBadge_1 = require("./LeadScoreBadge");
var lucide_react_1 = require("lucide-react");
var LeadProfileDrawer = function (_a) {
  var _b;
  var children = _a.children,
    _c = _a.variant,
    variant = _c === void 0 ? "default" : _c,
    _d = _a.size,
    size = _d === void 0 ? "large" : _d;
  var leadScore = getLeadScore(lead);
  var nextAction = getNextBestAction(lead);
  return (0, jsx_runtime_1.jsx)(drawer_1.Drawer, {
    open: open,
    onOpenChange: onOpenChange,
    children: (0, jsx_runtime_1.jsxs)(drawer_1.DrawerContent, {
      className: "max-h-[85vh]",
      children: [
        (0, jsx_runtime_1.jsxs)(drawer_1.DrawerHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(drawer_1.DrawerTitle, {
              className: "text-xl",
              children: lead.name,
            }),
            (0, jsx_runtime_1.jsx)(drawer_1.DrawerDescription, {
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex flex-wrap items-center gap-2 mt-2",
                children: [
                  (0, jsx_runtime_1.jsx)(LeadStatusBadge_1.LeadStatusBadge, {
                    status: lead.status,
                  }),
                  (0, jsx_runtime_1.jsx)(LeadScoreBadge_1.LeadScoreBadge, {
                    score: leadScore,
                  }),
                  ((_b = lead.campaigns) === null || _b === void 0
                    ? void 0
                    : _b.name) &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "text-xs rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutList, {
                          className: "inline h-3 w-3 mr-1",
                        }),
                        lead.campaigns.name,
                      ],
                    }),
                ],
              }),
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "p-4 space-y-6 overflow-auto",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-3",
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-sm font-semibold",
                  children: "Contact Information",
                }),
                lead.email || lead.phone
                  ? (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        lead.email &&
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center text-sm",
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, {
                                className: "h-4 w-4 mr-3 text-muted-foreground",
                              }),
                              (0, jsx_runtime_1.jsx)("a", {
                                href: "mailto:".concat(lead.email),
                                className: "hover:underline",
                                children: lead.email,
                              }),
                            ],
                          }),
                        lead.phone &&
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center text-sm",
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
                                className: "h-4 w-4 mr-3 text-muted-foreground",
                              }),
                              (0, jsx_runtime_1.jsx)("a", {
                                href: "tel:".concat(lead.phone),
                                className: "hover:underline",
                                children: lead.phone,
                              }),
                            ],
                          }),
                      ],
                    })
                  : (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children: "No contact information provided",
                    }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-3",
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-sm font-semibold",
                  children: "Lead Details",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center text-sm",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.CalendarClock, {
                          className: "h-4 w-4 mr-3 text-muted-foreground",
                        }),
                        (0, jsx_runtime_1.jsxs)("span", {
                          children: [
                            "Added on ",
                            new Date(lead.created_at).toLocaleDateString(),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center text-sm",
                      children: [
                        (0, jsx_runtime_1.jsx)(
                          lucide_react_1.ArrowRightCircle,
                          { className: "h-4 w-4 mr-3 text-muted-foreground" },
                        ),
                        (0, jsx_runtime_1.jsxs)("span", {
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "font-medium",
                              children: "Next action:",
                            }),
                            " ",
                            nextAction,
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-3",
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-sm font-semibold",
                  children: "Update Status",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex flex-wrap gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      size: "sm",
                      variant: lead.status === "new" ? "default" : "outline",
                      onClick: function () {
                        return onStatusUpdate(lead.id, "new");
                      },
                      children: "New",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      size: "sm",
                      variant:
                        lead.status === "contacted" ? "default" : "outline",
                      onClick: function () {
                        return onStatusUpdate(lead.id, "contacted");
                      },
                      children: "Contacted",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      size: "sm",
                      variant:
                        lead.status === "qualified" ? "default" : "outline",
                      onClick: function () {
                        return onStatusUpdate(lead.id, "qualified");
                      },
                      children: "Qualified",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      size: "sm",
                      variant:
                        lead.status === "proposal" ? "default" : "outline",
                      onClick: function () {
                        return onStatusUpdate(lead.id, "proposal");
                      },
                      children: "Proposal",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      size: "sm",
                      variant:
                        lead.status === "negotiation" ? "default" : "outline",
                      onClick: function () {
                        return onStatusUpdate(lead.id, "negotiation");
                      },
                      children: "Negotiation",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      size: "sm",
                      variant: lead.status === "client" ? "default" : "outline",
                      onClick: function () {
                        return onStatusUpdate(lead.id, "client");
                      },
                      children: "Client",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      size: "sm",
                      variant: lead.status === "lost" ? "default" : "outline",
                      onClick: function () {
                        return onStatusUpdate(lead.id, "lost");
                      },
                      children: "Lost",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(drawer_1.DrawerFooter, {
          className: "border-t",
          children: [
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "destructive",
              onClick: function () {
                onDelete(lead.id);
                onOpenChange(false);
              },
              children: "Delete Lead",
            }),
            (0, jsx_runtime_1.jsx)(drawer_1.DrawerClose, {
              asChild: true,
              children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                children: "Close",
              }),
            }),
          ],
        }),
      ],
    }),
  });
};
exports.LeadProfileDrawer = LeadProfileDrawer;
