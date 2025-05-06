"use strict";
/**
 * Social Media Service
 *
 * This service handles interactions with the social media posts database table.
 * It includes comprehensive validation and security checks for all operations.
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
exports.fetchSocialMediaPosts = fetchSocialMediaPosts;
exports.fetchSocialMediaPost = fetchSocialMediaPost;
exports.createSocialMediaPost = createSocialMediaPost;
exports.updateSocialMediaPost = updateSocialMediaPost;
exports.deleteSocialMediaPost = deleteSocialMediaPost;
exports.schedulePost = schedulePost;
exports.approvePost = approvePost;
exports.batchSchedulePosts = batchSchedulePosts;
exports.postToSocialMedia = postToSocialMedia;
var supabase_1 = require("@/backend/supabase");
var sonner_1 = require("sonner");
var apiClient_1 = require("@/utils/api/apiClient");
var supabaseWrapper_1 = require("@/utils/api/supabaseWrapper");
var loggingService_1 = require("@/utils/loggingService");
var SocialMediaPost_1 = require("@/types/fixed/SocialMediaPost"); // Rename conflicting imports
var mediaValidator_1 = require("@/utils/validators/mediaValidator"); // Ensure this is the correct path
/**
 * Cache key for social media posts
 * @param companyId - Company ID to include in the cache key
 * @returns - Formatted cache key
 */
var getSocialMediaCacheKey = function (companyId) {
  return "social_media_posts_".concat(companyId);
};
/**
 * Fetch all social media posts for a company with optional filters
 *
 * @param companyId - The ID of the company
 * @param filters - Optional filters to apply to the query
 * @returns Promise with array of social media posts
 */
function fetchSocialMediaPosts(companyId, filters) {
  return __awaiter(this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        (0, apiClient_1.apiRequest)(
          (0, supabaseWrapper_1.wrapSupabaseQuery)(function () {
            return __awaiter(_this, void 0, void 0, function () {
              var query, _a, data, error;
              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
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
                        query = query.eq("status", filters.status);
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
                        // For array overlap search (posts that have any of the specified tags)
                        query = query.contains("tags", filters.tags);
                      }
                    }
                    // Order by scheduled date
                    query = query.order("scheduled_date", { ascending: true });
                    return [4 /*yield*/, query];
                  case 1:
                    (_a = _b.sent()), (data = _a.data), (error = _a.error);
                    return [2 /*return*/, { data: data, error: error }];
                }
              });
            });
          }),
          {
            errorMessage: "Failed to fetch social media posts",
            cacheKey: getSocialMediaCacheKey(companyId),
            cacheTTL: 60000, // 1 minute cache
          },
        ).then(function (response) {
          return response.data || [];
        }),
      ];
    });
  });
}
/**
 * Fetch a single social media post by ID
 *
 * @param postId - The ID of the post
 * @returns Promise with the post or null if not found
 */
function fetchSocialMediaPost(postId) {
  return __awaiter(this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("social_media_posts")
              .select("*")
              .eq("id", postId)
              .maybeSingle(),
          ];
        case 1:
          result = _a.sent();
          return [2 /*return*/, result.data];
      }
    });
  });
}
/**
 * Create a new social media post with validation
 *
 * @param companyId - The ID of the company
 * @param postData - Data for the new post
 * @returns Promise with success status and post ID or error details
 */
function createSocialMediaPost(companyId, postData) {
  return __awaiter(this, void 0, void 0, function () {
    var validation, validatedData_1, invalidUrls, result, error_1;
    var _this = this;
    var _a, _b, _c;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          _d.trys.push([0, 2, , 3]);
          validation = (0, SocialMediaPost_1.validateCreatePost)(postData);
          if (!validation.valid || !validation.data) {
            return [
              2 /*return*/,
              {
                success: false,
                error: "Invalid post data",
                validationErrors: validation.errors,
              },
            ];
          }
          validatedData_1 = validation.data;
          // Additional validation for media URLs
          if (
            (_a = validatedData_1.mediaUrls) === null || _a === void 0
              ? void 0
              : _a.length
          ) {
            invalidUrls = validatedData_1.mediaUrls.filter(function (url) {
              return !(0, mediaValidator_1.validateMediaUrl)(url);
            });
            if (invalidUrls.length > 0) {
              return [
                2 /*return*/,
                {
                  success: false,
                  error:
                    "One or more media URLs are invalid or from untrusted sources",
                  validationErrors: {
                    media_urls: "Contains invalid or untrusted URLs",
                  },
                },
              ];
            }
          }
          return [
            4 /*yield*/,
            (0, apiClient_1.apiRequest)(
              (0, supabaseWrapper_1.wrapSupabaseQuery)(function () {
                return __awaiter(_this, void 0, void 0, function () {
                  var _a, data, error;
                  return __generator(this, function (_b) {
                    switch (_b.label) {
                      case 0:
                        return [
                          4 /*yield*/,
                          supabase_1.supabase
                            .from("social_media_posts")
                            .insert({
                              company_id: companyId,
                              title: validatedData_1.title,
                              content: validatedData_1.content,
                              platform: validatedData_1.platform,
                              scheduledAt: validatedData_1.scheduledAt,
                              publishTime: validatedData_1.publishTime,
                              status: "Draft", // Default status
                              contentType: validatedData_1.contentType,
                              mediaUrls: validatedData_1.mediaUrls,
                              campaignId: validatedData_1.campaignId,
                              isApproved: validatedData_1.isApproved || false,
                              tags: validatedData_1.tags || [],
                              mentions: validatedData_1.mentions || [],
                              hashtags: validatedData_1.hashtags || [],
                              location: validatedData_1.location,
                              link_url: validatedData_1.link_url,
                              created_at: new Date().toISOString(),
                              updated_at: new Date().toISOString(),
                            })
                            .select("id")
                            .single(),
                        ];
                      case 1:
                        (_a = _b.sent()), (data = _a.data), (error = _a.error);
                        return [2 /*return*/, { data: data, error: error }];
                    }
                  });
                });
              }),
              {
                successMessage: "Social media post created successfully",
                errorMessage: "Failed to create social media post",
              },
            ),
          ];
        case 1:
          result = _d.sent();
          // Clear any cached data to ensure fresh data
          (0, apiClient_1.clearApiCache)(getSocialMediaCacheKey(companyId));
          // Log the successful creation
          loggingService_1.logger.info("Social media post created", {
            companyId: companyId,
            postId:
              (_b = result.data) === null || _b === void 0 ? void 0 : _b.id,
            platform: validatedData_1.platform,
          });
          return [
            2 /*return*/,
            {
              success: true,
              postId:
                (_c = result.data) === null || _c === void 0 ? void 0 : _c.id,
            },
          ];
        case 2:
          error_1 = _d.sent();
          // Log the error
          loggingService_1.logger.error("Error creating social media post", {
            error: error_1.message,
            companyId: companyId,
            postData: postData,
          });
          return [
            2 /*return*/,
            {
              success: false,
              error: error_1.message || "An unexpected error occurred",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Update an existing social media post with validation
 *
 * @param postData - Updated post data
 * @returns Promise with success status or error details
 */
function updateSocialMediaPost(postData) {
  return __awaiter(this, void 0, void 0, function () {
    var validation,
      validatedData,
      invalidUrls,
      updatedPost,
      _a,
      data,
      error,
      error_2;
    var _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 3, , 4]);
          validation = (0, SocialMediaPost_1.validateUpdatePost)(postData);
          if (!validation.valid || !validation.data) {
            return [
              2 /*return*/,
              {
                success: false,
                error: "Invalid post update data",
                validationErrors: validation.errors,
              },
            ];
          }
          validatedData = validation.data;
          // Additional validation for media URLs if provided
          if (
            (_b = validatedData.mediaUrls) === null || _b === void 0
              ? void 0
              : _b.length
          ) {
            invalidUrls = validatedData.mediaUrls.filter(function (url) {
              return !(0, mediaValidator_1.validateMediaUrl)(url);
            });
            if (invalidUrls.length > 0) {
              return [
                2 /*return*/,
                {
                  success: false,
                  error:
                    "One or more media URLs are invalid or from untrusted sources",
                  validationErrors: {
                    media_urls: "Contains invalid or untrusted URLs",
                  },
                },
              ];
            }
          }
          return [4 /*yield*/, fetchSocialMediaPost(validatedData.id)];
        case 1:
          updatedPost = _c.sent();
          if (!updatedPost) {
            return [
              2 /*return*/,
              {
                success: false,
                error: "Post not found",
              },
            ];
          }
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("social_media_posts")
              .update({
                title: validatedData.title,
                content: validatedData.content,
                platform: validatedData.platform,
                scheduledAt: validatedData.scheduledAt,
                publishTime: validatedData.publishTime,
                status: validatedData.status,
                contentType: validatedData.contentType,
                mediaUrls: validatedData.mediaUrls,
                campaignId: validatedData.campaignId,
                isApproved: validatedData.isApproved, // Ensure this property exists
                approval_notes: validatedData.approval_notes, // Ensure this property exists
                tags: validatedData.tags, // Ensure this property exists
                mentions: validatedData.mentions, // Ensure this property exists
                hashtags: validatedData.hashtags, // Ensure this property exists
                location: validatedData.location, // Ensure this property exists
                link_url: validatedData.link_url, // Ensure this property exists
                updated_at: new Date().toISOString(),
              })
              .eq("id", validatedData.id),
          ];
        case 2:
          (_a = _c.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw new Error(
              error.message || "Failed to update social media post",
            );
          }
          // Clear the specific post cache and the posts list cache
          (0, apiClient_1.clearApiCache)(
            "social_media_post_".concat(validatedData.id),
          );
          if (updatedPost.company_id) {
            (0, apiClient_1.clearApiCache)(
              getSocialMediaCacheKey(updatedPost.company_id),
            );
          }
          // Log the successful update
          loggingService_1.logger.info("Social media post updated", {
            postId: validatedData.id,
            fieldCount: Object.keys(validatedData).length - 1, // Exclude the ID
          });
          return [2 /*return*/, { success: true }];
        case 3:
          error_2 = _c.sent();
          // Log the error
          loggingService_1.logger.error("Error updating social media post", {
            error: error_2.message,
            postId: postData.id,
          });
          return [
            2 /*return*/,
            {
              success: false,
              error: error_2.message || "An unexpected error occurred",
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
 *
 * @param postId - The ID of the post to delete
 * @returns Promise with success status or error message
 */
function deleteSocialMediaPost(postId) {
  return __awaiter(this, void 0, void 0, function () {
    var postData, error_3;
    var _this = this;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          return [4 /*yield*/, fetchSocialMediaPost(postId)];
        case 1:
          postData = _a.sent();
          if (!postData) {
            return [
              2 /*return*/,
              {
                success: false,
                error: "Post not found",
              },
            ];
          }
          // Delete the post
          return [
            4 /*yield*/,
            (0, apiClient_1.apiRequest)(
              (0, supabaseWrapper_1.wrapSupabaseQuery)(function () {
                return __awaiter(_this, void 0, void 0, function () {
                  var _a, data, error;
                  return __generator(this, function (_b) {
                    switch (_b.label) {
                      case 0:
                        return [
                          4 /*yield*/,
                          supabase_1.supabase
                            .from("social_media_posts")
                            .delete()
                            .eq("id", postId),
                        ];
                      case 1:
                        (_a = _b.sent()), (data = _a.data), (error = _a.error);
                        return [2 /*return*/, { data: data, error: error }]; // Ensure `data` is returned
                    }
                  });
                });
              }),
              {
                successMessage: "Social media post deleted successfully",
                errorMessage: "Failed to delete social media post",
              },
            ),
          ];
        case 2:
          // Delete the post
          _a.sent();
          // Clear the specific post cache and the posts list cache
          (0, apiClient_1.clearApiCache)("social_media_post_".concat(postId));
          (0, apiClient_1.clearApiCache)(
            getSocialMediaCacheKey(postData.company_id || ""),
          );
          // Log the successful deletion
          loggingService_1.logger.info("Social media post deleted", {
            postId: postId,
            companyId: postData.company_id,
          });
          return [2 /*return*/, { success: true }];
        case 3:
          error_3 = _a.sent();
          // Log the error
          loggingService_1.logger.error("Error deleting social media post", {
            error: error_3.message,
            postId: postId,
          });
          return [
            2 /*return*/,
            {
              success: false,
              error: error_3.message || "An unexpected error occurred",
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Schedule a post for publication
 *
 * @param postId - The ID of the post to schedule
 * @returns Promise with success status or error message
 */
function schedulePost(postId) {
  return __awaiter(this, void 0, void 0, function () {
    var currentPost, updatedPost, error_4;
    var _this = this;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 4, , 5]);
          return [4 /*yield*/, fetchSocialMediaPost(postId)];
        case 1:
          currentPost = _a.sent();
          if (!currentPost) {
            return [
              2 /*return*/,
              {
                success: false,
                error: "Post not found",
              },
            ];
          }
          // Check if the post is already scheduled or published
          if (
            currentPost.status === "Scheduled" ||
            currentPost.status === "Published"
          ) {
            return [
              2 /*return*/,
              {
                success: false,
                error: "Post is already ".concat(currentPost.status),
              },
            ];
          }
          // Schedule the post
          return [
            4 /*yield*/,
            (0, apiClient_1.apiRequest)(
              (0, supabaseWrapper_1.wrapSupabaseQuery)(function () {
                return __awaiter(_this, void 0, void 0, function () {
                  var _a, data, error;
                  return __generator(this, function (_b) {
                    switch (_b.label) {
                      case 0:
                        return [
                          4 /*yield*/,
                          supabase_1.supabase
                            .from("social_media_posts")
                            .update({
                              status: "Scheduled",
                              updated_at: new Date().toISOString(),
                            })
                            .eq("id", postId),
                        ];
                      case 1:
                        (_a = _b.sent()), (data = _a.data), (error = _a.error);
                        return [2 /*return*/, { data: data, error: error }];
                    }
                  });
                });
              }),
              {
                successMessage: "Post scheduled successfully",
                errorMessage: "Failed to schedule post",
              },
            ),
          ];
        case 2:
          // Schedule the post
          _a.sent();
          return [4 /*yield*/, fetchSocialMediaPost(postId)];
        case 3:
          updatedPost = _a.sent();
          if (updatedPost) {
            // Clear the specific post cache and the posts list cache
            (0, apiClient_1.clearApiCache)("social_media_post_".concat(postId));
            (0, apiClient_1.clearApiCache)(
              getSocialMediaCacheKey(updatedPost.company_id || ""),
            );
          }
          // Log the successful scheduling
          loggingService_1.logger.info("Social media post scheduled", {
            postId: postId,
            companyId: currentPost.company_id,
            scheduledDate: currentPost.scheduled_date,
            publishTime: currentPost.publish_time,
          });
          return [2 /*return*/, { success: true }];
        case 4:
          error_4 = _a.sent();
          // Log the error
          loggingService_1.logger.error("Error scheduling social media post", {
            error: error_4.message,
            postId: postId,
          });
          return [
            2 /*return*/,
            {
              success: false,
              error: error_4.message || "An unexpected error occurred",
            },
          ];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Approve a social media post
 *
 * @param postId - The ID of the post to approve
 * @param notes - Optional approval notes
 * @returns Promise with success status or error message
 */
function approvePost(postId, notes) {
  return __awaiter(this, void 0, void 0, function () {
    var currentPost_1, updatedPost, error_5;
    var _this = this;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 4, , 5]);
          return [4 /*yield*/, fetchSocialMediaPost(postId)];
        case 1:
          currentPost_1 = _a.sent();
          if (!currentPost_1) {
            return [
              2 /*return*/,
              {
                success: false,
                error: "Post not found",
              },
            ];
          }
          // Check if the post is already approved
          if (currentPost_1.is_approved) {
            return [
              2 /*return*/,
              {
                success: false,
                error: "Post is already approved",
              },
            ];
          }
          // Approve the post
          return [
            4 /*yield*/,
            (0, apiClient_1.apiRequest)(
              (0, supabaseWrapper_1.wrapSupabaseQuery)(function () {
                return __awaiter(_this, void 0, void 0, function () {
                  var _a, data, error;
                  return __generator(this, function (_b) {
                    switch (_b.label) {
                      case 0:
                        return [
                          4 /*yield*/,
                          supabase_1.supabase
                            .from("social_media_posts")
                            .update({
                              is_approved: true,
                              approval_notes: notes,
                              status:
                                currentPost_1.status === "Draft"
                                  ? "Approved"
                                  : currentPost_1.status,
                              updated_at: new Date().toISOString(),
                            })
                            .eq("id", postId),
                        ];
                      case 1:
                        (_a = _b.sent()), (data = _a.data), (error = _a.error);
                        return [2 /*return*/, { data: data, error: error }];
                    }
                  });
                });
              }),
              {
                successMessage: "Post approved successfully",
                errorMessage: "Failed to approve post",
              },
            ),
          ];
        case 2:
          // Approve the post
          _a.sent();
          return [4 /*yield*/, fetchSocialMediaPost(postId)];
        case 3:
          updatedPost = _a.sent();
          if (updatedPost) {
            // Clear the specific post cache and the posts list cache
            (0, apiClient_1.clearApiCache)("social_media_post_".concat(postId));
            (0, apiClient_1.clearApiCache)(
              getSocialMediaCacheKey(updatedPost.company_id || ""),
            );
          }
          // Log the successful approval
          loggingService_1.logger.info("Social media post approved", {
            postId: postId,
            companyId: currentPost_1.company_id,
            withNotes: !!notes,
          });
          return [2 /*return*/, { success: true }];
        case 4:
          error_5 = _a.sent();
          // Log the error
          loggingService_1.logger.error("Error approving social media post", {
            error: error_5.message,
            postId: postId,
          });
          return [
            2 /*return*/,
            {
              success: false,
              error: error_5.message || "An unexpected error occurred",
            },
          ];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Batch schedule multiple posts
 *
 * @param postIds - Array of post IDs to schedule
 * @returns Promise with batch operation results
 */
function batchSchedulePosts(postIds) {
  return __awaiter(this, void 0, void 0, function () {
    var processed, failed, errors, _i, postIds_1, postId, result, error_6;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!postIds.length) {
            return [
              2 /*return*/,
              {
                success: true,
                processed: 0,
                failed: 0,
                error_details: [],
              },
            ];
          }
          processed = 0;
          failed = 0;
          errors = [];
          (_i = 0), (postIds_1 = postIds);
          _a.label = 1;
        case 1:
          if (!(_i < postIds_1.length)) return [3 /*break*/, 6];
          postId = postIds_1[_i];
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 5]);
          return [4 /*yield*/, schedulePost(postId)];
        case 3:
          result = _a.sent();
          if (result.success) {
            processed++;
          } else {
            failed++;
            errors.push({
              post_id: postId,
              error: result.error || "Unknown error",
            });
          }
          return [3 /*break*/, 5];
        case 4:
          error_6 = _a.sent();
          failed++;
          errors.push({
            post_id: postId,
            error: error_6.message || "Unknown error",
          });
          return [3 /*break*/, 5];
        case 5:
          _i++;
          return [3 /*break*/, 1];
        case 6:
          // Log batch operation results
          loggingService_1.logger.info("Batch schedule posts completed", {
            total: postIds.length,
            processed: processed,
            failed: failed,
          });
          if (processed > 0) {
            sonner_1.toast.success(
              "Successfully scheduled ".concat(processed, " posts"),
            );
          }
          if (failed > 0) {
            sonner_1.toast.error(
              "Failed to schedule ".concat(failed, " posts"),
            );
          }
          return [
            2 /*return*/,
            {
              success: failed === 0,
              processed: processed,
              failed: failed,
              error_details: errors,
            },
          ];
      }
    });
  });
}
function postToSocialMedia(platform, content) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      try {
        // Mock implementation: Replace with actual API calls
        if (platform === "twitter") {
          loggingService_1.logger.info("Posting to Twitter: ".concat(content));
        } else if (platform === "facebook") {
          loggingService_1.logger.info("Posting to Facebook: ".concat(content));
        } else {
          throw new Error("Unsupported platform: ".concat(platform));
        }
        return [2 /*return*/, { success: true }];
      } catch (error) {
        return [
          2 /*return*/,
          {
            success: false,
            error: error.message || "An unexpected error occurred",
          },
        ];
      }
      return [2 /*return*/];
    });
  });
}
// Example of validateCreatePost function return type
function validateCreatePost(input) {
  // ...validation logic...
  return {
    valid: true, // or false based on validation
    data: input, // sanitized data
    errors: {}, // or validation errors
  };
}
// Example of validateUpdatePost function return type
function validateUpdatePost(input) {
  // ...validation logic...
  return {
    valid: true, // or false based on validation
    data: input, // sanitized data
    errors: {}, // or validation errors
  };
}
