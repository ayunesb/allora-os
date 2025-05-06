"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandIdentity = BrandIdentity;
var jsx_runtime_1 = require("react/jsx-runtime");
var BrandIdentityForm_1 = require("../BrandIdentityForm");
function BrandIdentity(_a) {
  var companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium",
            children: "Brand Identity",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground mt-1",
            children:
              "Help us understand your brand style and visual identity.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(BrandIdentityForm_1.BrandIdentityForm, {
        companyDetails: companyDetails,
        updateCompanyDetails: updateCompanyDetails,
      }),
    ],
  });
}
