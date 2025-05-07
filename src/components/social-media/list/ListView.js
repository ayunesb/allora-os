import { jsx as _jsx } from "react/jsx-runtime";
import { PostCard } from "./PostCard";
export function ListView({ posts, onEditPost, onDeletePost, onSchedulePost, onApprovePost, }) {
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: posts.map((post) => (_jsx(PostCard, { post: post, onEdit: () => onEditPost(post), onDelete: () => onDeletePost(post.id), onSchedule: () => onSchedulePost(post.id), onApprove: () => onApprovePost(post.id) }, post.id))) }));
}
