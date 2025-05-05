-- List tables with RLS enabled
SELECT relname AS table_name
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE relrowsecurity = true
  AND n.nspname = 'public';

-- Find missing tenant_id columns
SELECT table_name
FROM information_schema.columns
WHERE table_schema = 'public'
GROUP BY table_name
HAVING SUM((column_name = 'tenant_id')::int) = 0;

-- Check if audit triggers are attached (example: trigger name = audit_log_trigger)
SELECT event_object_table, trigger_name
FROM information_schema.triggers
WHERE trigger_name ILIKE '%audit%';
