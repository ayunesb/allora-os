create or replace function increment_plugin_xp(plugin_id uuid)
returns void as $$
begin
  update plugins
  set xp = xp + 1
  where id = plugin_id;
end;
$$ language plpgsql;
