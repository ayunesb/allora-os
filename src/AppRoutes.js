"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
var explore_routes_1 = require("./routes/explore-routes");
var other_routes_1 = require("./routes/other-routes");
exports.allRoutes = __spreadArray(
  __spreadArray([], explore_routes_1.exploreRoutes, true),
  other_routes_1.otherRoutes,
  true,
);
