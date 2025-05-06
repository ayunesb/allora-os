"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var urlValidators_1 = require("../urlValidators");
(0, vitest_1.describe)("urlValidators", function () {
  (0, vitest_1.describe)("validateMediaUrls", function () {
    (0, vitest_1.it)("validates correct URLs", function () {
      (0, vitest_1.expect)(
        (0, urlValidators_1.validateMediaUrls)([
          "https://example.com/image.jpg",
          "https://media.test.com/video.mp4",
        ]),
      ).toBe(true);
    });
    (0, vitest_1.it)("invalidates incorrect URLs", function () {
      (0, vitest_1.expect)(
        (0, urlValidators_1.validateMediaUrls)([
          "not-a-url",
          "ftp://invalid-protocol.com/file.txt",
        ]),
      ).toBe(false);
    });
    (0, vitest_1.it)("handles non-array inputs", function () {
      (0, vitest_1.expect)(
        (0, urlValidators_1.validateMediaUrls)("not an array"),
      ).toBe(false);
    });
  });
  (0, vitest_1.describe)("validateMediaUrl", function () {
    (0, vitest_1.it)("validates a correct URL", function () {
      (0, vitest_1.expect)(
        (0, urlValidators_1.validateMediaUrl)("https://example.com/image.jpg"),
      ).toBe(true);
    });
    (0, vitest_1.it)("invalidates an incorrect URL", function () {
      (0, vitest_1.expect)(
        (0, urlValidators_1.validateMediaUrl)("not-a-url"),
      ).toBe(false);
    });
  });
});
