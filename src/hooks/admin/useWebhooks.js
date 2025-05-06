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
exports.useWebhooks = useWebhooks;
var react_1 = require("react");
var sonner_1 = require("sonner");
var webhookValidation_1 = require("@/utils/webhookValidation");
function useWebhooks() {
  var _this = this;
  var _a = (0, react_1.useState)(""),
    stripeWebhook = _a[0],
    setStripeWebhook = _a[1];
  var _b = (0, react_1.useState)(""),
    zapierWebhook = _b[0],
    setZapierWebhook = _b[1];
  var _c = (0, react_1.useState)(""),
    githubWebhook = _c[0],
    setGithubWebhook = _c[1];
  var _d = (0, react_1.useState)(""),
    slackWebhook = _d[0],
    setSlackWebhook = _d[1];
  var _e = (0, react_1.useState)(""),
    customWebhook = _e[0],
    setCustomWebhook = _e[1];
  var _f = (0, react_1.useState)(false),
    isSaving = _f[0],
    setIsSaving = _f[1];
  var _g = (0, react_1.useState)(false),
    testLoading = _g[0],
    setTestLoading = _g[1];
  var _h = (0, react_1.useState)(null),
    testingWebhook = _h[0],
    setTestingWebhook = _h[1];
  // Handle saving all webhooks
  var handleSaveWebhooks = (0, react_1.useCallback)(
    function (
      isStripeValid,
      isZapierValid,
      isGithubValid,
      isSlackValid,
      isCustomValid,
    ) {
      return __awaiter(_this, void 0, void 0, function () {
        var webhooksToSave;
        return __generator(this, function (_a) {
          setIsSaving(true);
          try {
            webhooksToSave = __spreadArray(
              __spreadArray(
                __spreadArray(
                  __spreadArray(
                    __spreadArray(
                      [],
                      stripeWebhook && isStripeValid
                        ? [{ type: "stripe", url: stripeWebhook }]
                        : [],
                      true,
                    ),
                    zapierWebhook && isZapierValid
                      ? [{ type: "zapier", url: zapierWebhook }]
                      : [],
                    true,
                  ),
                  githubWebhook && isGithubValid
                    ? [{ type: "github", url: githubWebhook }]
                    : [],
                  true,
                ),
                slackWebhook && isSlackValid
                  ? [{ type: "slack", url: slackWebhook }]
                  : [],
                true,
              ),
              customWebhook && isCustomValid
                ? [{ type: "custom", url: customWebhook }]
                : [],
              true,
            );
            if (webhooksToSave.length === 0) {
              sonner_1.toast.info("No valid webhooks to save");
              return [2 /*return*/];
            }
            // Mock API call to save webhooks - in a real app this would call the API
            console.log("Saving webhooks:", webhooksToSave);
            // Simulating success after a delay
            setTimeout(function () {
              sonner_1.toast.success("Webhooks saved successfully!");
              setIsSaving(false);
            }, 500);
          } catch (error) {
            console.error("Error saving webhooks:", error);
            sonner_1.toast.error("Failed to save webhooks. Please try again.");
            setIsSaving(false);
          }
          return [2 /*return*/];
        });
      });
    },
    [stripeWebhook, zapierWebhook, githubWebhook, slackWebhook, customWebhook],
  );
  // Generic test webhook function
  var testWebhookUrl = (0, react_1.useCallback)(function (url, webhookType) {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!url) {
              sonner_1.toast.error("Please enter a webhook URL first");
              return [2 /*return*/, false];
            }
            setTestLoading(true);
            setTestingWebhook(webhookType);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, (0, webhookValidation_1.testWebhook)(url)];
          case 2:
            result = _a.sent();
            if (result.success) {
              sonner_1.toast.success(
                "".concat(
                  webhookType.charAt(0).toUpperCase() + webhookType.slice(1),
                  " webhook test successful!",
                ),
              );
              return [2 /*return*/, true];
            } else {
              sonner_1.toast.error("Test failed: ".concat(result.message));
              return [2 /*return*/, false];
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            sonner_1.toast.error(
              "Test failed: ".concat(
                error_1 instanceof Error ? error_1.message : String(error_1),
              ),
            );
            return [2 /*return*/, false];
          case 4:
            setTestLoading(false);
            setTestingWebhook(null);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  }, []);
  // Type-specific test functions
  var handleTestStripeWebhook = (0, react_1.useCallback)(
    function (isValid) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          if (!isValid) {
            sonner_1.toast.error("Stripe webhook URL is invalid");
            return [2 /*return*/, false];
          }
          return [2 /*return*/, testWebhookUrl(stripeWebhook, "stripe")];
        });
      });
    },
    [stripeWebhook, testWebhookUrl],
  );
  var handleTestZapierWebhook = (0, react_1.useCallback)(
    function (isValid) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          if (!isValid) {
            sonner_1.toast.error("Zapier webhook URL is invalid");
            return [2 /*return*/, false];
          }
          return [2 /*return*/, testWebhookUrl(zapierWebhook, "zapier")];
        });
      });
    },
    [zapierWebhook, testWebhookUrl],
  );
  var handleTestGithubWebhook = (0, react_1.useCallback)(
    function (isValid) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          if (!isValid) {
            sonner_1.toast.error("GitHub webhook URL is invalid");
            return [2 /*return*/, false];
          }
          return [2 /*return*/, testWebhookUrl(githubWebhook, "github")];
        });
      });
    },
    [githubWebhook, testWebhookUrl],
  );
  var handleTestSlackWebhook = (0, react_1.useCallback)(
    function (isValid) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          if (!isValid) {
            sonner_1.toast.error("Slack webhook URL is invalid");
            return [2 /*return*/, false];
          }
          return [2 /*return*/, testWebhookUrl(slackWebhook, "slack")];
        });
      });
    },
    [slackWebhook, testWebhookUrl],
  );
  var handleTestCustomWebhook = (0, react_1.useCallback)(
    function (isValid) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          if (!isValid) {
            sonner_1.toast.error("Custom webhook URL is invalid");
            return [2 /*return*/, false];
          }
          return [2 /*return*/, testWebhookUrl(customWebhook, "custom")];
        });
      });
    },
    [customWebhook, testWebhookUrl],
  );
  return {
    stripeWebhook: stripeWebhook,
    setStripeWebhook: setStripeWebhook,
    zapierWebhook: zapierWebhook,
    setZapierWebhook: setZapierWebhook,
    githubWebhook: githubWebhook,
    setGithubWebhook: setGithubWebhook,
    slackWebhook: slackWebhook,
    setSlackWebhook: setSlackWebhook,
    customWebhook: customWebhook,
    setCustomWebhook: setCustomWebhook,
    isSaving: isSaving,
    testLoading: testLoading,
    testingWebhook: testingWebhook,
    handleSaveWebhooks: handleSaveWebhooks,
    handleTestStripeWebhook: handleTestStripeWebhook,
    handleTestZapierWebhook: handleTestZapierWebhook,
    handleTestGithubWebhook: handleTestGithubWebhook,
    handleTestSlackWebhook: handleTestSlackWebhook,
    handleTestCustomWebhook: handleTestCustomWebhook,
  };
}
