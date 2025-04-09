
-- Insert a user action (avoid TypeScript issues with direct table access)
CREATE OR REPLACE FUNCTION insert_user_action(
  p_user_id UUID,
  p_action TEXT,
  p_category TEXT,
  p_entity_id TEXT,
  p_entity_type TEXT,
  p_metadata JSONB,
  p_timestamp TIMESTAMP WITH TIME ZONE
) RETURNS VOID AS $$
BEGIN
  INSERT INTO user_actions (
    user_id, 
    action, 
    category, 
    entity_id, 
    entity_type, 
    metadata, 
    timestamp
  )
  VALUES (
    p_user_id, 
    p_action, 
    p_category, 
    p_entity_id, 
    p_entity_type, 
    p_metadata, 
    p_timestamp
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get user actions by user ID within the last N days
CREATE OR REPLACE FUNCTION get_recent_user_actions(
  p_user_id UUID,
  p_days INTEGER
) RETURNS SETOF user_actions AS $$
DECLARE
  cutoff_date TIMESTAMP WITH TIME ZONE;
BEGIN
  cutoff_date := NOW() - (p_days || ' days')::INTERVAL;
  
  RETURN QUERY
  SELECT *
  FROM user_actions
  WHERE user_id = p_user_id
  AND timestamp >= cutoff_date
  ORDER BY timestamp DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get action categories with counts
CREATE OR REPLACE FUNCTION get_user_action_categories(
  p_user_id UUID
) RETURNS TABLE(category TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT ua.category, COUNT(*) as count
  FROM user_actions ua
  WHERE ua.user_id = p_user_id
  GROUP BY ua.category
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get user preferences
CREATE OR REPLACE FUNCTION get_user_preferences(
  p_user_id UUID
) RETURNS user_preferences AS $$
DECLARE
  user_prefs user_preferences;
BEGIN
  SELECT *
  INTO user_prefs
  FROM user_preferences
  WHERE user_id = p_user_id;
  
  RETURN user_prefs;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update user preferences with upsert
CREATE OR REPLACE FUNCTION update_user_preferences(
  p_user_id UUID,
  p_risk_appetite TEXT,
  p_preferred_executives JSONB,
  p_favorite_topics JSONB,
  p_communication_style TEXT,
  p_activity_peak_times JSONB,
  p_dashboard_preferences JSONB,
  p_last_updated TIMESTAMP WITH TIME ZONE
) RETURNS VOID AS $$
BEGIN
  INSERT INTO user_preferences (
    user_id,
    risk_appetite,
    preferred_executives,
    favorite_topics,
    communication_style,
    activity_peak_times,
    dashboard_preferences,
    last_updated
  )
  VALUES (
    p_user_id,
    p_risk_appetite,
    p_preferred_executives,
    p_favorite_topics,
    p_communication_style,
    p_activity_peak_times,
    p_dashboard_preferences,
    p_last_updated
  )
  ON CONFLICT (user_id)
  DO UPDATE SET
    risk_appetite = p_risk_appetite,
    preferred_executives = p_preferred_executives,
    favorite_topics = p_favorite_topics,
    communication_style = p_communication_style,
    activity_peak_times = p_activity_peak_times,
    dashboard_preferences = p_dashboard_preferences,
    last_updated = p_last_updated;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
