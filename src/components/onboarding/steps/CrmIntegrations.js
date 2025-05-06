"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmIntegrations = CrmIntegrations;
var jsx_runtime_1 = require("react/jsx-runtime");
var CrmIntegrationsForm_1 = require("../CrmIntegrationsForm");
function CrmIntegrations(_a) {
  var companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails;
  return (0, jsx_runtime_1.jsx)(CrmIntegrationsForm_1.CrmIntegrationsForm, {
    companyDetails: companyDetails,
    updateCompanyDetails: updateCompanyDetails,
  });
}
