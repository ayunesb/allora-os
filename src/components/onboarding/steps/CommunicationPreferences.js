"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationPreferences = CommunicationPreferences;
var jsx_runtime_1 = require("react/jsx-runtime");
var CommunicationPreferencesForm_1 = require("../CommunicationPreferencesForm");
function CommunicationPreferences(_a) {
  var companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails;
  return (0, jsx_runtime_1.jsx)(
    CommunicationPreferencesForm_1.CommunicationPreferencesForm,
    {
      companyDetails: companyDetails,
      updateCompanyDetails: updateCompanyDetails,
    },
  );
}
