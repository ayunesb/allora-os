create or replace view public.plugin_xp_totals as
select
  plugin_name,
  sum(value) as total_xp
from public.plugin_logs
where event = 'chat_response'
group by plugin_name;
