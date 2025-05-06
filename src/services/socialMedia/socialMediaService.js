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
exports.fetchSocialMediaPosts = fetchSocialMediaPosts;
exports.createSocialMediaPost = createSocialMediaPost;
exports.deleteSocialMediaPost = deleteSocialMediaPost;
exports.schedulePost = schedulePost;
exports.approvePost = approvePost;
var supabase_1 = require("@/backend/supabase");
var loggingService_1 = require("@/utils/loggingService");
/**
 * Fetch all social media posts for a company with optional filters
 */
function fetchSocialMediaPosts(companyId, filters) {
  return __awaiter(this, void 0, void 0, function () {
    var query, _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          loggingService_1.logger.info(
            "Fetching social media posts from database",
            { companyId: companyId, filters: filters },
          );
          query = supabase_1.supabase
            .from("social_media_posts")
            .select("*")
            .eq("company_id", companyId);
          // Apply filters if provided
          if (filters) {
            if (filters.platform) {
              query = query.eq("platform", filters.platform);
            }
            if (filters.status) {
              query = query.eq("status", filters.status.toLowerCase());
            }
            if (filters.content_type) {
              query = query.eq("content_type", filters.content_type);
            }
            if (filters.campaign_id) {
              query = query.eq("campaign_id", filters.campaign_id);
            }
            if (filters.author_id) {
              query = query.eq("author_id", filters.author_id);
            }
            if (filters.startDate && filters.endDate) {
              query = query
                .gte("scheduled_date", filters.startDate)
                .lte("scheduled_date", filters.endDate);
            } else if (filters.startDate) {
              query = query.gte("scheduled_date", filters.startDate);
            } else if (filters.endDate) {
              query = query.lte("scheduled_date", filters.endDate);
            }
            if (filters.search) {
              query = query.or(
                "title.ilike.%"
                  .concat(filters.search, "%,content.ilike.%")
                  .concat(filters.search, "%"),
              );
            }
            if (filters.tags && filters.tags.length > 0) {
              query = query.overlaps("tags", filters.tags);
            }
          }
          // Order by scheduled date
          query = query.order("scheduled_date", { ascending: true });
          return [4 /*yield*/, query];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          return [2 /*return*/, data || []];
        case 2:
          error_1 = _b.sent();
          loggingService_1.logger.error(
            "Error fetching posts from database:",
            error_1,
          );
          // Return a fallback if there's an error (for better UX)
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Create a new social media post
 */
function createSocialMediaPost(companyId, postData) {
  return __awaiter(this, void 0, void 0, function () {
    var user, _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          loggingService_1.logger.info(
            "Creating new social media post in database",
            { companyId: companyId, postData: postData },
          );
          return [4 /*yield*/, supabase_1.supabase.auth.getUser()];
        case 1:
          user = _b.sent().data.user;
          if (!user) {
            return [
              2 /*return*/,
              {
                success: false,
                error: "Not authenticated",
              },
            ];
          }
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("social_media_posts")
              .insert({
                company_id: companyId,
                author_id: user.id,
                title: postData.title,
                content: postData.content,
                platform: postData.platform,
                scheduled_date: postData.scheduled_date,
                publish_time: postData.publish_time,
                status: "draft",
                content_type: postData.content_type,
                media_urls: postData.media_urls,
                campaign_id: postData.campaign_id,
                is_approved: postData.is_approved || false,
                tags: postData.tags || [],
                mentions: postData.mentions || [],
                hashtags: postData.hashtags || [],
                location: postData.location,
                link_url: postData.link_url,
              })
              .select("id")
              .single(),
          ];
        case 2:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [
            2 /*return*/,
            {
              success: true,
              postId: data.id,
            },
          ];
        case 3:
          error_2 = _b.sent();
          loggingService_1.logger.error(
            "Error creating post in database:",
            error_2,
          );
          return [
            2 /*return*/,
            {
              success: false,
              error: error_2.message || "Failed to create post",
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Delete a social media post
 */
function deleteSocialMediaPost(postId) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          loggingService_1.logger.info(
            "Deleting social media post from database",
            { postId: postId },
          );
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("social_media_posts")
              .delete()
              .eq("id", postId),
          ];
        case 1:
          error = _a.sent().error;
          if (error) throw error;
          return [2 /*return*/, { success: true }];
        case 2:
          error_3 = _a.sent();
          loggingService_1.logger.error(
            "Error deleting post from database:",
            error_3,
          );
          return [
            2 /*return*/,
            {
              success: false,
              error: error_3.message || "Failed to delete post",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Schedule a post for publication
 */
function schedulePost(postId) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          loggingService_1.logger.info("Scheduling post in database", {
            postId: postId,
          });
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("social_media_posts")
              .update({ status: "scheduled" })
              .eq("id", postId),
          ];
        case 1:
          error = _a.sent().error;
          if (error) throw error;
          return [2 /*return*/, { success: true }];
        case 2:
          error_4 = _a.sent();
          loggingService_1.logger.error(
            "Error scheduling post in database:",
            error_4,
          );
          return [
            2 /*return*/,
            {
              success: false,
              error: error_4.message || "Failed to schedule post",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Approve a social media post
 */
function approvePost(postId, notes) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_5;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          loggingService_1.logger.info("Approving post in database", {
            postId: postId,
            notes: notes,
          });
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("social_media_posts")
              .update({
                is_approved: true,
                approval_notes: notes,
                status: "approved",
              })
              .eq("id", postId),
          ];
        case 1:
          error = _a.sent().error;
          if (error) throw error;
          return [2 /*return*/, { success: true }];
        case 2:
          error_5 = _a.sent();
          loggingService_1.logger.error(
            "Error approving post in database:",
            error_5,
          );
          return [
            2 /*return*/,
            {
              success: false,
              error: error_5.message || "Failed to approve post",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
