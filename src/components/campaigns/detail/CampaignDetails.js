"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignDetails = CampaignDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function CampaignDetails(_a) {
  var _b, _c, _d, _e;
  var campaign = _a.campaign;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "Campaign Details",
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "font-medium mb-2",
                children: "Ad Creative",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "bg-muted p-4 rounded-md",
                children: [
                  (0, jsx_runtime_1.jsx)("h4", {
                    className: "font-medium",
                    children:
                      ((_c =
                        (_b = campaign.creatives) === null || _b === void 0
                          ? void 0
                          : _b[0]) === null || _c === void 0
                        ? void 0
                        : _c.title) || "No title",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-muted-foreground mt-1",
                    children:
                      ((_e =
                        (_d = campaign.creatives) === null || _d === void 0
                          ? void 0
                          : _d[0]) === null || _e === void 0
                        ? void 0
                        : _e.description) || "No description",
                  }),
                ],
              }),
            ],
          }),
          campaign.platform_specific_id &&
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "font-medium mb-2",
                  children: "Platform Details",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "bg-muted p-4 rounded-md",
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-2 gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-muted-foreground",
                        children: "Platform ID:",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        children: campaign.platform_specific_id,
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-muted-foreground",
                        children: "Status:",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        children: campaign.platform_status,
                      }),
                    ],
                  }),
                }),
              ],
            }),
        ],
      }),
    ],
  });
}
