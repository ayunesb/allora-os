"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegulatoryFrameworks;
var jsx_runtime_1 = require("react/jsx-runtime");
var accordion_1 = require("@/components/ui/accordion");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
function RegulatoryFrameworks() {
  return (0, jsx_runtime_1.jsxs)(accordion_1.Accordion, {
    type: "single",
    collapsible: true,
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, {
        value: "gdpr",
        children: [
          (0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center",
              children: [
                "GDPR Compliance",
                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                  variant: "outline",
                  className: "ml-2",
                  children: "Required",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(accordion_1.AccordionContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "The General Data Protection Regulation (GDPR) is a comprehensive data protection law in the EU. Our platform implements the following GDPR requirements:",
                }),
                (0, jsx_runtime_1.jsxs)("ul", {
                  className: "list-disc pl-5 space-y-1",
                  children: [
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Right to access personal data",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Right to rectification",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Right to erasure (right to be forgotten)",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Right to restrict processing",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Right to data portability",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Right to object to processing",
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, {
        value: "ccpa",
        children: [
          (0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center",
              children: [
                "CCPA Compliance",
                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                  variant: "outline",
                  className: "ml-2",
                  children: "Required",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(accordion_1.AccordionContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "The California Consumer Privacy Act (CCPA) enhances privacy rights for California residents. Our platform implements the following CCPA requirements:",
                }),
                (0, jsx_runtime_1.jsxs)("ul", {
                  className: "list-disc pl-5 space-y-1",
                  children: [
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "Right to know what personal information is collected",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "Right to know whether personal information is sold or disclosed",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children:
                        "Right to say no to the sale of personal information",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Right to access personal information",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Right to equal service and price",
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, {
        value: "hipaa",
        children: [
          (0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center",
              children: [
                "HIPAA Compliance",
                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                  variant: "outline",
                  className: "ml-2",
                  children: "Optional",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(accordion_1.AccordionContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "The Health Insurance Portability and Accountability Act (HIPAA) sets standards for protecting sensitive patient health information. Enable this only if your organization handles protected health information (PHI).",
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  size: "sm",
                  children: "Enable HIPAA Compliance",
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
