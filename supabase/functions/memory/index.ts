
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.36.0";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, userId, data } = await req.json();

    switch(action) {
      case 'store_interaction': {
        // Store a new bot interaction in memory
        const { botName, botRole, userMessage, botResponse, feedback, metadata } = data;
        
        const { error } = await supabase
          .from('bot_interactions')
          .insert({
            user_id: userId,
            bot_name: botName,
            bot_role: botRole,
            user_message: userMessage,
            bot_response: botResponse,
            user_feedback: feedback || null,
            metadata: metadata || {},
            embedding: null // This would be populated by a vector embedding in a real implementation
          });
          
        if (error) throw error;
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      case 'get_relevant_memory': {
        // Retrieve relevant memory based on user's current context
        const { query, botName, botRole, limit = 5 } = data;
        
        // In a real implementation, this would use vector similarity search
        // For now, we'll just retrieve recent interactions with the same bot
        const { data: memories, error } = await supabase
          .from('bot_interactions')
          .select('*')
          .eq('user_id', userId)
          .eq('bot_name', botName)
          .eq('bot_role', botRole)
          .order('created_at', { ascending: false })
          .limit(limit);
          
        if (error) throw error;
        
        return new Response(JSON.stringify({ 
          memories: memories || [],
          relevance_score: 0.85 // Placeholder for a real relevance score
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      case 'update_feedback': {
        // Update feedback on a specific interaction
        const { interactionId, feedback } = data;
        
        const { error } = await supabase
          .from('bot_interactions')
          .update({ user_feedback: feedback })
          .eq('id', interactionId);
          
        if (error) throw error;
        
        // Also store this in the user_actions table for learning
        await supabase.rpc('insert_user_action', {
          p_user_id: userId,
          p_action: 'feedback',
          p_category: 'bot_interaction',
          p_entity_id: interactionId,
          p_entity_type: 'interaction',
          p_metadata: { feedback },
          p_timestamp: new Date().toISOString()
        });
        
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      case 'get_learning_insights': {
        // Get learning insights based on feedback
        const { data: insights, error } = await supabase
          .from('bot_interactions')
          .select('bot_name, bot_role, user_message, user_feedback, metadata')
          .eq('user_id', userId)
          .not('user_feedback', 'is', null)
          .order('created_at', { ascending: false })
          .limit(100);
          
        if (error) throw error;
        
        // Process insights to find patterns (simplified)
        const positiveInteractions = insights?.filter(i => i.user_feedback === 'positive') || [];
        const negativeInteractions = insights?.filter(i => i.user_feedback === 'negative') || [];
        
        // Identify topics with positive/negative feedback
        const positiveTopic = positiveInteractions.length > 0 ? extractTopic(positiveInteractions[0].user_message) : '';
        const negativeTopic = negativeInteractions.length > 0 ? extractTopic(negativeInteractions[0].user_message) : '';
        
        return new Response(JSON.stringify({ 
          insightsSummary: {
            positiveInteractions: positiveInteractions.length,
            negativeInteractions: negativeInteractions.length,
            positiveTopic,
            negativeTopic,
            // In a real implementation, this would contain more detailed analysis
          },
          rawInsights: insights
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error('Error in memory function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper function to extract topic from a message (simplified)
function extractTopic(message: string): string {
  // In a real implementation, this would use NLP to extract the main topic
  // For now, just return the first 3 words
  return message.split(' ').slice(0, 3).join(' ') + '...';
}
