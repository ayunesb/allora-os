var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useSocialMedia } from "@/hooks/useSocialMedia";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw, CalendarDays, List } from "lucide-react";
export function SocialMediaContent() {
    const { posts, loading, error, view, currentMonth, createPost, updatePost, deletePost, schedule, approve, refreshPosts, isCreateDialogOpen, openCreateDialog, closeCreateDialog, } = useSocialMedia();
    const [editPost, setEditPost] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    // Handle edit post
    const handleEditPost = (post) => {
        setEditPost(post);
        setIsEditDialogOpen(true);
    };
    // Close edit dialog
    const closeEditDialog = () => {
        setIsEditDialogOpen(false);
        setEditPost(null);
    };
    // Submit handler for post creation
    const handleCreateSubmit = (formData) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield createPost(formData);
            return { success: true };
        }
        catch (err) {
            return { success: false, error: "Failed to create post" };
        }
    });
    // Submit handler for post editing
    const handleEditSubmit = (formData) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!editPost)
                return { success: false, error: "No post to edit" };
            yield updatePost(editPost.id, formData);
            closeEditDialog();
            return { success: true };
        }
        catch (err) {
            return { success: false, error: "Failed to update post" };
        }
    });
    // Placeholder renderer for posts display
    const renderPosts = () => {
        if (loading) {
            return _jsx("div", { className: "p-6 text-center", children: "Loading posts..." });
        }
        if (error) {
            return _jsx("div", { className: "p-6 text-center text-red-500", children: error });
        }
        if (posts.length === 0) {
            return (_jsxs("div", { className: "p-6 text-center", children: [_jsx("p", { className: "mb-4 text-muted-foreground", children: "No posts found." }), _jsx(Button, { onClick: openCreateDialog, children: "Create your first post" })] }));
        }
        return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4", children: posts.map((post) => (_jsxs("div", { className: "border rounded-lg p-4 shadow-sm", children: [_jsx("h3", { className: "font-bold", children: post.title }), _jsx("p", { className: "text-sm text-muted-foreground mb-2", children: post.platform }), _jsx("p", { className: "mb-4", children: post.content }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => handleEditPost(post), children: "Edit" }), _jsx(Button, { size: "sm", variant: "destructive", onClick: () => deletePost(post.id), children: "Delete" })] })] }, post.id))) }));
    };
    // Placeholder component for the form
    const SocialMediaPostForm = ({ post, onSubmit, isSubmitting, onClose }) => {
        return (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-bold", children: post ? "Edit Post" : "Create Post" }), _jsx("div", { className: "space-y-2", children: _jsx("div", { children: "Form fields would go here" }) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { disabled: isSubmitting, onClick: () => onSubmit({}), children: isSubmitting ? "Saving..." : "Save" })] })] }));
    };
    return (_jsx(Card, { children: _jsxs(CardContent, { className: "p-0 md:p-6", children: [_jsxs("div", { className: "flex justify-between items-center p-4 border-b", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => refreshPosts && refreshPosts(), disabled: loading, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-1" }), "Refresh"] }), _jsxs("div", { className: "flex border rounded-md", children: [_jsx(Button, { variant: view === "calendar" ? "default" : "ghost", size: "sm", className: "rounded-r-none", children: _jsx(CalendarDays, { className: "h-4 w-4" }) }), _jsx(Button, { variant: view === "list" ? "default" : "ghost", size: "sm", className: "rounded-l-none", children: _jsx(List, { className: "h-4 w-4" }) })] })] }), _jsxs(Button, { onClick: openCreateDialog, size: "sm", children: [_jsx(PlusCircle, { className: "h-4 w-4 mr-2" }), "New Post"] })] }), renderPosts(), _jsx(Dialog, { open: isCreateDialogOpen, onOpenChange: (open) => !open && closeCreateDialog(), children: _jsx(DialogContent, { children: _jsx(SocialMediaPostForm, { onSubmit: handleCreateSubmit, isSubmitting: loading, onClose: closeCreateDialog }) }) }), _jsx(Dialog, { open: isEditDialogOpen, onOpenChange: (open) => !open && closeEditDialog(), children: _jsx(DialogContent, { children: editPost && (_jsx(SocialMediaPostForm, { post: editPost, onSubmit: handleEditSubmit, isSubmitting: loading, onClose: closeEditDialog })) }) })] }) }));
}
