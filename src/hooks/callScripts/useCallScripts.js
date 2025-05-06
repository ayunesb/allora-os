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
exports.useCallScripts = void 0;
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var client_1 = require("@/integrations/supabase/client");
var useCallScripts = function () {
  var _a = (0, react_1.useState)([]),
    scripts = _a[0],
    setScripts = _a[1];
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    error = _c[0],
    setError = _c[1];
  var profile = (0, AuthContext_1.useAuth)().profile;
  var generateScript = function (params) {
    return __awaiter(void 0, void 0, void 0, function () {
      var companyName,
        industryName,
        _a,
        data,
        error_1,
        _b,
        savedScript_1,
        saveError,
        err_1;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            setIsLoading(true);
            setError(null);
            _c.label = 1;
          case 1:
            _c.trys.push([1, 4, 5, 6]);
            companyName =
              (profile === null || profile === void 0
                ? void 0
                : profile.company) || "your company";
            industryName =
              (profile === null || profile === void 0
                ? void 0
                : profile.industry) ||
              params.industry ||
              "your industry";
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("generate-call-script", {
                body: {
                  company: companyName,
                  industry: industryName,
                  scriptType: params.scriptType,
                  companySize:
                    typeof params.companySize === "number"
                      ? params.companySize.toString()
                      : params.companySize || "Small",
                  productName: params.productName || "our product",
                  targetAudience:
                    params.targetAudience || "potential customers",
                },
              }),
            ];
          case 2:
            (_a = _c.sent()), (data = _a.data), (error_1 = _a.error);
            if (error_1) throw error_1;
            return [
              4 /*yield*/,
              client_1.supabase
                .from("ai_communication_scripts")
                .insert({
                  content: data.script,
                  script_type: params.scriptType,
                  company_id:
                    profile === null || profile === void 0
                      ? void 0
                      : profile.company_id,
                  executive_bot: "Sales Director",
                })
                .select()
                .single(),
            ];
          case 3:
            (_b = _c.sent()), (savedScript_1 = _b.data), (saveError = _b.error);
            if (saveError) throw saveError;
            // Update local state
            setScripts(function (prev) {
              return __spreadArray([savedScript_1], prev, true);
            });
            return [2 /*return*/, savedScript_1];
          case 4:
            err_1 = _c.sent();
            console.error("Error generating script:", err_1);
            setError(err_1.message || "Failed to generate script");
            return [2 /*return*/, null];
          case 5:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  var fetchScripts = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a, data, error_2, err_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (
              !(profile === null || profile === void 0
                ? void 0
                : profile.company_id)
            )
              return [2 /*return*/];
            setIsLoading(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase
                .from("ai_communication_scripts")
                .select("*")
                .eq("company_id", profile.company_id)
                .order("created_at", { ascending: false }),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error_2 = _a.error);
            if (error_2) throw error_2;
            setScripts(data);
            return [3 /*break*/, 5];
          case 3:
            err_2 = _b.sent();
            console.error("Error fetching scripts:", err_2);
            setError(err_2.message || "Failed to fetch scripts");
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  (0, react_1.useEffect)(
    function () {
      fetchScripts();
    },
    [profile === null || profile === void 0 ? void 0 : profile.company_id],
  );
  return {
    scripts: scripts,
    isLoading: isLoading,
    error: error,
    generateScript: generateScript,
    fetchScripts: fetchScripts,
  };
};
exports.useCallScripts = useCallScripts;
