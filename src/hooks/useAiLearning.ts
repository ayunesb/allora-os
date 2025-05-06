import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

type FeedbackType = "positive" | "negative";

export function useAiLearning() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Submit feedback for a bot response
  const submitFeedback = useCallback(
    async (
      botName: string,
      botRole: string,
      isPositive: boolean,
      interactionId?: string,
      messageId?: string,
      comment?: string,
      topics?: string[],
    ) => {
      if (!user?.id) return false;

      setIsSubmitting(true);
      try {
        // Insert the feedback record
        const { error } = await supabase.from("user_feedback").insert([
          {
            user_id: user.id,
            bot_name: botName,
            bot_role: botRole,
            is_positive: isPositive,
            interaction_id: interactionId,
            message_id: messageId,
            comment,
            metadata: {
              topics,
              timestamp: new Date().toISOString(),
            },
          },
        ]);

        if (error) throw error;

        // Update the learning model
        await updateLearningModel(
          botName,
          botRole,
          isPositive ? "positive" : "negative",
          topics,
        );

        return true;
      } catch (error) {
        console.error("Error submitting feedback:", error);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [user],
  );

  // Update the learning model for a bot
  const updateLearningModel = useCallback(
    async (
      botName: string,
      botRole: string,
      feedbackType: FeedbackType,
      topics?: string[],
    ) => {
      try {
        // First, check if a learning model exists for this bot
        const { data, error } = await supabase
          .from("learning_models")
          .select("*")
          .eq("bot_name", botName)
          .eq("bot_role", botRole)
          .single();

        if (error && error.code !== "PGRST116") {
          // Not found
          throw error;
        }

        // Update counters based on feedback type
        const counters =
          feedbackType === "positive"
            ? {
                positive_feedback_count:
                  (data?.positive_feedback_count || 0) + 1,
              }
            : {
                negative_feedback_count:
                  (data?.negative_feedback_count || 0) + 1,
              };

        // Update topic scores
        const topicsObj = data?.topics || {};

        if (topics && topics.length > 0) {
          topics.forEach((topic) => {
            if (!topicsObj[topic]) {
              topicsObj[topic] = { positive: 0, negative: 0 };
            }

            if (feedbackType === "positive") {
              topicsObj[topic].positive += 1;
            } else {
              topicsObj[topic].negative += 1;
            }
          });
        }

        // If model exists, update it
        if (data) {
          await supabase
            .from("learning_models")
            .update({
              ...counters,
              topics: topicsObj,
              updated_at: new Date().toISOString(),
            })
            .eq("id", data.id);
        } else {
          // Create a new model
          await supabase.from("learning_models").insert([
            {
              bot_name: botName,
              bot_role: botRole,
              positive_feedback_count: feedbackType === "positive" ? 1 : 0,
              negative_feedback_count: feedbackType === "negative" ? 1 : 0,
              topics: topicsObj,
            },
          ]);
        }

        return true;
      } catch (error) {
        console.error("Error updating learning model:", error);
        return false;
      }
    },
    [],
  );

  // Get the learning model for a bot
  const getLearningModel = useCallback(
    async (botName: string, botRole: string) => {
      try {
        const { data, error } = await supabase
          .from("learning_models")
          .select("*")
          .eq("bot_name", botName)
          .eq("bot_role", botRole)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            // Not found
            return null;
          }
          throw error;
        }

        return data;
      } catch (error) {
        console.error("Error retrieving learning model:", error);
        return null;
      }
    },
    [],
  );

  // Get feedback history for a bot
  const getFeedbackHistory = useCallback(
    async (botName: string, botRole?: string, limit: number = 10) => {
      if (!user?.id) return [];

      try {
        let query = supabase
          .from("user_feedback")
          .select("*")
          .eq("user_id", user.id)
          .eq("bot_name", botName)
          .order("created_at", { ascending: false })
          .limit(limit);

        if (botRole) {
          query = query.eq("bot_role", botRole);
        }

        const { data, error } = await query;

        if (error) throw error;

        return data || [];
      } catch (error) {
        console.error("Error retrieving feedback history:", error);
        return [];
      }
    },
    [user],
  );

  // Track feedback - alias for submitFeedback to match the component's expected API
  const trackFeedback = useCallback(
    async (
      interactionId: string | undefined,
      messageId: string | undefined,
      botName: string,
      botRole: string,
      isPositive: boolean,
      comment?: string,
      metadata?: Record<string, any>,
    ) => {
      return submitFeedback(
        botName,
        botRole,
        isPositive,
        interactionId,
        messageId,
        comment,
        metadata?.topic ? [metadata.topic] : undefined,
      );
    },
    [submitFeedback],
  );

  return {
    isSubmitting,
    isLoading,
    submitFeedback,
    getLearningModel,
    getFeedbackHistory,
    trackFeedback,
  };
}
