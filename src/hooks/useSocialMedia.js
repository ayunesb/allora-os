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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSocialMedia = void 0;
var react_1 = require("react");
var sonner_1 = require("sonner");
// Mock data for development
var mockPosts = [
  {
    id: "1",
    title: "Product Launch",
    content: "Excited to announce our new product!",
    platform: "LinkedIn",
    content_type: "text",
    scheduled_date: "2025-05-10",
    publish_time: "09:00",
    media_urls: [],
    link_url: "",
    tags: ["launch", "product"],
    status: "scheduled",
    is_approved: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    company_id: "company-123",
  },
  {
    id: "2",
    title: "Company Update",
    content: "Check out our latest company update!",
    platform: "Twitter",
    content_type: "image",
    scheduled_date: "2025-05-15",
    publish_time: "14:00",
    media_urls: ["/placeholder-image.jpg"],
    link_url: "https://example.com/update",
    tags: ["update", "news"],
    status: "draft",
    is_approved: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    company_id: "company-123",
  },
];
var useSocialMedia = function () {
  var _a = (0, react_1.useState)(mockPosts),
    posts = _a[0],
    setPosts = _a[1];
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    error = _c[0],
    setError = _c[1];
  var _d = (0, react_1.useState)("calendar"),
    view = _d[0],
    setView = _d[1];
  var _e = (0, react_1.useState)(new Date()),
    currentMonth = _e[0],
    setCurrentMonth = _e[1];
  var _f = (0, react_1.useState)(""),
    searchQuery = _f[0],
    setSearchQuery = _f[1];
  var _g = (0, react_1.useState)(""),
    selectedPlatform = _g[0],
    setSelectedPlatform = _g[1];
  var _h = (0, react_1.useState)(""),
    selectedStatus = _h[0],
    setSelectedStatus = _h[1];
  var _j = (0, react_1.useState)(false),
    isCreateDialogOpen = _j[0],
    setIsCreateDialogOpen = _j[1];
  var setPostFilters = (0, react_1.useCallback)(function (filters) {
    if (filters.search_query) setSearchQuery(filters.search_query);
    if (filters.platform) setSelectedPlatform(filters.platform);
    if (filters.status) setSelectedStatus(filters.status);
  }, []);
  var clearFilters = (0, react_1.useCallback)(function () {
    setSearchQuery("");
    setSelectedPlatform("");
    setSelectedStatus("");
  }, []);
  var openCreateDialog = (0, react_1.useCallback)(function () {
    setIsCreateDialogOpen(true);
  }, []);
  var closeCreateDialog = (0, react_1.useCallback)(function () {
    setIsCreateDialogOpen(false);
  }, []);
  var fetchPosts = (0, react_1.useCallback)(function (filters) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        setIsLoading(true);
        setError(null);
        try {
          // In real app, this would be an API call
          setTimeout(function () {
            var filteredPosts = mockPosts.filter(function (post) {
              if (
                (filters === null || filters === void 0
                  ? void 0
                  : filters.search_query) &&
                !post.title
                  .toLowerCase()
                  .includes(filters.search_query.toLowerCase()) &&
                !post.content
                  .toLowerCase()
                  .includes(filters.search_query.toLowerCase())
              ) {
                return false;
              }
              if (
                (filters === null || filters === void 0
                  ? void 0
                  : filters.platform) &&
                post.platform !== filters.platform
              ) {
                return false;
              }
              if (
                (filters === null || filters === void 0
                  ? void 0
                  : filters.status) &&
                post.status !== filters.status
              ) {
                return false;
              }
              return true;
            });
            setPosts(filteredPosts);
            setIsLoading(false);
          }, 500);
        } catch (err) {
          setError("Failed to fetch posts");
          setIsLoading(false);
        }
        return [2 /*return*/];
      });
    });
  }, []);
  var refreshPosts = (0, react_1.useCallback)(
    function () {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                fetchPosts({
                  search_query: searchQuery,
                  platform: selectedPlatform,
                  status: selectedStatus,
                }),
              ];
            case 1:
              _a.sent();
              sonner_1.toast.success("Posts refreshed");
              return [2 /*return*/];
          }
        });
      });
    },
    [fetchPosts, searchQuery, selectedPlatform, selectedStatus],
  );
  var createPost = (0, react_1.useCallback)(
    function (postData) {
      return __awaiter(void 0, void 0, void 0, function () {
        var newPost_1;
        return __generator(this, function (_a) {
          setIsLoading(true);
          try {
            newPost_1 = {
              id: Date.now().toString(),
              title: postData.title || "",
              content: postData.content || "",
              platform: postData.platform,
              content_type: postData.content_type,
              scheduled_date:
                postData.scheduled_date ||
                new Date().toISOString().split("T")[0],
              publish_time: postData.publish_time || "09:00",
              media_urls: postData.media_urls || [],
              link_url: postData.link_url || "",
              tags: postData.tags || [],
              is_approved: false,
              status: "draft",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              company_id: "company-123",
            };
            setPosts(function (prev) {
              return __spreadArray(
                __spreadArray([], prev, true),
                [newPost_1],
                false,
              );
            });
            setIsLoading(false);
            closeCreateDialog();
            sonner_1.toast.success("Post created successfully!");
          } catch (err) {
            setError("Failed to create post");
            setIsLoading(false);
            sonner_1.toast.error("Failed to create post");
          }
          return [2 /*return*/];
        });
      });
    },
    [closeCreateDialog],
  );
  var updatePost = (0, react_1.useCallback)(function (postId, postData) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        setIsLoading(true);
        try {
          // In real app, this would be an API call
          setPosts(function (prev) {
            return prev.map(function (post) {
              return post.id === postId
                ? __assign(__assign({}, post), postData)
                : post;
            });
          });
          setIsLoading(false);
          sonner_1.toast.success("Post updated successfully!");
        } catch (err) {
          setError("Failed to update post");
          setIsLoading(false);
          sonner_1.toast.error("Failed to update post");
        }
        return [2 /*return*/];
      });
    });
  }, []);
  var deletePost = (0, react_1.useCallback)(function (postId) {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        setIsLoading(true);
        try {
          // In real app, this would be an API call
          setPosts(function (prev) {
            return prev.filter(function (post) {
              return post.id !== postId;
            });
          });
          setIsLoading(false);
          sonner_1.toast.success("Post deleted successfully!");
        } catch (err) {
          setError("Failed to delete post");
          setIsLoading(false);
          sonner_1.toast.error("Failed to delete post");
        }
        return [2 /*return*/];
      });
    });
  }, []);
  var approve = (0, react_1.useCallback)(
    function (postId) {
      return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              return [4 /*yield*/, updatePost(postId, { is_approved: true })];
            case 1:
              _a.sent();
              return [3 /*break*/, 3];
            case 2:
              err_1 = _a.sent();
              setError("Failed to approve post");
              sonner_1.toast.error("Failed to approve post");
              return [3 /*break*/, 3];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    },
    [updatePost],
  );
  var schedule = (0, react_1.useCallback)(
    function (postId, scheduledDate) {
      return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, , 3]);
              return [
                4 /*yield*/,
                updatePost(postId, {
                  status: "scheduled",
                  scheduled_date:
                    scheduledDate || new Date().toISOString().split("T")[0],
                }),
              ];
            case 1:
              _a.sent();
              return [3 /*break*/, 3];
            case 2:
              err_2 = _a.sent();
              setError("Failed to schedule post");
              sonner_1.toast.error("Failed to schedule post");
              return [3 /*break*/, 3];
            case 3:
              return [2 /*return*/];
          }
        });
      });
    },
    [updatePost],
  );
  return {
    posts: posts,
    loading: isLoading,
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
exports.useSocialMedia = useSocialMedia;
exports.default = exports.useSocialMedia;
