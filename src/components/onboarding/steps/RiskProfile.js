"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiskProfile = RiskProfile;
var jsx_runtime_1 = require("react/jsx-runtime");
var RiskProfileForm_1 = require("@/components/onboarding/RiskProfileForm");
function RiskProfile(_a) {
  var riskAppetite = _a.riskAppetite,
    setRiskAppetite = _a.setRiskAppetite,
    executiveTeamEnabled = _a.executiveTeamEnabled,
    setExecutiveTeamEnabled = _a.setExecutiveTeamEnabled,
    companyName = _a.companyName;
  return (0, jsx_runtime_1.jsx)(RiskProfileForm_1.default, {
    riskAppetite: riskAppetite,
    setRiskAppetite: setRiskAppetite,
    executiveTeamEnabled: executiveTeamEnabled,
    setExecutiveTeamEnabled: setExecutiveTeamEnabled,
    companyName: companyName,
  });
}
