"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Industry = Industry;
var jsx_runtime_1 = require("react/jsx-runtime");
var IndustryForm_1 = require("@/components/onboarding/IndustryForm");
function Industry(_a) {
  var industry = _a.industry,
    setIndustry = _a.setIndustry,
    errorMessage = _a.errorMessage;
  return (0, jsx_runtime_1.jsx)(IndustryForm_1.default, {
    industry: industry,
    setIndustry: setIndustry,
    error: (
      errorMessage === null || errorMessage === void 0
        ? void 0
        : errorMessage.includes("industry")
    )
      ? errorMessage
      : undefined,
  });
}
