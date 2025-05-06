"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListView = ListView;
var jsx_runtime_1 = require("react/jsx-runtime");
var PostCard_1 = require("./PostCard");
function ListView(_a) {
  var posts = _a.posts,
    onEditPost = _a.onEditPost,
    onDeletePost = _a.onDeletePost,
    onSchedulePost = _a.onSchedulePost,
    onApprovePost = _a.onApprovePost;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
    children: posts.map(function (post) {
      return (0, jsx_runtime_1.jsx)(
        PostCard_1.PostCard,
        {
          post: post,
          onEdit: function () {
            return onEditPost(post);
          },
          onDelete: function () {
            return onDeletePost(post.id);
          },
          onSchedule: function () {
            return onSchedulePost(post.id);
          },
          onApprove: function () {
            return onApprovePost(post.id);
          },
        },
        post.id,
      );
    }),
  });
}
