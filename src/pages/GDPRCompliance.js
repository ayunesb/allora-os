"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var page_title_1 = require("@/components/ui/page-title");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var PageErrorBoundary_1 = require("@/components/errorHandling/PageErrorBoundary");
var GDPRCompliancePage = function () {
  var navigate = (0, react_router_dom_1.useNavigate)();
  return (0, jsx_runtime_1.jsx)(PageErrorBoundary_1.PageErrorBoundary, {
    pageName: "GDPR Compliance",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "container max-w-4xl py-8",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "mb-6 flex items-center",
          children: [
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "ghost",
              onClick: function () {
                return navigate(-1);
              },
              className: "mr-4",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {
                  className: "h-4 w-4 mr-2",
                }),
                "Back",
              ],
            }),
            (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
              title: "GDPR Compliance",
              children: "GDPR Compliance",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.Card, {
          className: "mb-8",
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              className: "border-b border-border pb-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                      className: "mr-2 h-6 w-6 text-primary",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Our Commitment to GDPR",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children:
                    "How Allora AI ensures compliance with the General Data Protection Regulation",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "pt-6",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-6",
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    children:
                      "At Allora AI, we are committed to ensuring the privacy and protection of your data in compliance with the General Data Protection Regulation (GDPR). This page outlines how we adhere to GDPR principles and what rights you have regarding your personal data.",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "rounded-lg bg-muted p-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("h3", {
                        className: "text-lg font-medium mb-2 flex items-center",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.UserCheck, {
                            className: "mr-2 h-5 w-5 text-primary",
                          }),
                          "Your Rights Under GDPR",
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("ul", {
                        className: "list-disc pl-5 space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("li", {
                            children: "Right to access your personal data",
                          }),
                          (0, jsx_runtime_1.jsx)("li", {
                            children:
                              "Right to rectification of inaccurate personal data",
                          }),
                          (0, jsx_runtime_1.jsx)("li", {
                            children:
                              'Right to erasure ("right to be forgotten")',
                          }),
                          (0, jsx_runtime_1.jsx)("li", {
                            children: "Right to restriction of processing",
                          }),
                          (0, jsx_runtime_1.jsx)("li", {
                            children: "Right to data portability",
                          }),
                          (0, jsx_runtime_1.jsx)("li", {
                            children: "Right to object to processing",
                          }),
                          (0, jsx_runtime_1.jsx)("li", {
                            children:
                              "Rights related to automated decision making and profiling",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsxs)("h3", {
                        className: "text-lg font-medium mb-3 flex items-center",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Lock, {
                            className: "mr-2 h-5 w-5 text-primary",
                          }),
                          "How We Ensure GDPR Compliance",
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("h4", {
                                className: "font-medium",
                                children: "Data Minimization",
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children:
                                  "We only collect and process data that is necessary for the specific purposes we've communicated to you.",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("h4", {
                                className: "font-medium",
                                children: "Lawful Processing",
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children:
                                  "We ensure that all data processing activities have a valid legal basis under GDPR.",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("h4", {
                                className: "font-medium",
                                children: "Transparency",
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children:
                                  "We provide clear information about how we collect, use, and share your data.",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("h4", {
                                className: "font-medium",
                                children: "Data Security",
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children:
                                  "We implement appropriate technical and organizational measures to protect your data.",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("h4", {
                                className: "font-medium",
                                children: "Data Retention",
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children:
                                  "We retain personal data only for as long as necessary for the purposes for which it was collected.",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.Card, {
          className: "mb-8",
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
                    className: "mr-2 h-6 w-6 text-primary",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Data Processing Agreement",
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  className: "mb-4",
                  children:
                    "If you are a business customer using our services to process personal data, we offer a Data Processing Agreement (DPA) that outlines our respective responsibilities under GDPR.",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex flex-col sm:flex-row gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "outline",
                      children: "Download Sample DPA",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      children: "Request a DPA",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Related Policies",
              }),
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "For more detailed information on our data practices, please refer to our:",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex flex-col gap-2 sm:flex-row",
                  children: [
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "outline",
                      asChild: true,
                      children: (0, jsx_runtime_1.jsx)(
                        react_router_dom_1.Link,
                        { to: "/privacy", children: "Privacy Policy" },
                      ),
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "outline",
                      asChild: true,
                      children: (0, jsx_runtime_1.jsx)(
                        react_router_dom_1.Link,
                        { to: "/cookie-policy", children: "Cookie Policy" },
                      ),
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "outline",
                      asChild: true,
                      children: (0, jsx_runtime_1.jsx)(
                        react_router_dom_1.Link,
                        { to: "/cookie-settings", children: "Cookie Settings" },
                      ),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "mt-8 text-center",
          children: (0, jsx_runtime_1.jsxs)("p", {
            className: "text-sm text-muted-foreground",
            children: [
              "If you have any questions about our GDPR compliance or wish to exercise your rights, please contact our Data Protection Officer at",
              " ",
              (0, jsx_runtime_1.jsx)("a", {
                href: "mailto:dpo@alloraai.com",
                className: "text-primary hover:underline",
                children: "dpo@alloraai.com",
              }),
            ],
          }),
        }),
      ],
    }),
  });
};
exports.default = GDPRCompliancePage;
