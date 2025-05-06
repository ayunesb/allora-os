"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutiveTeam = ExecutiveTeam;
var jsx_runtime_1 = require("react/jsx-runtime");
var ExecutiveTeamIntro_1 = require("@/components/onboarding/ExecutiveTeamIntro");
function ExecutiveTeam(_a) {
  var executiveTeamEnabled = _a.executiveTeamEnabled,
    setExecutiveTeamEnabled = _a.setExecutiveTeamEnabled,
    riskAppetite = _a.riskAppetite,
    companyName = _a.companyName,
    onComplete = _a.onComplete,
    isLoading = _a.isLoading;
  // Ensure that onComplete is being passed correctly to the ExecutiveTeamIntro component
  return (0, jsx_runtime_1.jsx)(ExecutiveTeamIntro_1.default, {
    executiveTeamEnabled: executiveTeamEnabled,
    setExecutiveTeamEnabled: setExecutiveTeamEnabled,
    riskAppetite: riskAppetite,
    companyName: companyName,
    onComplete: onComplete,
    isLoading: isLoading,
  });
}
