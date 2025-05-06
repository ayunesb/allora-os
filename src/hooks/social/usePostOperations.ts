import { useState } from "react";
import { useApiClient } from "@/utils/api/enhancedApiClient";
import { toast } from "sonner";

export interface SocialPost {
  id: string;
  title: string;
  content: string;
  platform: "facebook" | "twitter" | "linkedin" | "instagram" | string;
  status: "draft" | "scheduled" | "published" | string;
  scheduled_date?: string;
  published_date?: string;
  media_urls?: string[];
  author_id?: string;
  created_at: string;
  updated_at: string;
}

export function usePostOperations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { execute } = useApiClient();

  const createPost = async (
    postData: Omit<SocialPost, "id" | "created_at" | "updated_at">,
  ): Promise<SocialPost> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await execute<SocialPost>(
        "/api/social-posts",
        "POST",
        postData,
      );
      toast.success("Post created successfully");
      return result;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create post";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (
    id: string,
    postData: Partial<SocialPost>,
  ): Promise<SocialPost> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await execute<SocialPost>(
        `/api/social-posts/${id}`,
        "PUT",
        postData,
      );
      toast.success("Post updated successfully");
      return result;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update post";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await execute<void>(`/api/social-posts/${id}`, "DELETE");
      toast.success("Post deleted successfully");
    } catch (err: any) {
      const errorMessage = err.message || "Failed to delete post";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadMedia = async (file: File): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await execute<{ url: string }>(
        "/api/upload/social-media",
        "POST",
        formData,
        {
          "Content-Type": "multipart/form-data",
        },
      );

      return result.url;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to upload media";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const schedulePost = async (
    id: string,
    scheduledDate: string,
  ): Promise<SocialPost> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await execute<SocialPost>(
        `/api/social-posts/${id}/schedule`,
        "POST",
        {
          scheduled_date: scheduledDate,
        },
      );

      toast.success("Post scheduled successfully");
      return result;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to schedule post";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const publishPost = async (id: string): Promise<SocialPost> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await execute<SocialPost>(
        `/api/social-posts/${id}/publish`,
        "POST",
      );
      toast.success("Post published successfully");
      return result;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to publish post";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getPresignedUrl = async (
    filename: string,
    contentType: string,
  ): Promise<string> => {
    try {
      const result = await execute<{ url: string }>(
        "/api/upload/presigned-url",
        "POST",
        {
          filename,
          contentType,
        },
      );

      return result.url;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to get upload URL";
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

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
