"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotSpecialSkill = getBotSpecialSkill;
var botSpecialSkills = {
  ceo: "visionary",
  coo: "ops",
  admin: "manageUsers",
  moderator: "banUsers",
  user: "postMessages",
};
function getBotSpecialSkill(role) {
  return botSpecialSkills[role];
}
