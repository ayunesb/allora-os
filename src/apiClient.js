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
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardingRoutes = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var withSuspense_1 = require("@/utils/withSuspense"); // Assuming this utility exists
exports.onboardingRoutes = [
  {
    path: "onboarding",
    lazy: function () {
      return __awaiter(this, void 0, void 0, function () {
        var OnboardingLayout, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              return [
                4 /*yield*/,
                Promise.resolve().then(function () {
                  return require("@/layouts/OnboardingLayout");
                }),
              ];
            case 1:
              OnboardingLayout = _a.sent().default;
              return [
                2 /*return*/,
                {
                  element: (0, withSuspense_1.default)(
                    (0, jsx_runtime_1.jsx)(OnboardingLayout, {}),
                  ),
                },
              ];
            case 2:
              error_1 = _a.sent();
              console.error(
                error_1 instanceof Error ? error_1.message : "Unknown error",
              );
              throw error_1;
            case 3:
              return [2 /*return*/];
          }
        });
      });
    },
    children: [
      {
        index: true,
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var OnboardingWelcome, error_2;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2, , 3]);
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/onboarding/OnboardingWelcome");
                    }),
                  ];
                case 1:
                  OnboardingWelcome = _a.sent().default;
                  return [
                    2 /*return*/,
                    {
                      element: (0, withSuspense_1.default)(
                        (0, jsx_runtime_1.jsx)(OnboardingWelcome, {}),
                      ),
                    },
                  ];
                case 2:
                  error_2 = _a.sent();
                  console.error(
                    error_2 instanceof Error
                      ? error_2.message
                      : "Unknown error",
                  );
                  throw error_2;
                case 3:
                  return [2 /*return*/];
              }
            });
          });
        },
      },
      {
        path: "profile",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var OnboardingProfile, error_3;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2, , 3]);
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/onboarding/OnboardingProfile");
                    }),
                  ];
                case 1:
                  OnboardingProfile = _a.sent().default;
                  return [
                    2 /*return*/,
                    {
                      element: (0, withSuspense_1.default)(
                        (0, jsx_runtime_1.jsx)(OnboardingProfile, {}),
                      ),
                    },
                  ];
                case 2:
                  error_3 = _a.sent();
                  console.error(
                    error_3 instanceof Error
                      ? error_3.message
                      : "Unknown error",
                  );
                  throw error_3;
                case 3:
                  return [2 /*return*/];
              }
            });
          });
        },
      },
      {
        path: "company",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var OnboardingCompany, error_4;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2, , 3]);
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/onboarding/OnboardingCompany");
                    }),
                  ];
                case 1:
                  OnboardingCompany = _a.sent().default;
                  return [
                    2 /*return*/,
                    {
                      element: (0, withSuspense_1.default)(
                        (0, jsx_runtime_1.jsx)(OnboardingCompany, {}),
                      ),
                    },
                  ];
                case 2:
                  error_4 = _a.sent();
                  console.error(
                    error_4 instanceof Error
                      ? error_4.message
                      : "Unknown error",
                  );
                  throw error_4;
                case 3:
                  return [2 /*return*/];
              }
            });
          });
        },
      },
      {
        path: "team",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var OnboardingTeam, error_5;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2, , 3]);
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/onboarding/OnboardingTeam");
                    }),
                  ];
                case 1:
                  OnboardingTeam = _a.sent().default;
                  return [
                    2 /*return*/,
                    {
                      element: (0, withSuspense_1.default)(
                        (0, jsx_runtime_1.jsx)(OnboardingTeam, {}),
                      ),
                    },
                  ];
                case 2:
                  error_5 = _a.sent();
                  console.error(
                    error_5 instanceof Error
                      ? error_5.message
                      : "Unknown error",
                  );
                  throw error_5;
                case 3:
                  return [2 /*return*/];
              }
            });
          });
        },
      },
      {
        path: "integrations",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var OnboardingIntegrations, error_6;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2, , 3]);
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/onboarding/OnboardingIntegrations");
                    }),
                  ];
                case 1:
                  OnboardingIntegrations = _a.sent().default;
                  return [
                    2 /*return*/,
                    {
                      element: (0, withSuspense_1.default)(
                        (0, jsx_runtime_1.jsx)(OnboardingIntegrations, {}),
                      ),
                    },
                  ];
                case 2:
                  error_6 = _a.sent();
                  console.error(
                    error_6 instanceof Error
                      ? error_6.message
                      : "Unknown error",
                  );
                  throw error_6;
                case 3:
                  return [2 /*return*/];
              }
            });
          });
        },
      },
      {
        path: "ai-workflow",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var OnboardingAIWorkflow, error_7;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2, , 3]);
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/onboarding/OnboardingAIWorkflow");
                    }),
                  ];
                case 1:
                  OnboardingAIWorkflow = _a.sent().default;
                  return [
                    2 /*return*/,
                    {
                      element: (0, withSuspense_1.default)(
                        (0, jsx_runtime_1.jsx)(OnboardingAIWorkflow, {}),
                      ),
                    },
                  ];
                case 2:
                  error_7 = _a.sent();
                  console.error(
                    error_7 instanceof Error
                      ? error_7.message
                      : "Unknown error",
                  );
                  throw error_7;
                case 3:
                  return [2 /*return*/];
              }
            });
          });
        },
      },
      {
        path: "complete",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var OnboardingComplete, error_8;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  _a.trys.push([0, 2, , 3]);
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/onboarding/OnboardingComplete");
                    }),
                  ];
                case 1:
                  OnboardingComplete = _a.sent().default;
                  return [
                    2 /*return*/,
                    {
                      element: (0, withSuspense_1.default)(
                        (0, jsx_runtime_1.jsx)(OnboardingComplete, {}),
                      ),
                    },
                  ];
                case 2:
                  error_8 = _a.sent();
                  console.error(
                    error_8 instanceof Error
                      ? error_8.message
                      : "Unknown error",
                  );
                  throw error_8;
                case 3:
                  return [2 /*return*/];
              }
            });
          });
        },
      },
    ],
  },
];
exports.default = exports.onboardingRoutes;
