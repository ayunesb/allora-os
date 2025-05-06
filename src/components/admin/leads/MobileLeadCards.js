"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileLeadCards = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var LeadStatusBadge_1 = require("./LeadStatusBadge");
var LeadActions_1 = require("./LeadActions");
var MobileLeadCards = function (_a) {
  var leads = _a.leads,
    onStatusUpdate = _a.onStatusUpdate,
    onDelete = _a.onDelete;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-3",
    children:
      leads.length === 0
        ? (0, jsx_runtime_1.jsx)(card_1.Card, {
            className: "border-primary/10 shadow-sm",
            children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "p-4 text-center text-muted-foreground",
              children: "No leads found",
            }),
          })
        : leads.map(function (lead) {
            return (0, jsx_runtime_1.jsxs)(
              card_1.Card,
              {
                className: "border-primary/10 shadow-sm overflow-hidden",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                    className: "p-3 pb-1",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex justify-between items-start",
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          className: "text-base truncate",
                          children: lead.name,
                        }),
                        (0, jsx_runtime_1.jsx)(
                          LeadStatusBadge_1.LeadStatusBadge,
                          { status: lead.status },
                        ),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                    className: "p-3 pt-1 space-y-1",
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs truncate text-muted-foreground",
                        children: lead.email,
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs text-muted-foreground",
                        children: lead.phone,
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className:
                          "flex justify-between items-center pt-2 mt-1 border-t border-border",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-xs text-muted-foreground",
                            children: new Date(
                              lead.created_at,
                            ).toLocaleDateString(),
                          }),
                          (0, jsx_runtime_1.jsx)(LeadActions_1.LeadActions, {
                            leadId: lead.id,
                            onStatusUpdate: onStatusUpdate,
                            onDelete: onDelete,
                          }),
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
