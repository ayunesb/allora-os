"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyDetails = CompanyDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var company_details_1 = require("@/components/onboarding/company-details");
function CompanyDetails(_a) {
  var companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails,
    onNext = _a.onNext;
  return (0, jsx_runtime_1.jsx)(company_details_1.CompanyDetailsSurvey, {
    companyDetails: companyDetails,
    updateCompanyDetails: updateCompanyDetails,
    onNext: onNext,
  });
}
