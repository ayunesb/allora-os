import { describe } from "vitest";
import { socialMediaPostSchema } from "../schema";
import { testValidationSchema } from "@/utils/testUtils";
describe("schema", () => {
    describe("socialMediaPostSchema", () => {
        // Use our utility function to test the schema
        testValidationSchema(socialMediaPostSchema, [
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
        ], [
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
        ]);
    });
});
