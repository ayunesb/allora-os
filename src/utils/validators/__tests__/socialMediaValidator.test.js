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
var vitest_1 = require("vitest");
var socialMediaValidator_1 = require("../socialMediaValidator");
var testUtils_1 = require("@/utils/testUtils");
(0, vitest_1.describe)("socialMediaValidator", function () {
  (0, vitest_1.describe)("validateHashtags", function () {
    (0, vitest_1.it)("validates correct hashtags", function () {
      (0, vitest_1.expect)(
        (0, socialMediaValidator_1.validateHashtags)([
          "#marketing",
          "#business2023",
          "#growth_strategy",
        ]),
      ).toBe(true);
    });
    (0, vitest_1.it)("invalidates incorrect hashtags", function () {
      (0, vitest_1.expect)(
        (0, socialMediaValidator_1.validateHashtags)([
          "marketing",
          "#business-2023",
          "##growth",
        ]),
      ).toBe(false);
    });
    (0, vitest_1.it)("handles non-array inputs", function () {
      (0, vitest_1.expect)(
        (0, socialMediaValidator_1.validateHashtags)("not an array"),
      ).toBe(false);
    });
  });
  (0, vitest_1.describe)("validateContentLength", function () {
    (0, vitest_1.it)("validates content within platform limits", function () {
      var content = "This is a test post";
      (0, vitest_1.expect)(
        (0, socialMediaValidator_1.validateContentLength)(content, "Twitter"),
      ).toBe(true);
    });
    (0, vitest_1.it)(
      "invalidates content exceeding platform limits",
      function () {
        // Create a string longer than Twitter's 280 character limit
        var longContent = "a".repeat(300);
        (0, vitest_1.expect)(
          (0, socialMediaValidator_1.validateContentLength)(
            longContent,
            "Twitter",
          ),
        ).toBe(false);
      },
    );
  });
  (0, vitest_1.describe)("validateMediaUrls", function () {
    (0, vitest_1.it)("validates correct URLs", function () {
      (0, vitest_1.expect)(
        (0, socialMediaValidator_1.validateMediaUrls)([
          "https://example.com/image.jpg",
          "https://media.test.com/video.mp4",
        ]),
      ).toBe(true);
    });
    (0, vitest_1.it)("invalidates incorrect URLs", function () {
      (0, vitest_1.expect)(
        (0, socialMediaValidator_1.validateMediaUrls)([
          "not-a-url",
          "ftp://invalid-protocol.com/file.txt",
        ]),
      ).toBe(false);
    });
    (0, vitest_1.it)("handles non-array inputs", function () {
      (0, vitest_1.expect)(
        (0, socialMediaValidator_1.validateMediaUrls)("not an array"),
      ).toBe(false);
    });
  });
  (0, vitest_1.describe)("socialMediaPostSchema", function () {
    // Use our utility function to test the schema
    (0, testUtils_1.testValidationSchema)(
      socialMediaValidator_1.socialMediaPostSchema,
      [
        // Valid cases
        {
          title: "Test Post",
          content: "This is a test post content",
          platform: "Twitter",
          content_type: "text",
          scheduled_date: "2025-05-01",
          tags: ["#marketing", "#test"],
        },
        {
          title: "Image Post",
          content: "Check out this image",
          platform: "Instagram",
          content_type: "image",
          scheduled_date: "2025-05-01",
          media_urls: ["https://example.com/image.jpg"],
        },
      ],
      [
        // Invalid cases
        {
          data: {
            title: "Te",
            content: "Content",
            platform: "Twitter",
            content_type: "text",
            scheduled_date: "2025-05-01",
          },
          expectedError: "Title must be at least 3 characters",
        },
        {
          data: {
            title: "Test",
            content: "",
            platform: "Twitter",
            content_type: "text",
            scheduled_date: "2025-05-01",
          },
          expectedError: "Content is required",
        },
        {
          data: {
            title: "Test",
            content: "Content",
            platform: "NotAPlatform",
            content_type: "text",
            scheduled_date: "2025-05-01",
          },
          expectedError: "Invalid enum value",
        },
      ],
    );
  });
  (0, vitest_1.describe)("validateSocialMediaPost", function () {
    (0, vitest_1.it)("validates a valid post", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                (0, socialMediaValidator_1.validateSocialMediaPost)({
                  title: "Valid Post",
                  content: "This is valid content",
                  platform: "Facebook",
                  content_type: "text",
                  scheduled_date: "2025-05-01",
                }),
              ];
            case 1:
              result = _a.sent();
              (0, vitest_1.expect)(result.valid).toBe(true);
              return [2 /*return*/];
          }
        });
      });
    });
    (0, vitest_1.it)(
      "invalidates posts with missing required fields",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var result;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  (0, socialMediaValidator_1.validateSocialMediaPost)({
                    title: "Missing Fields",
                    platform: "Facebook",
                    content_type: "text",
                    // Missing content and scheduled_date
                  }),
                ];
              case 1:
                result = _a.sent();
                (0, vitest_1.expect)(result.valid).toBe(false);
                return [2 /*return*/];
            }
          });
        });
      },
    );
    (0, vitest_1.it)(
      "validates media requirements based on content type",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var result;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  (0, socialMediaValidator_1.validateSocialMediaPost)({
                    title: "Image Post",
                    content: "This is an image post",
                    platform: "Instagram",
                    content_type: "image",
                    scheduled_date: "2025-05-01",
                    // Missing media_urls for image type
                  }),
                ];
              case 1:
                result = _a.sent();
                (0, vitest_1.expect)(result.valid).toBe(false);
                (0, vitest_1.expect)(result.message).toContain(
                  "require at least one media URL",
                );
                return [2 /*return*/];
            }
          });
        });
      },
    );
  });
});
