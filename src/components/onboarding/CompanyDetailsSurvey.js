"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CompanyDetailsSurvey;
var jsx_runtime_1 = require("react/jsx-runtime");
var company_details_1 = require("./company-details");
// This component is just a wrapper that forwards to the refactored implementation
// to maintain backward compatibility with existing code
function CompanyDetailsSurvey(_a) {
  var companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails,
    error = _a.error,
    onNext = _a.onNext;
  return (0, jsx_runtime_1.jsx)(company_details_1.CompanyDetailsSurvey, {
    companyDetails: companyDetails,
    updateCompanyDetails: updateCompanyDetails,
    error: error,
    onNext: onNext,
  });
}
