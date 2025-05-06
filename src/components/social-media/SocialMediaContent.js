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
exports.SocialMediaContent = SocialMediaContent;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useSocialMedia_1 = require("@/hooks/useSocialMedia");
var card_1 = require("@/components/ui/card");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function SocialMediaContent() {
  var _this = this;
  var _a = (0, useSocialMedia_1.useSocialMedia)(),
    posts = _a.posts,
    loading = _a.loading,
    error = _a.error,
    view = _a.view,
    currentMonth = _a.currentMonth,
    createPost = _a.createPost,
    updatePost = _a.updatePost,
    deletePost = _a.deletePost,
    schedule = _a.schedule,
    approve = _a.approve,
    refreshPosts = _a.refreshPosts,
    isCreateDialogOpen = _a.isCreateDialogOpen,
    openCreateDialog = _a.openCreateDialog,
    closeCreateDialog = _a.closeCreateDialog;
  var _b = (0, react_1.useState)(null),
    editPost = _b[0],
    setEditPost = _b[1];
  var _c = (0, react_1.useState)(false),
    isEditDialogOpen = _c[0],
    setIsEditDialogOpen = _c[1];
  // Handle edit post
  var handleEditPost = function (post) {
    setEditPost(post);
    setIsEditDialogOpen(true);
  };
  // Close edit dialog
  var closeEditDialog = function () {
    setIsEditDialogOpen(false);
    setEditPost(null);
  };
  // Submit handler for post creation
  var handleCreateSubmit = function (formData) {
    return __awaiter(_this, void 0, void 0, function () {
      var err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, createPost(formData)];
          case 1:
            _a.sent();
            return [2 /*return*/, { success: true }];
          case 2:
            err_1 = _a.sent();
            return [
              2 /*return*/,
              { success: false, error: "Failed to create post" },
            ];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  // Submit handler for post editing
  var handleEditSubmit = function (formData) {
    return __awaiter(_this, void 0, void 0, function () {
      var err_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            if (!editPost)
              return [
                2 /*return*/,
                { success: false, error: "No post to edit" },
              ];
            return [4 /*yield*/, updatePost(editPost.id, formData)];
          case 1:
            _a.sent();
            closeEditDialog();
            return [2 /*return*/, { success: true }];
          case 2:
            err_2 = _a.sent();
            return [
              2 /*return*/,
              { success: false, error: "Failed to update post" },
            ];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  // Placeholder renderer for posts display
  var renderPosts = function () {
    if (loading) {
      return (0, jsx_runtime_1.jsx)("div", {
        className: "p-6 text-center",
        children: "Loading posts...",
      });
    }
    if (error) {
      return (0, jsx_runtime_1.jsx)("div", {
        className: "p-6 text-center text-red-500",
        children: error,
      });
    }
    if (posts.length === 0) {
      return (0, jsx_runtime_1.jsxs)("div", {
        className: "p-6 text-center",
        children: [
          (0, jsx_runtime_1.jsx)("p", {
            className: "mb-4 text-muted-foreground",
            children: "No posts found.",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: openCreateDialog,
            children: "Create your first post",
          }),
        ],
      });
    }
    return (0, jsx_runtime_1.jsx)("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4",
      children: posts.map(function (post) {
        return (0, jsx_runtime_1.jsxs)(
          "div",
          {
            className: "border rounded-lg p-4 shadow-sm",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "font-bold",
                children: post.title,
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-sm text-muted-foreground mb-2",
                children: post.platform,
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "mb-4",
                children: post.content,
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-end gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    size: "sm",
                    variant: "outline",
                    onClick: function () {
                      return handleEditPost(post);
                    },
                    children: "Edit",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    size: "sm",
                    variant: "destructive",
                    onClick: function () {
                      return deletePost(post.id);
                    },
                    children: "Delete",
                  }),
                ],
              }),
            ],
          },
          post.id,
        );
      }),
    });
  };
  // Placeholder component for the form
  var SocialMediaPostForm = function (_a) {
    var post = _a.post,
      onSubmit = _a.onSubmit,
      isSubmitting = _a.isSubmitting,
      onClose = _a.onClose;
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "space-y-4",
      children: [
        (0, jsx_runtime_1.jsx)("h2", {
          className: "text-lg font-bold",
          children: post ? "Edit Post" : "Create Post",
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "space-y-2",
          children: (0, jsx_runtime_1.jsx)("div", {
            children: "Form fields would go here",
          }),
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-end gap-2",
          children: [
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              onClick: onClose,
              children: "Cancel",
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              disabled: isSubmitting,
              onClick: function () {
                return onSubmit({});
              },
              children: isSubmitting ? "Saving..." : "Save",
            }),
          ],
        }),
      ],
    });
  };
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
      className: "p-0 md:p-6",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center p-4 border-b",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "outline",
                  size: "sm",
                  onClick: function () {
                    return refreshPosts && refreshPosts();
                  },
                  disabled: loading,
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                      className: "h-4 w-4 mr-1",
                    }),
                    "Refresh",
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex border rounded-md",
                  children: [
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: view === "calendar" ? "default" : "ghost",
                      size: "sm",
                      className: "rounded-r-none",
                      children: (0, jsx_runtime_1.jsx)(
                        lucide_react_1.CalendarDays,
                        { className: "h-4 w-4" },
                      ),
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: view === "list" ? "default" : "ghost",
                      size: "sm",
                      className: "rounded-l-none",
                      children: (0, jsx_runtime_1.jsx)(lucide_react_1.List, {
                        className: "h-4 w-4",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              onClick: openCreateDialog,
              size: "sm",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                  className: "h-4 w-4 mr-2",
                }),
                "New Post",
              ],
            }),
          ],
        }),
        renderPosts(),
        (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
          open: isCreateDialogOpen,
          onOpenChange: function (open) {
            return !open && closeCreateDialog();
          },
          children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, {
            children: (0, jsx_runtime_1.jsx)(SocialMediaPostForm, {
              onSubmit: handleCreateSubmit,
              isSubmitting: loading,
              onClose: closeCreateDialog,
            }),
          }),
        }),
        (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
          open: isEditDialogOpen,
          onOpenChange: function (open) {
            return !open && closeEditDialog();
          },
          children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, {
            children:
              editPost &&
              (0, jsx_runtime_1.jsx)(SocialMediaPostForm, {
                post: editPost,
                onSubmit: handleEditSubmit,
                isSubmitting: loading,
                onClose: closeEditDialog,
              }),
          }),
        }),
      ],
    }),
  });
}
