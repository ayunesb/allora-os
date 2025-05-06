"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotByNameAndRole = getBotByNameAndRole;
var executiveBots_1 = require("@/backend/executiveBots");
var botRoleUtils_1 = require("./botRoleUtils");
function getBotByNameAndRole(name, role) {
  // Validate that this bot exists in our roster
  var roleExists = Object.keys(executiveBots_1.executiveBots).includes(role);
  var nameExists =
    roleExists && executiveBots_1.executiveBots[role].includes(name);
  if (!nameExists) {
    return null;
  }
  return {
    name: name,
    role: role,
    title: (0, botRoleUtils_1.formatRoleTitle)(role),
    expertise: (0, botRoleUtils_1.getBotExpertise)(role),
  };
}
