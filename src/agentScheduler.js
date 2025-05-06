"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
var botExampleActions = {
  id: "botExampleActions",
  name: "Example Bot Actions",
  personality: "analytical", // or validate against the enum
  actions: [
    // ...existing code...
  ],
  riskLevel: "Medium", // Fixed riskLevel
};
var botOutputLocations = {
  id: "botOutputLocations",
  name: "Output Locations Bot",
  personality: "analytical", // or validate against the enum
  actions: [
    // ...existing code...
  ],
  riskLevel: "Medium", // Fixed riskLevel
};
var personalityXpMap = {
  analytical: 10,
  creative: 8,
  diplomatic: 7,
  aggressive: 12,
  cautious: 6,
};
// Define the executive object with a valid personality
var executive = {
  id: "executiveAgent",
  name: "Executive Agent",
  personality: "analytical", // ✅ Matches the union type
  actions: [],
  riskLevel: "Medium", // Fixed riskLevel
};
var xp = personalityXpMap[executive.personality];
var task = selectTaskForExecutive(
  __assign(__assign({}, executive), { personality: executive.personality }),
);
// Repeat this fix for similar objects like botExampleActions, botOutputLocations, etc.
