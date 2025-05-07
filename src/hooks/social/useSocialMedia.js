var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import useFetchPosts from "./useFetchPosts";
const useSocialMedia = () => {
    const [view, setView] = useState("calendar");
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { posts, loading, isLoading, error, filters, updateFilters, clearFilters, fetchPosts, refreshPosts, } = useFetchPosts({ enabled: true });
    const openCreateDialog = useCallback(() => {
        setIsCreateDialogOpen(true);
    }, []);
    const closeCreateDialog = useCallback(() => {
        setIsCreateDialogOpen(false);
    }, []);
    const setPostFilters = useCallback((filters) => {
        updateFilters(filters);
        fetchPosts(filters);
    }, [updateFilters, fetchPosts]);
    const createPost = useCallback((postData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Add default values for required fields if not provided
            const newPost = Object.assign({ title: postData.title || "", content: postData.content || "", platform: postData.platform || "LinkedIn", content_type: postData.content_type || "text", scheduled_date: postData.scheduled_date || new Date().toISOString(), publish_time: postData.publish_time || "09:00", status: "draft", is_approved: false }, postData);
            const { error } = yield supabase
                .from("social_media_posts")
                .insert(newPost);
            if (error)
                throw error;
            toast.success("Post created successfully");
            yield fetchPosts();
            closeCreateDialog();
        }
        catch (err) {
            console.error("Error creating post:", err);
            toast.error(err instanceof Error ? err.message : "Failed to create post");
        }
    }), [fetchPosts, closeCreateDialog]);
    const updatePost = useCallback((postId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("social_media_posts")
                .update(updatedData)
                .eq("id", postId);
            if (error)
                throw error;
            toast.success("Post updated successfully");
            yield fetchPosts();
        }
        catch (err) {
            console.error("Error updating post:", err);
            toast.error(err instanceof Error ? err.message : "Failed to update post");
        }
    }), [fetchPosts]);
    const deletePost = useCallback((postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("social_media_posts")
                .delete()
                .eq("id", postId);
            if (error)
                throw error;
            toast.success("Post deleted successfully");
            yield fetchPosts();
        }
        catch (err) {
            console.error("Error deleting post:", err);
            toast.error(err instanceof Error ? err.message : "Failed to delete post");
        }
    }), [fetchPosts]);
    const approve = useCallback((postId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("social_media_posts")
                .update({ is_approved: true })
                .eq("id", postId);
            if (error)
                throw error;
            toast.success("Post approved successfully");
            yield fetchPosts();
        }
        catch (err) {
            console.error("Error approving post:", err);
            toast.error(err instanceof Error ? err.message : "Failed to approve post");
        }
    }), [fetchPosts]);
    const schedule = useCallback((postId, scheduledDate) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateData = { status: "scheduled" };
            if (scheduledDate) {
                updateData.scheduled_date = scheduledDate;
            }
            const { error } = yield supabase
                .from("social_media_posts")
                .update(updateData)
                .eq("id", postId);
            if (error)
                throw error;
            toast.success("Post scheduled successfully");
            yield fetchPosts();
        }
        catch (err) {
            console.error("Error scheduling post:", err);
            toast.error(err instanceof Error ? err.message : "Failed to schedule post");
        }
    }), [fetchPosts]);
    return {
        posts,
        loading,
        isLoading,
        error,
        view,
        currentMonth,
        searchQuery,
        selectedPlatform,
        selectedStatus,
        setView,
        setCurrentMonth,
        setSearchQuery,
        setSelectedPlatform,
        setSelectedStatus,
        setPostFilters,
        clearFilters,
        isCreateDialogOpen,
        openCreateDialog,
        closeCreateDialog,
        createPost,
        updatePost,
        deletePost,
        approve,
        schedule,
        fetchPosts,
        refreshPosts,
    };
};
export default useSocialMedia;
