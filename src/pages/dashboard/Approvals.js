"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Approvals;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var react_router_dom_1 = require("react-router-dom");
var use_mobile_1 = require("@/hooks/use-mobile");
function Approvals() {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobile = ["xs", "mobile"].includes(breakpoint);
  var _a = (0, react_1.useState)([
      {
        id: "1",
        title: "Market Expansion Strategy",
        description:
          "Expand operations to three new metropolitan areas with high growth potential.",
        type: "strategy",
        author: "Elon Musk, AI CEO",
        createdAt: "2 days ago",
      },
      {
        id: "2",
        title: "LinkedIn Ad Campaign",
        description:
          "Target decision-makers in the finance sector with personalized ads highlighting cost benefits.",
        type: "campaign",
        author: "Antonio Lucio, AI CMO",
        createdAt: "3 days ago",
      },
      {
        id: "3",
        title: "Cold Call Script Update",
        description:
          "New script emphasizing ROI metrics and competitive advantages.",
        type: "call",
        author: "Grant Cardone, AI Sales Expert",
        createdAt: "1 day ago",
      },
    ]),
    approvals = _a[0],
    setApprovals = _a[1];
  var handleApprove = function (id) {
    setApprovals(
      approvals.filter(function (item) {
        return item.id !== id;
      }),
    );
    sonner_1.toast.success("Item approved successfully");
    // If all items are approved, go back to dashboard
    if (approvals.length === 1) {
      setTimeout(function () {
        return navigate("/dashboard");
      }, 1500);
    }
  };
  var handleDecline = function (id) {
    setApprovals(
      approvals.filter(function (item) {
        return item.id !== id;
      }),
    );
    sonner_1.toast.info("Item declined");
    // If all items are declined, go back to dashboard
    if (approvals.length === 1) {
      setTimeout(function () {
        return navigate("/dashboard");
      }, 1500);
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "w-full max-w-full px-4 sm:px-6 md:px-8 mx-auto pb-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6",
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            className: "mr-0 sm:mr-4 w-fit",
            onClick: function () {
              return navigate(-1);
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {
                className: "h-4 w-4 mr-2",
              }),
              "Back",
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-xl sm:text-2xl font-bold",
                children: "Pending Approvals",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground text-sm sm:text-base",
                children: "Review and approve AI-generated recommendations",
              }),
            ],
          }),
        ],
      }),
      approvals.length === 0
        ? (0, jsx_runtime_1.jsx)(card_1.Card, {
            children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              className: "pt-6 pb-6 text-center",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  className: "mb-4",
                  children: "No pending approvals.",
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  asChild: true,
                  children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                    to: "/dashboard",
                    children: "Return to Dashboard",
                  }),
                }),
              ],
            }),
          })
        : (0, jsx_runtime_1.jsx)("div", {
            className: "space-y-4",
            children: approvals.map(function (item) {
              return (0, jsx_runtime_1.jsxs)(
                card_1.Card,
                {
                  className: "overflow-hidden",
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                      className: "p-4 sm:p-6",
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className:
                          "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                                className: "text-lg sm:text-xl break-words",
                                children: item.title,
                              }),
                              (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
                                className: "text-sm",
                                children: ["Proposed by ", item.author],
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "flex flex-wrap items-center gap-2 mt-2 sm:mt-0",
                            children: [
                              (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                variant: "outline",
                                className: "capitalize",
                                children: item.type,
                              }),
                              (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                variant: "outline",
                                className:
                                  "bg-secondary/10 text-secondary border-secondary/20",
                                children: item.createdAt,
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      className: "p-4 sm:p-6 pt-0 sm:pt-0",
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm sm:text-base",
                        children: item.description,
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
                      className:
                        "flex flex-col sm:flex-row justify-between gap-3 border-t p-4 sm:p-6",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex w-full sm:w-auto space-x-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              onClick: function () {
                                return handleApprove(item.id);
                              },
                              className:
                                "bg-green-600 hover:bg-green-700 flex-1 sm:flex-none",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.ThumbsUp,
                                  { className: "mr-2 h-4 w-4" },
                                ),
                                "Approve",
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              variant: "outline",
                              onClick: function () {
                                return handleDecline(item.id);
                              },
                              className: "flex-1 sm:flex-none",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.ThumbsDown,
                                  { className: "mr-2 h-4 w-4" },
                                ),
                                "Decline",
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(button_1.Button, {
                          variant: "ghost",
                          asChild: true,
                          className: "w-full sm:w-auto",
                          children: (0, jsx_runtime_1.jsxs)(
                            react_router_dom_1.Link,
                            {
                              to: "/dashboard/".concat(
                                item.type === "strategy"
                                  ? "strategies"
                                  : item.type === "campaign"
                                    ? "campaigns"
                                    : "calls",
                              ),
                              children: [
                                "View Details",
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.ExternalLink,
                                  { className: "ml-2 h-4 w-4" },
                                ),
                              ],
                            },
                          ),
                        }),
                      ],
                    }),
                  ],
                },
                item.id,
              );
            }),
          }),
    ],
  });
}
