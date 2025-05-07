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
import { PostsDisplay } from "../PostsDisplay";
import { Card, CardContent } from "@/components/ui/card";
import SocialMediaPostForm from "../SocialMediaPostForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
    // Delete handler
    const handleDeletePost = (postId) => __awaiter(this, void 0, void 0, function* () {
        yield deletePost(postId);
    });
    // Schedule handler
    const handleSchedulePost = (postId) => __awaiter(this, void 0, void 0, function* () {
        yield schedule(postId);
    });
    // Approve handler
    const handleApprovePost = (postId) => __awaiter(this, void 0, void 0, function* () {
        yield approve(postId);
    });
    return (_jsx(Card, { children: _jsxs(CardContent, { className: "p-0 md:p-6", children: [_jsx(PostsDisplay, { view: view, posts: posts, currentMonth: currentMonth, isLoading: loading, error: error ? new Error(error) : null, onEditPost: handleEditPost, onDeletePost: handleDeletePost, onSchedulePost: handleSchedulePost, onApprovePost: handleApprovePost, onCreatePost: openCreateDialog, onRefresh: refreshPosts }), _jsx(Dialog, { open: isCreateDialogOpen, onOpenChange: (open) => !open && closeCreateDialog(), children: _jsx(DialogContent, { children: _jsx(SocialMediaPostForm, { onSubmit: handleCreateSubmit, isSubmitting: loading, onClose: closeCreateDialog }) }) }), _jsx(Dialog, { open: isEditDialogOpen, onOpenChange: (open) => !open && closeEditDialog(), children: _jsx(DialogContent, { children: editPost && (_jsx(SocialMediaPostForm, { post: editPost, onSubmit: handleEditSubmit, isSubmitting: loading, onClose: closeEditDialog })) }) })] }) }));
}
