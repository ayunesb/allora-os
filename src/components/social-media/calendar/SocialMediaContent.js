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
var PostsDisplay_1 = require("../PostsDisplay");
var card_1 = require("@/components/ui/card");
var SocialMediaPostForm_1 = require("../SocialMediaPostForm");
var dialog_1 = require("@/components/ui/dialog");
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
  // Delete handler
  var handleDeletePost = function (postId) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, deletePost(postId)];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  // Schedule handler
  var handleSchedulePost = function (postId) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, schedule(postId)];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  // Approve handler
  var handleApprovePost = function (postId) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, approve(postId)];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
      className: "p-0 md:p-6",
      children: [
        (0, jsx_runtime_1.jsx)(PostsDisplay_1.PostsDisplay, {
          view: view,
          posts: posts,
          currentMonth: currentMonth,
          isLoading: loading,
          error: error ? new Error(error) : null,
          onEditPost: handleEditPost,
          onDeletePost: handleDeletePost,
          onSchedulePost: handleSchedulePost,
          onApprovePost: handleApprovePost,
          onCreatePost: openCreateDialog,
          onRefresh: refreshPosts,
        }),
        (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
          open: isCreateDialogOpen,
          onOpenChange: function (open) {
            return !open && closeCreateDialog();
          },
          children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, {
            children: (0, jsx_runtime_1.jsx)(SocialMediaPostForm_1.default, {
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
              (0, jsx_runtime_1.jsx)(SocialMediaPostForm_1.default, {
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
