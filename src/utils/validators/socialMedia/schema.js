"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialMediaPostSchema = void 0;
var zod_1 = require("zod");
exports.socialMediaPostSchema = zod_1.z.object({
  title: zod_1.z.string().min(3, "Title must be at least 3 characters"),
  content: zod_1.z.string().min(1, "Content is required"),
  platform: zod_1.z.enum(["Facebook", "Twitter", "Instagram", "LinkedIn"], {
    errorMap: function () {
      return { message: "Invalid social media platform" };
    },
  }),
  content_type: zod_1.z.enum(["text", "image", "video", "link"], {
    errorMap: function () {
      return { message: "Invalid content type" };
    },
  }),
  scheduled_date: zod_1.z.string(),
  publish_time: zod_1.z.string().optional(),
  media_urls: zod_1.z.array(zod_1.z.string().url()).optional(),
  link_url: zod_1.z.string().url().optional().or(zod_1.z.literal("")),
  campaign_id: zod_1.z.string().optional().or(zod_1.z.literal("")),
  tags: zod_1.z.array(zod_1.z.string()).optional(),
});
