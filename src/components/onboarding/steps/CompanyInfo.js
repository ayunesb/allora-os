"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyInfo = CompanyInfo;
var jsx_runtime_1 = require("react/jsx-runtime");
var CompanyInfoForm_1 = require("@/components/onboarding/CompanyInfoForm");
function CompanyInfo(_a) {
  var companyName = _a.companyName,
    setCompanyName = _a.setCompanyName,
    companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails,
    errorMessage = _a.errorMessage;
  return (0, jsx_runtime_1.jsx)(CompanyInfoForm_1.default, {
    companyName: companyName,
    setCompanyName: setCompanyName,
    companyDetails: companyDetails,
    updateCompanyDetails: updateCompanyDetails,
    error: (
      errorMessage === null || errorMessage === void 0
        ? void 0
        : errorMessage.includes("company")
    )
      ? errorMessage
      : undefined,
  });
}
