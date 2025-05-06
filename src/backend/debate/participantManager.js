"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialParticipants = void 0;
var executiveBots_1 = require("../executiveBots");
var consultation_1 = require("@/utils/consultation");
// Initialize debate participants from executive bots
var getInitialParticipants = function (count) {
  if (count === void 0) {
    count = 4;
  }
  return Object.entries(executiveBots_1.executiveBots)
    .slice(0, count) // Start with top roles
    .map(function (_a, index) {
      var role = _a[0],
        names = _a[1];
      return {
        id: "bot-".concat(index + 1),
        name: names[0], // Take first name from each role
        role: role,
        title: (0, consultation_1.formatRoleTitle)(role),
        specialty: (0, consultation_1.getBotExpertise)(role),
        avatar: "/avatars/".concat(
          names[0].toLowerCase().replace(/\s+/g, "-"),
          ".png",
        ),
      };
    });
};
exports.getInitialParticipants = getInitialParticipants;
