"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var audit = JSON.parse(fs_1.default.readFileSync("route-audit.json", "utf-8"));
console.log("\n🧹 Duplicate Routes:\n");
for (var _i = 0, _a = audit.duplicateRoutes || []; _i < _a.length; _i++) {
  var _b = _a[_i],
    route = _b.route,
    files = _b.files;
  console.log("\u2192 ".concat(route, " (in: ").concat(files.join(", "), ")"));
}
console.log("\n🧼 Unused Routes:\n");
for (var _c = 0, _d = audit.unusedRoutes || []; _c < _d.length; _c++) {
  var _e = _d[_c],
    route = _e.route,
    files = _e.files;
  console.log("\u2192 ".concat(route, " (in: ").concat(files.join(", "), ")"));
}
