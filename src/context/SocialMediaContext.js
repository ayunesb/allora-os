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
exports.useSocialMedia = exports.SocialMediaProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var sonner_1 = require("sonner");
// Create the context
var SocialMediaContext = (0, react_1.createContext)(undefined);
// Provider component
var SocialMediaProvider = function (_a) {
  var children = _a.children;
  var _b = (0, react_1.useState)([]),
    posts = _b[0],
    setPosts = _b[1];
  var _c = (0, react_1.useState)(true),
    loading = _c[0],
    setLoading = _c[1];
  var _d = (0, react_1.useState)(null),
    error = _d[0],
    setError = _d[1];
  var _e = (0, react_1.useState)("calendar"),
    view = _e[0],
    setView = _e[1];
  var _f = (0, react_1.useState)(new Date()),
    currentMonth = _f[0],
    setCurrentMonth = _f[1];
  var _g = (0, react_1.useState)(false),
    isCreateDialogOpen = _g[0],
    setIsCreateDialogOpen = _g[1];
  // Load posts on mount
  react_1.default.useEffect(function () {
    loadPosts();
  }, []);
  // Load mock posts for demo
  var loadPosts = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var mockPosts, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            setError(null);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // Simulate API call delay
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              }),
            ];
          case 2:
            // Simulate API call delay
            _a.sent();
            mockPosts = [
              {
                id: "1",
                title: "Product Launch Announcement",
                platform: "LinkedIn",
                content:
                  "Excited to announce our new product launch! #innovation #tech",
                content_type: "text",
                status: "published",
                is_approved: true,
                scheduled_date: (0, date_fns_1.formatISO)(new Date()),
                publish_time: "09:00",
                created_at: (0, date_fns_1.formatISO)(
                  new Date(Date.now() - 86400000),
                ),
                updated_at: (0, date_fns_1.formatISO)(new Date()),
                company_id: "123",
                media_urls: [],
                link_url: "",
                tags: ["product", "launch", "announcement"],
              },
              {
                id: "2",
                title: "Weekly Update",
                platform: "Twitter",
                content:
                  "Check out our weekly update on what we've been working on",
                content_type: "image",
                status: "scheduled",
                is_approved: true,
                scheduled_date: (0, date_fns_1.formatISO)(
                  new Date(Date.now() + 86400000 * 2),
                ),
                publish_time: "14:30",
                created_at: (0, date_fns_1.formatISO)(new Date()),
                updated_at: (0, date_fns_1.formatISO)(new Date()),
                company_id: "123",
                media_urls: ["https://via.placeholder.com/300"],
                link_url: "https://example.com/blog",
                tags: ["weekly", "update"],
              },
              {
                id: "3",
                title: "Draft Post",
                platform: "Facebook",
                content: "This is a draft post",
                content_type: "text",
                status: "draft",
                is_approved: false,
                scheduled_date: "",
                publish_time: "",
                created_at: (0, date_fns_1.formatISO)(
                  new Date(Date.now() - 86400000 * 3),
                ),
                updated_at: (0, date_fns_1.formatISO)(new Date()),
                company_id: "123",
                media_urls: [],
                link_url: "",
                tags: ["draft"],
              },
            ];
            setPosts(mockPosts);
            return [3 /*break*/, 5];
          case 3:
            err_1 = _a.sent();
            console.error("Error loading posts:", err_1);
            setError("Failed to load posts. Please try again later.");
            return [3 /*break*/, 5];
          case 4:
            setLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Create a new post
  var createPost = function (postData) {
    return __awaiter(void 0, void 0, void 0, function () {
      var newPost_1, err_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // Simulate API call
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              }),
            ];
          case 2:
            // Simulate API call
            _a.sent();
            newPost_1 = {
              id: "new-".concat(Date.now()),
              title: postData.title || "Untitled Post",
              content: postData.content || "",
              platform: postData.platform || "LinkedIn",
              content_type: postData.content_type || "text",
              status: postData.status || "draft",
              is_approved: postData.is_approved || false,
              scheduled_date: postData.scheduled_date || "",
              publish_time: postData.publish_time || "",
              created_at: (0, date_fns_1.formatISO)(new Date()),
              updated_at: (0, date_fns_1.formatISO)(new Date()),
              company_id: postData.company_id || "123",
              media_urls: postData.media_urls || [],
              link_url: postData.link_url || "",
              tags: postData.tags || [],
              campaign_id: postData.campaign_id,
            };
            setPosts(function (prevPosts) {
              return __spreadArray(
                __spreadArray([], prevPosts, true),
                [newPost_1],
                false,
              );
            });
            closeCreateDialog();
            sonner_1.toast.success("Post created successfully");
            return [3 /*break*/, 5];
          case 3:
            err_2 = _a.sent();
            console.error("Error creating post:", err_2);
            sonner_1.toast.error("Failed to create post");
            throw err_2;
          case 4:
            setLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Update an existing post
  var updatePost = function (id, updates) {
    return __awaiter(void 0, void 0, void 0, function () {
      var err_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // Simulate API call
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              }),
            ];
          case 2:
            // Simulate API call
            _a.sent();
            setPosts(function (prevPosts) {
              return prevPosts.map(function (post) {
                return post.id === id
                  ? __assign(__assign(__assign({}, post), updates), {
                      updated_at: (0, date_fns_1.formatISO)(new Date()),
                    })
                  : post;
              });
            });
            sonner_1.toast.success("Post updated successfully");
            return [3 /*break*/, 5];
          case 3:
            err_3 = _a.sent();
            console.error("Error updating post:", err_3);
            sonner_1.toast.error("Failed to update post");
            throw err_3;
          case 4:
            setLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Delete a post
  var deletePost = function (id) {
    return __awaiter(void 0, void 0, void 0, function () {
      var err_4;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // Simulate API call
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              }),
            ];
          case 2:
            // Simulate API call
            _a.sent();
            setPosts(function (prevPosts) {
              return prevPosts.filter(function (post) {
                return post.id !== id;
              });
            });
            sonner_1.toast.success("Post deleted successfully");
            return [3 /*break*/, 5];
          case 3:
            err_4 = _a.sent();
            console.error("Error deleting post:", err_4);
            sonner_1.toast.error("Failed to delete post");
            throw err_4;
          case 4:
            setLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Schedule a post
  var schedule = function (id) {
    return __awaiter(void 0, void 0, void 0, function () {
      var err_5;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // Simulate API call
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              }),
            ];
          case 2:
            // Simulate API call
            _a.sent();
            setPosts(function (prevPosts) {
              return prevPosts.map(function (post) {
                return post.id === id
                  ? __assign(__assign({}, post), {
                      status: "scheduled",
                      scheduled_date:
                        post.scheduled_date ||
                        (0, date_fns_1.formatISO)(
                          new Date(Date.now() + 86400000),
                        ),
                      updated_at: (0, date_fns_1.formatISO)(new Date()),
                    })
                  : post;
              });
            });
            sonner_1.toast.success("Post scheduled successfully");
            return [3 /*break*/, 5];
          case 3:
            err_5 = _a.sent();
            console.error("Error scheduling post:", err_5);
            sonner_1.toast.error("Failed to schedule post");
            throw err_5;
          case 4:
            setLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Approve a post
  var approve = function (id) {
    return __awaiter(void 0, void 0, void 0, function () {
      var err_6;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // Simulate API call
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1000);
              }),
            ];
          case 2:
            // Simulate API call
            _a.sent();
            setPosts(function (prevPosts) {
              return prevPosts.map(function (post) {
                return post.id === id
                  ? __assign(__assign({}, post), {
                      is_approved: true,
                      updated_at: (0, date_fns_1.formatISO)(new Date()),
                    })
                  : post;
              });
            });
            sonner_1.toast.success("Post approved successfully");
            return [3 /*break*/, 5];
          case 3:
            err_6 = _a.sent();
            console.error("Error approving post:", err_6);
            sonner_1.toast.error("Failed to approve post");
            throw err_6;
          case 4:
            setLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Refresh posts
  var refreshPosts = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, loadPosts()];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  // Dialog control
  var openCreateDialog = function () {
    setIsCreateDialogOpen(true);
  };
  var closeCreateDialog = function () {
    setIsCreateDialogOpen(false);
  };
  return (0, jsx_runtime_1.jsx)(SocialMediaContext.Provider, {
    value: {
      posts: posts,
      loading: loading,
      error: error,
      view: view,
      currentMonth: currentMonth,
      createPost: createPost,
      updatePost: updatePost,
      deletePost: deletePost,
      schedule: schedule,
      approve: approve,
      setView: setView,
      setCurrentMonth: setCurrentMonth,
      refreshPosts: refreshPosts,
      isCreateDialogOpen: isCreateDialogOpen,
      openCreateDialog: openCreateDialog,
      closeCreateDialog: closeCreateDialog,
    },
    children: children,
  });
};
exports.SocialMediaProvider = SocialMediaProvider;
// Custom hook to use the social media context
var useSocialMedia = function () {
  var context = (0, react_1.useContext)(SocialMediaContext);
  if (context === undefined) {
    throw new Error("useSocialMedia must be used within a SocialMediaProvider");
  }
  return context;
};
exports.useSocialMedia = useSocialMedia;
