-- Add xp and impact_score columns to plugins table
ALTER TABLE plugins ADD COLUMN IF NOT EXISTS xp INT DEFAULT 0;
ALTER TABLE plugins ADD COLUMN IF NOT EXISTS impact_score FLOAT DEFAULT 0;

-- Ensure plugin_logs table tracks plugin_id, timestamp, and usage context
-- (Assumes plugin_logs table already exists)
ALTER TABLE plugin_logs ADD COLUMN IF NOT EXISTS strategy_id UUID;
ALTER TABLE plugin_logs ADD COLUMN IF NOT EXISTS context TEXT;
