"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestCompany =
  exports.getTestCompany =
  exports.runTestCompanySetup =
    void 0;
// Re-export the function from the new location
var test_1 = require("@/utils/company/test");
Object.defineProperty(exports, "runTestCompanySetup", {
  enumerable: true,
  get: function () {
    return test_1.runTestCompanySetup;
  },
});
Object.defineProperty(exports, "getTestCompany", {
  enumerable: true,
  get: function () {
    return test_1.getTestCompany;
  },
});
Object.defineProperty(exports, "createTestCompany", {
  enumerable: true,
  get: function () {
    return test_1.createTestCompany;
  },
});
