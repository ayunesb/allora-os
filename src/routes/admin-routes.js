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
exports.adminRoutes = void 0;
var react_1 = require("react");
var AdminGuard_1 = require("@/guards/AdminGuard");
var loading_1 = require("@/components/ui/loading");
var LazyAdminDashboard = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/admin/AdminDashboard");
  });
});
exports.adminRoutes = [
  {
    path: "admin",
    element: react_1.default.createElement(
      AdminGuard_1.default,
      null,
      react_1.default.createElement(
        react_1.default.Suspense,
        { fallback: react_1.default.createElement(loading_1.default) },
        react_1.default.createElement(LazyAdminDashboard),
      ),
    ),
    lazy: function () {
      return __awaiter(this, void 0, void 0, function () {
        var AdminLayout;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                Promise.resolve().then(function () {
                  return require("@/components/layouts/AdminLayout");
                }),
              ];
            case 1:
              AdminLayout = _a.sent().default;
              return [2 /*return*/, { Component: AdminLayout }];
          }
        });
      });
    },
    children: [
      {
        index: true,
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var AdminDashboard;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/AdminDashboard");
                    }),
                  ];
                case 1:
                  AdminDashboard = _a.sent().default;
                  return [2 /*return*/, { Component: AdminDashboard }];
              }
            });
          });
        },
      },
      {
        path: "entities",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var AdminEntities;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/AdminEntities");
                    }),
                  ];
                case 1:
                  AdminEntities = _a.sent().default;
                  return [2 /*return*/, { Component: AdminEntities }];
              }
            });
          });
        },
      },
      {
        path: "users",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var AdminUsers;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/AdminUsers");
                    }),
                  ];
                case 1:
                  AdminUsers = _a.sent().default;
                  return [2 /*return*/, { Component: AdminUsers }];
              }
            });
          });
        },
      },
      {
        path: "companies",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var AdminCompanies;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/AdminCompanies");
                    }),
                  ];
                case 1:
                  AdminCompanies = _a.sent().default;
                  return [2 /*return*/, { Component: AdminCompanies }];
              }
            });
          });
        },
      },
      {
        path: "settings",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var AdminSettings;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/AdminSettings");
                    }),
                  ];
                case 1:
                  AdminSettings = _a.sent().default;
                  return [2 /*return*/, { Component: AdminSettings }];
              }
            });
          });
        },
      },
      {
        path: "webhooks",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var AdminWebhooks;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/AdminWebhooks");
                    }),
                  ];
                case 1:
                  AdminWebhooks = _a.sent().default;
                  return [2 /*return*/, { Component: AdminWebhooks }];
              }
            });
          });
        },
      },
      {
        path: "system-health",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var AdminSystemHealth;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/SystemHealth");
                    }),
                  ];
                case 1:
                  AdminSystemHealth = _a.sent().default;
                  return [2 /*return*/, { Component: AdminSystemHealth }];
              }
            });
          });
        },
      },
      {
        path: "diagnostics",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var SystemPage;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/system");
                    }),
                  ];
                case 1:
                  SystemPage = _a.sent().default;
                  return [2 /*return*/, { Component: SystemPage }];
              }
            });
          });
        },
      },
      {
        path: "launch-prep",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var AdminLaunchPrep;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/AdminLaunchPrep");
                    }),
                  ];
                case 1:
                  AdminLaunchPrep = _a.sent().default;
                  return [2 /*return*/, { Component: AdminLaunchPrep }];
              }
            });
          });
        },
      },
      {
        path: "campaigns",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var AdminCampaigns;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/AdminCampaigns");
                    }),
                  ];
                case 1:
                  AdminCampaigns = _a.sent().default;
                  return [2 /*return*/, { Component: AdminCampaigns }];
              }
            });
          });
        },
      },
      {
        path: "analytics",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var AdminAnalytics;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/AdminAnalytics");
                    }),
                  ];
                case 1:
                  AdminAnalytics = _a.sent().default;
                  return [2 /*return*/, { Component: AdminAnalytics }];
              }
            });
          });
        },
      },
      {
        path: "leads",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var AdminLeads;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/AdminLeads");
                    }),
                  ];
                case 1:
                  AdminLeads = _a.sent().default;
                  return [2 /*return*/, { Component: AdminLeads }];
              }
            });
          });
        },
      },
      {
        path: "notion-integration",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var NotionIntegration;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/NotionIntegration");
                    }),
                  ];
                case 1:
                  NotionIntegration = _a.sent().default;
                  return [2 /*return*/, { Component: NotionIntegration }];
              }
            });
          });
        },
      },
      {
        path: "stripe-integration",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var StripeIntegration;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/StripeIntegration");
                    }),
                  ];
                case 1:
                  StripeIntegration = _a.sent().default;
                  return [2 /*return*/, { Component: StripeIntegration }];
              }
            });
          });
        },
      },
      {
        path: "clearbit-integration",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var ClearbitIntegration;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/ClearbitIntegration");
                    }),
                  ];
                case 1:
                  ClearbitIntegration = _a.sent().default;
                  return [2 /*return*/, { Component: ClearbitIntegration }];
              }
            });
          });
        },
      },
      {
        path: "calendly-integration",
        lazy: function () {
          return __awaiter(this, void 0, void 0, function () {
            var CalendlyIntegration;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  return [
                    4 /*yield*/,
                    Promise.resolve().then(function () {
                      return require("@/pages/admin/CalendlyIntegration");
                    }),
                  ];
                case 1:
                  CalendlyIntegration = _a.sent().default;
                  return [2 /*return*/, { Component: CalendlyIntegration }];
              }
            });
          });
        },
      },
    ],
  },
];
exports.default = exports.adminRoutes;
