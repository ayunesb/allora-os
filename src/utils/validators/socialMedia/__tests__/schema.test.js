"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var schema_1 = require("../schema");
var testUtils_1 = require("@/utils/testUtils");
(0, vitest_1.describe)("schema", function () {
  (0, vitest_1.describe)("socialMediaPostSchema", function () {
    // Use our utility function to test the schema
    (0, testUtils_1.testValidationSchema)(
      schema_1.socialMediaPostSchema,
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
});
