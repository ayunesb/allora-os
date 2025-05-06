"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CertificationsList;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var CertificationCard_1 = require("./CertificationCard");
var mockData_1 = require("./mockData");
function CertificationsList() {
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "mt-8",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Certifications",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Current compliance certifications",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
          children: mockData_1.certifications.map(function (cert) {
            return (0, jsx_runtime_1.jsx)(
              CertificationCard_1.default,
              {
                title: cert.title,
                validUntil: cert.validUntil,
                iconUrl: cert.iconUrl,
                alt: cert.alt,
              },
              cert.id,
            );
          }),
        }),
      }),
    ],
  });
}
