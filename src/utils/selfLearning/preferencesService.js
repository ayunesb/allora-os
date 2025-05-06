"use strict";
/**
 * User preferences management - Main entry point
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLearningInsights =
  exports.updateUserPreferences =
  exports.getUserPreferences =
    void 0;
var getUserPreferences_1 = require("./preferences/getUserPreferences");
Object.defineProperty(exports, "getUserPreferences", {
  enumerable: true,
  get: function () {
    return getUserPreferences_1.getUserPreferences;
  },
});
var updateUserPreferences_1 = require("./preferences/updateUserPreferences");
Object.defineProperty(exports, "updateUserPreferences", {
  enumerable: true,
  get: function () {
    return updateUserPreferences_1.updateUserPreferences;
  },
});
var getLearningInsights_1 = require("./insights/getLearningInsights");
Object.defineProperty(exports, "getLearningInsights", {
  enumerable: true,
  get: function () {
    return getLearningInsights_1.getLearningInsights;
  },
});
