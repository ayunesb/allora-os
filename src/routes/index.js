"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
// Export all the routes from the respective files
__exportStar(require("./admin-routes"), exports);
__exportStar(require("./auth-routes"), exports);
__exportStar(require("./dashboard-routes"), exports);
__exportStar(require("./onboarding-routes"), exports);
__exportStar(require("./marketing-routes"), exports);
__exportStar(require("./dev-routes"), exports);
__exportStar(require("./global-routes"), exports);
__exportStar(require("./galaxy-routes"), exports);
__exportStar(require("./academy-routes"), exports);
__exportStar(require("./vault-routes"), exports);
// Export the AppRoutes component that uses all these routes
var AppRoutes_1 = require("./AppRoutes");
Object.defineProperty(exports, "AppRoutes", {
  enumerable: true,
  get: function () {
    return AppRoutes_1.AppRoutes;
  },
});
