import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SocialMediaPostForm = ({ post, onSubmit, isSubmitting, onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implementation here
        onSubmit({
            title: "Test post",
            content: "Test content",
            platform: "LinkedIn",
            scheduled_date: "2025-05-01",
            publish_time: "09:00",
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: post ? "Edit Post" : "Create New Post" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "title", className: "block text-sm font-medium", children: "Title" }), _jsx("input", { id: "title", className: "mt-1 block w-full rounded-md border border-gray-300 p-2", defaultValue: (post === null || post === void 0 ? void 0 : post.title) || "" })] }), _jsxs("div", { className: "flex justify-end gap-2", children: [onClose && (_jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 border rounded-md", children: "Cancel" })), _jsx("button", { type: "submit", disabled: isSubmitting, className: "px-4 py-2 bg-primary text-primary-foreground rounded-md", children: isSubmitting ? "Saving..." : post ? "Update" : "Create" })] })] })] }));
};
export default SocialMediaPostForm;
