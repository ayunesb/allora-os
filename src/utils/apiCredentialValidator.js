"use strict";
/**
 * API Credential Validation Utility
 *
 * This utility provides functions to validate different types of API credentials
 * including webhook URLs, API keys, and other authentication tokens.
 */
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
exports.validateApiCredential = void 0;
var webhookValidator_1 = require("@/utils/validators/webhookValidator");
var loggingService_1 = require("@/utils/loggingService");
/**
 * Validates API credentials format (not just webhooks, but other API keys too)
 * @param credential The API credential to validate
 * @param type The type of service
 * @param options Additional validation options
 * @returns Promise with validation result
 */
var validateApiCredential = function (credential_1, type_1) {
  var args_1 = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args_1[_i - 2] = arguments[_i];
  }
  return __awaiter(
    void 0,
    __spreadArray([credential_1, type_1], args_1, true),
    void 0,
    function (credential, type, options) {
      var _a,
        logAttempts,
        _b,
        redactSensitive,
        keyPatterns,
        pattern,
        isValid,
        redactedCredential;
      if (options === void 0) {
        options = {};
      }
      return __generator(this, function (_c) {
        (_a = options.logAttempts),
          (logAttempts = _a === void 0 ? false : _a),
          (_b = options.redactSensitive),
          (redactSensitive = _b === void 0 ? true : _b);
        if (!credential) return [2 /*return*/, false];
        // Format validation for webhook URLs
        if (["stripe", "zapier", "github", "slack", "custom"].includes(type)) {
          return [
            2 /*return*/,
            (0, webhookValidator_1.validateWebhookUrlFormat)(credential, type),
          ];
        }
        keyPatterns = {
          stripe_key: /^sk_(?:test|live)_[a-zA-Z0-9]{24,}$/,
          postmark_key:
            /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
          twilio_key: /^[a-zA-Z0-9]{32}$/,
          openai_key: /^sk-[a-zA-Z0-9]{32,}$/,
        };
        pattern = keyPatterns[type];
        if (!pattern) {
          loggingService_1.logger.error(
            "Unknown API credential type: ".concat(type),
          );
          return [2 /*return*/, false];
        }
        isValid = pattern.test(credential);
        if (logAttempts) {
          redactedCredential = redactSensitive
            ? ""
                .concat(credential.substring(0, 4), "...")
                .concat(credential.substring(credential.length - 4))
            : credential;
          if (isValid) {
            loggingService_1.logger.info(
              "Valid "
                .concat(type, " credential format: ")
                .concat(redactedCredential),
            );
          } else {
            loggingService_1.logger.warn(
              "Invalid "
                .concat(type, " credential format: ")
                .concat(redactedCredential),
            );
          }
        }
        return [2 /*return*/, isValid];
      });
    },
  );
};
exports.validateApiCredential = validateApiCredential;
