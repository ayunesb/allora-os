"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var react_router_dom_1 = require("react-router-dom");
var CookieConsent = function () {
  var _a = (0, react_1.useState)(false),
    open = _a[0],
    setOpen = _a[1];
  var _b = (0, react_1.useState)({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    }),
    settings = _b[0],
    setSettings = _b[1];
  var _c = (0, react_1.useState)(false),
    hasConsented = _c[0],
    setHasConsented = _c[1];
  var _d = (0, react_1.useState)(false),
    isEU = _d[0],
    setIsEU = _d[1];
  (0, react_1.useEffect)(function () {
    // Check for existing consent
    var consent = localStorage.getItem("cookie-consent");
    if (consent) {
      setHasConsented(true);
      setSettings(JSON.parse(consent));
      return;
    }
    // Detect if user is in EU (simplified version - would use IP geolocation in production)
    var detectEU = function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var euUser;
        return __generator(this, function (_a) {
          try {
            euUser = Math.random() > 0.5;
            setIsEU(euUser);
            // Show the banner for all users until they make a choice, for compliance reasons
            setTimeout(function () {
              return setOpen(true);
            }, 1000);
          } catch (error) {
            console.error("Error detecting location:", error);
            // If we can't detect, assume EU to be safe
            setIsEU(true);
            setTimeout(function () {
              return setOpen(true);
            }, 1000);
          }
          return [2 /*return*/];
        });
      });
    };
    detectEU();
  }, []);
  var handleAcceptAll = function () {
    var allSettings = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(allSettings));
    setSettings(allSettings);
    setHasConsented(true);
    setOpen(false);
    sonner_1.toast.success("All cookies accepted", {
      description: "Your preferences have been saved.",
    });
  };
  var handleAcceptNecessary = function () {
    var necessaryOnly = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem("cookie-consent", JSON.stringify(necessaryOnly));
    setSettings(necessaryOnly);
    setHasConsented(true);
    setOpen(false);
    sonner_1.toast.success("Necessary cookies accepted", {
      description: "Only necessary cookies will be used.",
    });
  };
  var handleSavePreferences = function () {
    localStorage.setItem("cookie-consent", JSON.stringify(settings));
    setHasConsented(true);
    setOpen(false);
    sonner_1.toast.success("Cookie preferences saved", {
      description: "Your custom preferences have been saved.",
    });
  };
  var toggleSetting = function (setting) {
    if (setting === "necessary") return; // Can't toggle necessary cookies
    setSettings(function (prev) {
      var _a;
      return __assign(
        __assign({}, prev),
        ((_a = {}), (_a[setting] = !prev[setting]), _a),
      );
    });
  };
  if (!open) return null;
  return (0, jsx_runtime_1.jsx)("div", {
    className:
      "fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "w-full max-w-lg mx-auto border-primary/20 shadow-xl",
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          className: "pb-3",
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className: "flex items-center justify-between",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Cookie, {
                    className: "h-5 w-5 text-primary",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Cookie Settings",
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
              children: [
                "This website uses cookies to enhance your browsing experience, analyze site usage, and assist in our marketing efforts. See our ",
                (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                  to: "/cookie-policy",
                  className: "underline",
                  children: "Cookie Policy",
                }),
                " and ",
                (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                  to: "/privacy",
                  className: "underline",
                  children: "Privacy Policy",
                }),
                " for details.",
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
          defaultValue: "simple",
          className: "w-full",
          children: [
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
              className: "grid w-full grid-cols-2",
              children: [
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "simple",
                  children: "Simple",
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "advanced",
                  children: "Advanced",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "simple",
              className: "py-4 px-6",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-start gap-4",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                        className: "h-5 w-5 text-blue-500 mt-0.5",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("h4", {
                            className: "text-sm font-medium",
                            children: "We Value Your Privacy",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-sm text-muted-foreground",
                            children:
                              "We use necessary cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic.",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-start gap-4",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                        className: "h-5 w-5 text-green-500 mt-0.5",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("h4", {
                            className: "text-sm font-medium",
                            children: "Your Choices Matter",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-sm text-muted-foreground",
                            children:
                              "You can choose to accept or decline cookies. Necessary cookies are always enabled as they are essential for the website to function properly.",
                          }),
                        ],
                      }),
                    ],
                  }),
                  isEU &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-start gap-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                          className: "h-5 w-5 text-amber-500 mt-0.5",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "text-sm font-medium",
                              children: "GDPR Compliance",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children:
                                "We detect that you may be browsing from the European Union, where GDPR regulations apply. Please make a cookie selection to continue.",
                            }),
                          ],
                        }),
                      ],
                    }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "advanced",
              className: "py-4 px-6",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-0.5",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "necessary",
                            className: "text-base",
                            children: "Necessary Cookies",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-xs text-muted-foreground",
                            children:
                              "Essential for the website to function properly. Cannot be disabled.",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                        id: "necessary",
                        checked: true,
                        disabled: true,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-0.5",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "preferences",
                            className: "text-base",
                            children: "Preference Cookies",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-xs text-muted-foreground",
                            children:
                              "Allow the website to remember choices you have made.",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                        id: "preferences",
                        checked: settings.preferences,
                        onCheckedChange: function () {
                          return toggleSetting("preferences");
                        },
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-0.5",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "analytics",
                            className: "text-base",
                            children: "Analytics Cookies",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-xs text-muted-foreground",
                            children:
                              "Help us understand how visitors interact with our website.",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                        id: "analytics",
                        checked: settings.analytics,
                        onCheckedChange: function () {
                          return toggleSetting("analytics");
                        },
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-0.5",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "marketing",
                            className: "text-base",
                            children: "Marketing Cookies",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-xs text-muted-foreground",
                            children:
                              "Used to track visitors across websites for advertising purposes.",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                        id: "marketing",
                        checked: settings.marketing,
                        onCheckedChange: function () {
                          return toggleSetting("marketing");
                        },
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
          className: "flex-col sm:flex-row gap-2 bg-muted/20 p-4",
          children: [
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              onClick: handleAcceptNecessary,
              className: "w-full sm:w-auto",
              children: "Necessary Only",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex gap-2 w-full sm:w-auto",
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "default",
                  onClick: handleAcceptAll,
                  className: "flex-1",
                  children: "Accept All",
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "secondary",
                  onClick: handleSavePreferences,
                  className: "flex-1",
                  children: "Save Preferences",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
exports.default = CookieConsent;
