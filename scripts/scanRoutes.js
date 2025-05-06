"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
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
var fs_1 = require("fs");
var path_1 = require("path");
var glob_1 = require("glob");
var args = process.argv.slice(2);
var outputJson = args.includes("--json");
var routesDir = path_1.default.resolve("src/routes");
var routerFile = path_1.default.resolve("src/AppRoutes.tsx");
function scanRoutes() {
  return __awaiter(this, void 0, void 0, function () {
    var files,
      routerContents,
      routerMatches,
      routerPaths,
      allRoutes,
      duplicateRoutes,
      _loop_1,
      _i,
      files_1,
      file,
      isWildcardOrDynamic,
      unusedRoutes,
      duplicateRouteList;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            (0, glob_1.glob)("".concat(routesDir, "/**/*.{ts,tsx}")),
          ];
        case 1:
          files = _a.sent();
          routerContents = fs_1.default.readFileSync(routerFile, "utf-8");
          routerMatches = __spreadArray(
            __spreadArray(
              [],
              routerContents.matchAll(/path:\s*["'`](.*?)["'`]/g),
              true,
            ),
            routerContents.matchAll(/<Route\s+path=["'`](.*?)["'`]/g),
            true,
          );
          routerPaths = new Set(
            routerMatches.map(function (_a) {
              var route = _a[1];
              return route;
            }),
          );
          allRoutes = new Map();
          duplicateRoutes = new Set();
          _loop_1 = function (file) {
            var contents = fs_1.default.readFileSync(file, "utf-8");
            var matches = __spreadArray(
              __spreadArray(
                [],
                contents.matchAll(/path:\s*["'`](.*?)["'`]/g),
                true,
              ),
              contents.matchAll(/<Route\s+path=["'`](.*?)["'`]/g),
              true,
            );
            matches.forEach(function (_a) {
              var routePath = _a[1];
              if (!routePath || routePath.trim() === "") return;
              var existing = allRoutes.get(routePath) || [];
              existing.push(file);
              allRoutes.set(routePath, existing);
              if (existing.length > 1) duplicateRoutes.add(routePath);
            });
          };
          for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
            file = files_1[_i];
            _loop_1(file);
          }
          isWildcardOrDynamic = function (r) {
            return r === "*" || r.includes(":") || r.startsWith("/:");
          };
          unusedRoutes = Array.from(allRoutes.entries())
            .filter(function (_a) {
              var route = _a[0];
              return !routerPaths.has(route) && !isWildcardOrDynamic(route);
            })
            .map(function (_a) {
              var route = _a[0],
                files = _a[1];
              return { route: route, files: files };
            });
          duplicateRouteList = Array.from(duplicateRoutes).map(
            function (route) {
              return {
                route: route,
                files: allRoutes.get(route) || [],
              };
            },
          );
          // Output
          if (outputJson) {
            fs_1.default.writeFileSync(
              "route-audit.json",
              JSON.stringify(
                {
                  unusedRoutes: unusedRoutes,
                  duplicateRoutes: duplicateRouteList,
                },
                null,
                2,
              ),
            );
            console.log("✅ route-audit.json generated.");
          } else {
            console.log("\n\uD83D\uDD0D Analysis Results:\n");
            if (unusedRoutes.length > 0) {
              console.log("\u274C Unused Routes:");
              unusedRoutes.forEach(function (_a) {
                var route = _a.route,
                  files = _a.files;
                return console.log(
                  "   \u2192 "
                    .concat(route, " (in: ")
                    .concat(files.join(", "), ")"),
                );
              });
            } else {
              console.log("✅ No unused routes found.");
            }
            if (duplicateRouteList.length > 0) {
              console.log("\n\u26A0\uFE0F Duplicate Routes:");
              duplicateRouteList.forEach(function (_a) {
                var route = _a.route,
                  files = _a.files;
                return console.log(
                  "   \u2192 "
                    .concat(route, " (in: ")
                    .concat(files.join(", "), ")"),
                );
              });
            } else {
              console.log("✅ No duplicate routes found.");
            }
            // Summary
            console.log("\n\uD83D\uDCCA Summary:");
            console.log("   Total unused routes: ".concat(unusedRoutes.length));
            console.log(
              "   Total duplicate routes: ".concat(duplicateRouteList.length),
            );
          }
          return [2 /*return*/];
      }
    });
  });
}
scanRoutes();
