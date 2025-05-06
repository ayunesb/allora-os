import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, userId, data } = await req.json();

    switch (action) {
      case "track_feedback": {
        // Track user feedback on an AI response
        const {
          interactionId,
          messageId,
          botName,
          botRole,
          isPositive,
          comment,
          metadata,
        } = data;

        // Store the feedback
        const { error } = await supabase.from("user_feedback").insert({
          user_id: userId,
          interaction_id: interactionId,
          message_id: messageId,
          bot_name: botName,
          bot_role: botRole,
          is_positive: isPositive,
          comment: comment || null,
          metadata: metadata || {},
        });

        if (error) throw error;

        // Update the feedback count in the learning model
        await updateLearningModel(
          supabase,
          botName,
          botRole,
          isPositive,
          metadata?.topic,
        );

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "get_learning_model": {
        // Get the current learning model for a specific bot
        const { botName, botRole } = data;

        const { data: model, error } = await supabase
          .from("learning_models")
          .select("*")
          .eq("bot_name", botName)
          .eq("bot_role", botRole)
          .single();

        if (error && error.code !== "PGRST116") {
          // PGRST116 is "row not found" which is fine
          throw error;
        }

        return new Response(
          JSON.stringify({
            model: model || {
              bot_name: botName,
              bot_role: botRole,
              positive_feedback_count: 0,
              negative_feedback_count: 0,
              topics: {},
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      case "get_user_preferences": {
        // Get learned user preferences based on feedback
        const { data: preferences, error } = await supabase
          .from("user_preferences")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error && error.code !== "PGRST116") {
          // PGRST116 is "row not found" which is fine
          throw error;
        }

        if (!preferences) {
          // If no preferences exist, get them from user actions
          const userPreferences = await getUserPreferences(supabase, userId);
          return new Response(
            JSON.stringify({ preferences: userPreferences }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ preferences }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "update_user_preferences": {
        // Explicitly update user preferences
        const { preferences } = data;

        // Check if preferences already exist
        const { data: existing, error: checkError } = await supabase
          .from("user_preferences")
          .select("id")
          .eq("user_id", userId)
          .single();

        if (checkError && checkError.code !== "PGRST116") {
          throw checkError;
        }

        let error;

        if (existing) {
          // Update existing preferences
          const result = await supabase
            .from("user_preferences")
            .update({
              ...preferences,
              last_updated: new Date().toISOString(),
            })
            .eq("user_id", userId);

          error = result.error;
        } else {
          // Insert new preferences
          const result = await supabase.from("user_preferences").insert({
            user_id: userId,
            ...preferences,
            last_updated: new Date().toISOString(),
          });

          error = result.error;
        }

        if (error) throw error;

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error("Error in learning function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Helper function to update the learning model based on feedback
async function updateLearningModel(
  supabase,
  botName,
  botRole,
  isPositive,
  topic,
) {
  // Get the current model
  const { data: model, error } = await supabase
    .from("learning_models")
    .select("*")
    .eq("bot_name", botName)
    .eq("bot_role", botRole)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "row not found" which is fine
    throw error;
  }

  if (!model) {
    // Create a new model
    const newModel = {
      bot_name: botName,
      bot_role: botRole,
      positive_feedback_count: isPositive ? 1 : 0,
      negative_feedback_count: isPositive ? 0 : 1,
      topics: topic
        ? {
            [topic]: {
              positive: isPositive ? 1 : 0,
              negative: isPositive ? 0 : 1,
            },
          }
        : {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await supabase.from("learning_models").insert(newModel);
  } else {
    // Update the existing model
    const updatedModel = {
      positive_feedback_count: isPositive
        ? model.positive_feedback_count + 1
        : model.positive_feedback_count,
      negative_feedback_count: isPositive
        ? model.negative_feedback_count
        : model.negative_feedback_count + 1,
      updated_at: new Date().toISOString(),
    };

    if (topic) {
      const topics = model.topics || {};
      if (!topics[topic]) {
        topics[topic] = { positive: 0, negative: 0 };
      }

      if (isPositive) {
        topics[topic].positive += 1;
      } else {
        topics[topic].negative += 1;
      }

      updatedModel.topics = topics;
    }

    await supabase
      .from("learning_models")
      .update(updatedModel)
      .eq("bot_name", botName)
      .eq("bot_role", botRole);
  }
}

// Helper function to get user preferences from actions
async function getUserPreferences(supabase, userId) {
  // Analyze user actions to determine preferences
  const { data: actions, error } = await supabase.rpc(
    "get_recent_user_actions",
    {
      p_user_id: userId,
      p_days: 90,
    },
  );

  if (error) throw error;

  // Default preferences
  const preferences = {
    risk_appetite: "medium",
    preferred_executives: [],
    favorite_topics: [],
    communication_style: "balanced",
    activity_peak_times: [],
    dashboard_preferences: {},
    last_updated: new Date().toISOString(),
  };

  if (!actions || actions.length === 0) {
    return preferences;
  }

  // Count executive interactions
  const executiveCounts = {};
  // Count topics
  const topicCounts = {};
  // Count risk levels chosen
  const riskLevels = { low: 0, medium: 0, high: 0 };

  actions.forEach((action) => {
    // Track executive preferences
    if (action.metadata?.executive_name) {
      const name = action.metadata.executive_name;
      executiveCounts[name] = (executiveCounts[name] || 0) + 1;
    }

    // Track topic preferences
    if (action.metadata?.topic) {
      const topic = action.metadata.topic;
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    }

    // Track risk appetite
    if (action.metadata?.risk_level) {
      const risk = action.metadata.risk_level.toLowerCase();
      if (risk in riskLevels) {
        riskLevels[risk] += 1;
      }
    }
  });

  // Determine preferred executives
  preferences.preferred_executives = Object.entries(executiveCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name);

  // Determine favorite topics
  preferences.favorite_topics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topic]) => topic);

  // Determine risk appetite
  const maxRisk = Object.entries(riskLevels).reduce(
    (max, [level, count]) => (count > max.count ? { level, count } : max),
    { level: "medium", count: 0 },
  );

  preferences.risk_appetite = maxRisk.level;

  return preferences;
}
