"use strict";
/**
 * Post Validator for Social Media
 *
 * This file contains the main validation function for entire social media posts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSocialMediaPost = validateSocialMediaPost;
var schema_1 = require("./schema");
var contentValidators_1 = require("./contentValidators");
var contentValidators_2 = require("./contentValidators");
/**
 * Validate a social media post for security and data integrity
 * Performs deep validation of all post properties
 *
 * @param postData Social media post data to validate
 * @returns Validation result with success status and message
 *
 * @example
 * // Validate post data before submission
 * const validation = validateSocialMediaPost(postFormData);
 * if (!validation.valid) {
 *   showError(validation.message);
 *   return;
 * }
 */
function validateSocialMediaPost(postData) {
  return __awaiter(this, void 0, void 0, function () {
    var result, errorMessage, data;
    var _a;
    return __generator(this, function (_b) {
      try {
        result = schema_1.socialMediaPostSchema.safeParse(postData);
        if (!result.success) {
          errorMessage =
            ((_a = result.error.errors[0]) === null || _a === void 0
              ? void 0
              : _a.message) || "Invalid post data";
          return [
            2 /*return*/,
            {
              valid: false,
              message: errorMessage,
            },
          ];
        }
        data = result.data;
        // Platform-specific validations
        if (
          !(0, contentValidators_1.validateContentLength)(
            data.content,
            data.platform,
          )
        ) {
          return [
            2 /*return*/,
            {
              valid: false,
              message: "Content exceeds maximum length for ".concat(
                data.platform,
              ),
            },
          ];
        }
        // Media validations based on content type
        if (
          data.content_type !== "text" &&
          (!data.media_urls || data.media_urls.length === 0)
        ) {
          return [
            2 /*return*/,
            {
              valid: false,
              message: "".concat(
                data.content_type,
                " posts require at least one media URL",
              ),
            },
          ];
        }
        // Link validation for link type posts
        if (data.content_type === "link" && !data.link_url) {
          return [
            2 /*return*/,
            {
              valid: false,
              message: "Link posts require a valid link URL",
            },
          ];
        }
        // Hashtag validation
        if (
          data.tags &&
          data.tags.length > 0 &&
          !(0, contentValidators_2.validateHashtags)(data.tags)
        ) {
          return [
            2 /*return*/,
            {
              valid: false,
              message: "One or more hashtags are invalid",
            },
          ];
        }
        // All validations passed
        return [
          2 /*return*/,
          {
            valid: true,
            message: "Social media post validation successful",
          },
        ];
      } catch (error) {
        return [
          2 /*return*/,
          {
            valid: false,
            message:
              "Error validating social media post: " +
              (error instanceof Error ? error.message : String(error)),
          },
        ];
      }
      return [2 /*return*/];
    });
  });
}
