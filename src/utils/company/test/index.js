"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestCompany =
  exports.ensureTestCompanyExists =
  exports.testCompanyExists =
  exports.getTestCompany =
  exports.runTestCompanySetup =
    void 0;
var testCompanySetup_1 = require("./testCompanySetup");
Object.defineProperty(exports, "runTestCompanySetup", {
  enumerable: true,
  get: function () {
    return testCompanySetup_1.runTestCompanySetup;
  },
});
var testCompanyQueries_1 = require("./testCompanyQueries");
Object.defineProperty(exports, "getTestCompany", {
  enumerable: true,
  get: function () {
    return testCompanyQueries_1.getTestCompany;
  },
});
Object.defineProperty(exports, "testCompanyExists", {
  enumerable: true,
  get: function () {
    return testCompanyQueries_1.testCompanyExists;
  },
});
Object.defineProperty(exports, "ensureTestCompanyExists", {
  enumerable: true,
  get: function () {
    return testCompanyQueries_1.ensureTestCompanyExists;
  },
});
var testCompanyCreation_1 = require("./testCompanyCreation");
Object.defineProperty(exports, "createTestCompany", {
  enumerable: true,
  get: function () {
    return testCompanyCreation_1.createTestCompany;
  },
});
