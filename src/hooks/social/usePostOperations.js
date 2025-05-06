var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import { useApiClient } from "@/utils/api/enhancedApiClient";
import { toast } from "sonner";
export function usePostOperations() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { execute } = useApiClient();
    const createPost = (postData) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const result = yield execute("/api/social-posts", "POST", postData);
            toast.success("Post created successfully");
            return result;
        }
        catch (err) {
            const errorMessage = err.message || "Failed to create post";
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    });
    const updatePost = (id, postData) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const result = yield execute(`/api/social-posts/${id}`, "PUT", postData);
            toast.success("Post updated successfully");
            return result;
        }
        catch (err) {
            const errorMessage = err.message || "Failed to update post";
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    });
    const deletePost = (id) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            yield execute(`/api/social-posts/${id}`, "DELETE");
            toast.success("Post deleted successfully");
        }
        catch (err) {
            const errorMessage = err.message || "Failed to delete post";
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    });
    const uploadMedia = (file) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const result = yield execute("/api/upload/social-media", "POST", formData, {
                "Content-Type": "multipart/form-data",
            });
            return result.url;
        }
        catch (err) {
            const errorMessage = err.message || "Failed to upload media";
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    });
    const schedulePost = (id, scheduledDate) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const result = yield execute(`/api/social-posts/${id}/schedule`, "POST", {
                scheduled_date: scheduledDate,
            });
            toast.success("Post scheduled successfully");
            return result;
        }
        catch (err) {
            const errorMessage = err.message || "Failed to schedule post";
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    });
    const publishPost = (id) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const result = yield execute(`/api/social-posts/${id}/publish`, "POST");
            toast.success("Post published successfully");
            return result;
        }
        catch (err) {
            const errorMessage = err.message || "Failed to publish post";
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    });
    const getPresignedUrl = (filename, contentType) => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield execute("/api/upload/presigned-url", "POST", {
                filename,
                contentType,
            });
            return result.url;
        }
        catch (err) {
            const errorMessage = err.message || "Failed to get upload URL";
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    });
    return {
        isLoading,
        error,
        createPost,
        updatePost,
        deletePost,
        uploadMedia,
        schedulePost,
        publishPost,
        getPresignedUrl,
    };
}
