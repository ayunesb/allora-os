"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Reports;
var jsx_runtime_1 = require("react/jsx-runtime");
var tabs_1 = require("@/components/ui/tabs");
var ReportsList_1 = require("@/components/compliance/reports/ReportsList");
var CertificationsList_1 = require("@/components/compliance/reports/CertificationsList");
var DocumentVersionTracker_1 = require("@/components/compliance/reports/DocumentVersionTracker");
var card_1 = require("@/components/ui/card");
// Mock reports data
var mockReports = [
  {
    id: "1",
    title: "GDPR Compliance Audit",
    type: "Regulatory Compliance",
    date: "April 5, 2025",
    status: "completed",
  },
  {
    id: "2",
    title: "Data Security Assessment",
    type: "Security Audit",
    date: "March 15, 2025",
    status: "completed",
  },
  {
    id: "3",
    title: "CCPA Compliance Check",
    type: "Regulatory Compliance",
    date: "May 10, 2025",
    status: "scheduled",
  },
  {
    id: "4",
    title: "Privacy Policy Review",
    type: "Document Review",
    date: "April 20, 2025",
    status: "scheduled",
  },
  {
    id: "5",
    title: "Annual Security Review",
    type: "Security Audit",
    date: "June 1, 2025",
    status: "scheduled",
  },
];
function Reports() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              className: "text-xl",
              children: "Compliance Reports",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children:
                "View and generate compliance reports and certifications",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            defaultValue: "reports",
            className: "w-full",
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "mb-4",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "reports",
                    children: "Compliance Reports",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "certifications",
                    children: "Certifications",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "documents",
                    children: "Document History",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "reports",
                children: (0, jsx_runtime_1.jsx)(ReportsList_1.default, {
                  reports: mockReports,
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "certifications",
                children: (0, jsx_runtime_1.jsx)(
                  CertificationsList_1.default,
                  {},
                ),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "documents",
                children: (0, jsx_runtime_1.jsx)(
                  DocumentVersionTracker_1.default,
                  {},
                ),
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
