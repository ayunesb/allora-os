
-- Add AI model preferences column to user_preferences table
ALTER TABLE IF EXISTS public.user_preferences
ADD COLUMN ai_model_preferences JSONB DEFAULT '{
  "defaultModel": "gpt-4o-mini",
  "alternativeModels": ["gpt-4o", "claude-3-sonnet-20240229", "gemini-1.5-pro"],
  "enableDebate": true,
  "maxDebateParticipants": 3,
  "enableVectorSearch": true,
  "enableLearning": true
}'::jsonb;
