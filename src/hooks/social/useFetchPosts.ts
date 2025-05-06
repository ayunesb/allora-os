import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SocialMediaPost, SocialMediaCalendarFilters } from "@/types";
import { toast } from "sonner";

interface UseFetchPostsOptions {
  initialFilters?: SocialMediaCalendarFilters;
  enabled?: boolean;
}

const useFetchPosts = (options: UseFetchPostsOptions = {}) => {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SocialMediaCalendarFilters>(
    options.initialFilters || {},
  );

  const fetchPosts = useCallback(
    async (newFilters?: SocialMediaCalendarFilters) => {
      const activeFilters = newFilters || filters;
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching posts with filters:", activeFilters);

        let query = supabase.from("social_media_posts").select("*");

        // Apply filters
        if (activeFilters.platform) {
          query = query.eq("platform", activeFilters.platform);
        }

        if (activeFilters.content_type) {
          query = query.eq("content_type", activeFilters.content_type);
        }

        if (activeFilters.status) {
          query = query.eq("status", activeFilters.status);
        }

        if (activeFilters.campaign_id) {
          query = query.eq("campaign_id", activeFilters.campaign_id);
        }

        if (activeFilters.search_query || activeFilters.search) {
          const searchTerm = activeFilters.search_query || activeFilters.search;
          query = query.or(
            `title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`,
          );
        }

        const dateRange = activeFilters.dateRange || activeFilters.date_range;
        if (dateRange && dateRange[0] && dateRange[1]) {
          query = query.gte("scheduled_date", dateRange[0].toISOString());
          query = query.lte("scheduled_date", dateRange[1].toISOString());
        }

        const { data, error } = await query.order("scheduled_date", {
          ascending: true,
        });

        if (error) throw error;

        console.log("Fetched posts:", data);
        setPosts(data as SocialMediaPost[]);
      } catch (err) {
        console.error("Error fetching social media posts:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
        toast.error("Failed to load social media posts");
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  const updateFilters = useCallback(
    (newFilters: SocialMediaCalendarFilters) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Initial fetch
  useEffect(() => {
    if (options.enabled !== false) {
      fetchPosts();
    }
  }, [fetchPosts, options.enabled]);

  return {
    posts,
    loading,
    isLoading: loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    fetchPosts,
    refreshPosts: fetchPosts,
  };
};

export default useFetchPosts;
