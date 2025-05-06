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
var glob_1 = require("glob");
var baseUrl = "https://your-api-url.com"; // Replace with your API base URL
var collection = {
  info: {
    name: "Allora API Endpoints",
    schema:
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  item: [],
};
function generate() {
  return __awaiter(this, void 0, void 0, function () {
    var apiFiles,
      supabaseFunctions,
      allFiles,
      _i,
      allFiles_1,
      file,
      content,
      matches,
      endpoint,
      _a,
      matches_1,
      _b,
      route;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/, (0, glob_1.glob)("src/api/**/*.ts")];
        case 1:
          apiFiles = _c.sent();
          return [4 /*yield*/, (0, glob_1.glob)("supabase/functions/**/*.ts")];
        case 2:
          supabaseFunctions = _c.sent();
          allFiles = __spreadArray(
            __spreadArray([], apiFiles, true),
            supabaseFunctions,
            true,
          );
          for (_i = 0, allFiles_1 = allFiles; _i < allFiles_1.length; _i++) {
            file = allFiles_1[_i];
            content = fs_1.default.readFileSync(file, "utf-8");
            matches = __spreadArray(
              [],
              content.matchAll(/(?:GET|POST|PUT|DELETE)\s*['"`](.*?)['"`]/gi),
              true,
            );
            endpoint = file
              .replace(/^.*\/(api|functions)\//, "")
              .replace(/\.ts$/, "");
            for (_a = 0, matches_1 = matches; _a < matches_1.length; _a++) {
              (_b = matches_1[_a]), (route = _b[1]);
              collection.item.push({
                name: "".concat(endpoint, " - ").concat(route),
                request: {
                  method: matches[0][0], // Extracted HTTP verb
                  url: {
                    raw: "".concat(baseUrl).concat(route),
                    host: [baseUrl],
                    path: route.split("/"),
                  },
                  header: [],
                },
              });
            }
          }
          fs_1.default.writeFileSync(
            "postman-collection.json",
            JSON.stringify(collection, null, 2),
          );
          console.log("✅ postman-collection.json generated.");
          return [2 /*return*/];
      }
    });
  });
}
generate();
