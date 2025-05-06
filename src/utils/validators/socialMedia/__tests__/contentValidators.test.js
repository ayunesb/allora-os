"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var contentValidators_1 = require("../contentValidators");
(0, vitest_1.describe)("contentValidators", function () {
  (0, vitest_1.describe)("validateHashtags", function () {
    (0, vitest_1.it)("validates correct hashtags", function () {
      (0, vitest_1.expect)(
        (0, contentValidators_1.validateHashtags)([
          "#marketing",
          "#business2023",
          "#growth_strategy",
        ]),
      ).toBe(true);
    });
    (0, vitest_1.it)("invalidates incorrect hashtags", function () {
      (0, vitest_1.expect)(
        (0, contentValidators_1.validateHashtags)([
          "marketing",
          "#business-2023",
          "##growth",
        ]),
      ).toBe(false);
    });
    (0, vitest_1.it)("handles non-array inputs", function () {
      (0, vitest_1.expect)(
        (0, contentValidators_1.validateHashtags)("not an array"),
      ).toBe(false);
    });
  });
  (0, vitest_1.describe)("validateContentLength", function () {
    (0, vitest_1.it)("validates content within platform limits", function () {
      var content = "This is a test post";
      (0, vitest_1.expect)(
        (0, contentValidators_1.validateContentLength)(content, "Twitter"),
      ).toBe(true);
    });
    (0, vitest_1.it)(
      "invalidates content exceeding platform limits",
      function () {
        // Create a string longer than Twitter's 280 character limit
        var longContent = "a".repeat(300);
        (0, vitest_1.expect)(
          (0, contentValidators_1.validateContentLength)(
            longContent,
            "Twitter",
          ),
        ).toBe(false);
      },
    );
  });
});
