"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOnboardingStatus = exports.saveOnboardingInfo = void 0;
// This file is kept for backward compatibility
// New code should import directly from @/utils/onboarding
var onboarding_1 = require("./onboarding");
Object.defineProperty(exports, "saveOnboardingInfo", {
  enumerable: true,
  get: function () {
    return onboarding_1.saveOnboardingInfo;
  },
});
Object.defineProperty(exports, "checkOnboardingStatus", {
  enumerable: true,
  get: function () {
    return onboarding_1.checkOnboardingStatus;
  },
});
