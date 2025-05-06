"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executiveTeam = void 0;
exports.getExecutiveById = getExecutiveById;
exports.getExecutiveByTitle = getExecutiveByTitle;
var chiefExecutiveOfficer_1 = require("./chiefExecutiveOfficer");
var chiefFinancialOfficer_1 = require("./chiefFinancialOfficer");
var chiefMarketingOfficer_1 = require("./chiefMarketingOfficer");
var chiefOperationsOfficer_1 = require("./chiefOperationsOfficer");
var chiefProductOfficer_1 = require("./chiefProductOfficer");
var chiefSalesOfficer_1 = require("./chiefSalesOfficer");
var chiefTechnologyOfficer_1 = require("./chiefTechnologyOfficer");
var chiefDataOfficer_1 = require("./chiefDataOfficer");
var chiefRiskOfficer_1 = require("./chiefRiskOfficer");
exports.executiveTeam = [
  chiefExecutiveOfficer_1.chiefExecutiveOfficer,
  chiefFinancialOfficer_1.chiefFinancialOfficer,
  chiefMarketingOfficer_1.chiefMarketingOfficer,
  chiefOperationsOfficer_1.chiefOperationsOfficer,
  chiefProductOfficer_1.chiefProductOfficer,
  chiefSalesOfficer_1.chiefSalesOfficer,
  chiefTechnologyOfficer_1.chiefTechnologyOfficer,
  chiefDataOfficer_1.chiefDataOfficer,
  chiefRiskOfficer_1.chiefRiskOfficer,
];
// Helper function to get an executive by ID
function getExecutiveById(id) {
  return exports.executiveTeam.find(function (exec) {
    return exec.id === id;
  });
}
// Helper function to get an executive by title
function getExecutiveByTitle(title) {
  return exports.executiveTeam.find(function (exec) {
    return (
      exec.title.toLowerCase() === title.toLowerCase() ||
      exec.shortTitle.toLowerCase() === title.toLowerCase()
    );
  });
}
