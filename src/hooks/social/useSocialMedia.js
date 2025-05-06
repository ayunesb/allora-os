"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
var useFetchPosts_1 = require("./useFetchPosts");
var useSocialMedia = function () {
  var _a = (0, react_1.useState)("calendar"),
    view = _a[0],
    setView = _a[1];
  var _b = (0, react_1.useState)(new Date()),
    currentMonth = _b[0],
    setCurrentMonth = _b[1];
  var _c = (0, react_1.useState)(""),
    searchQuery = _c[0],
    setSearchQuery = _c[1];
  var _d = (0, react_1.useState)(""),
    selectedPlatform = _d[0],
    setSelectedPlatform = _d[1];
  var _e = (0, react_1.useState)(""),
    selectedStatus = _e[0],
    setSelectedStatus = _e[1];
  var _f = (0, react_1.useState)(false),
    isCreateDialogOpen = _f[0],
    setIsCreateDialogOpen = _f[1];
  var _g = (0, useFetchPosts_1.default)({ enabled: true }),
    posts = _g.posts,
    loading = _g.loading,
    isLoading = _g.isLoading,
    error = _g.error,
    filters = _g.filters,
    updateFilters = _g.updateFilters,
    clearFilters = _g.clearFilters,
    fetchPosts = _g.fetchPosts,
    refreshPosts = _g.refreshPosts;
  var openCreateDialog = (0, react_1.useCallback)(function () {
    setIsCreateDialogOpen(true);
  }, []);
  var closeCreateDialog = (0, react_1.useCallback)(function () {
    setIsCreateDialogOpen(false);
  }, []);
  var setPostFilters = (0, react_1.useCallback)(
    function (filters) {
      updateFilters(filters);
      fetchPosts(filters);
    },
    [updateFilters, fetchPosts],
  );
  var createPost = (0, react_1.useCallback)(
    function (postData) {
      return __awaiter(void 0, void 0, void 0, function () {
        var newPost, error_1, err_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3, , 4]);
              newPost = __assign(
                {
                  title: postData.title || "",
                  content: postData.content || "",
                  platform: postData.platform || "LinkedIn",
                  content_type: postData.content_type || "text",
                  scheduled_date:
                    postData.scheduled_date || new Date().toISOString(),
                  publish_time: postData.publish_time || "09:00",
                  status: "draft",
                  is_approved: false,
                },
                postData,
              );
              return [
                4 /*yield*/,
                client_1.supabase.from("social_media_posts").insert(newPost),
              ];
            case 1:
              error_1 = _a.sent().error;
              if (error_1) throw error_1;
              sonner_1.toast.success("Post created successfully");
              return [4 /*yield*/, fetchPosts()];
            case 2:
              _a.sent();
              closeCreateDialog();
              return [3 /*break*/, 4];
            case 3:
              err_1 = _a.sent();
              console.error("Error creating post:", err_1);
              sonner_1.toast.error(
                err_1 instanceof Error
                  ? err_1.message
                  : "Failed to create post",
              );
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [fetchPosts, closeCreateDialog],
  );
  var updatePost = (0, react_1.useCallback)(
    function (postId, updatedData) {
      return __awaiter(void 0, void 0, void 0, function () {
        var error_2, err_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3, , 4]);
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("social_media_posts")
                  .update(updatedData)
                  .eq("id", postId),
              ];
            case 1:
              error_2 = _a.sent().error;
              if (error_2) throw error_2;
              sonner_1.toast.success("Post updated successfully");
              return [4 /*yield*/, fetchPosts()];
            case 2:
              _a.sent();
              return [3 /*break*/, 4];
            case 3:
              err_2 = _a.sent();
              console.error("Error updating post:", err_2);
              sonner_1.toast.error(
                err_2 instanceof Error
                  ? err_2.message
                  : "Failed to update post",
              );
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [fetchPosts],
  );
  var deletePost = (0, react_1.useCallback)(
    function (postId) {
      return __awaiter(void 0, void 0, void 0, function () {
        var error_3, err_3;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3, , 4]);
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("social_media_posts")
                  .delete()
                  .eq("id", postId),
              ];
            case 1:
              error_3 = _a.sent().error;
              if (error_3) throw error_3;
              sonner_1.toast.success("Post deleted successfully");
              return [4 /*yield*/, fetchPosts()];
            case 2:
              _a.sent();
              return [3 /*break*/, 4];
            case 3:
              err_3 = _a.sent();
              console.error("Error deleting post:", err_3);
              sonner_1.toast.error(
                err_3 instanceof Error
                  ? err_3.message
                  : "Failed to delete post",
              );
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [fetchPosts],
  );
  var approve = (0, react_1.useCallback)(
    function (postId) {
      return __awaiter(void 0, void 0, void 0, function () {
        var error_4, err_4;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3, , 4]);
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("social_media_posts")
                  .update({ is_approved: true })
                  .eq("id", postId),
              ];
            case 1:
              error_4 = _a.sent().error;
              if (error_4) throw error_4;
              sonner_1.toast.success("Post approved successfully");
              return [4 /*yield*/, fetchPosts()];
            case 2:
              _a.sent();
              return [3 /*break*/, 4];
            case 3:
              err_4 = _a.sent();
              console.error("Error approving post:", err_4);
              sonner_1.toast.error(
                err_4 instanceof Error
                  ? err_4.message
                  : "Failed to approve post",
              );
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [fetchPosts],
  );
  var schedule = (0, react_1.useCallback)(
    function (postId, scheduledDate) {
      return __awaiter(void 0, void 0, void 0, function () {
        var updateData, error_5, err_5;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 3, , 4]);
              updateData = { status: "scheduled" };
              if (scheduledDate) {
                updateData.scheduled_date = scheduledDate;
              }
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("social_media_posts")
                  .update(updateData)
                  .eq("id", postId),
              ];
            case 1:
              error_5 = _a.sent().error;
              if (error_5) throw error_5;
              sonner_1.toast.success("Post scheduled successfully");
              return [4 /*yield*/, fetchPosts()];
            case 2:
              _a.sent();
              return [3 /*break*/, 4];
            case 3:
              err_5 = _a.sent();
              console.error("Error scheduling post:", err_5);
              sonner_1.toast.error(
                err_5 instanceof Error
                  ? err_5.message
                  : "Failed to schedule post",
              );
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [fetchPosts],
  );
  return {
    posts: posts,
    loading: loading,
    isLoading: isLoading,
    error: error,
    view: view,
    currentMonth: currentMonth,
    searchQuery: searchQuery,
    selectedPlatform: selectedPlatform,
    selectedStatus: selectedStatus,
    setView: setView,
    setCurrentMonth: setCurrentMonth,
    setSearchQuery: setSearchQuery,
    setSelectedPlatform: setSelectedPlatform,
    setSelectedStatus: setSelectedStatus,
    setPostFilters: setPostFilters,
    clearFilters: clearFilters,
    isCreateDialogOpen: isCreateDialogOpen,
    openCreateDialog: openCreateDialog,
    closeCreateDialog: closeCreateDialog,
    createPost: createPost,
    updatePost: updatePost,
    deletePost: deletePost,
    approve: approve,
    schedule: schedule,
    fetchPosts: fetchPosts,
    refreshPosts: refreshPosts,
  };
};
exports.default = useSocialMedia;
