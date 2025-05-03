import { serve } from 'std/server';
import { createClient } from '@supabase/supabase-js';

serve(async (req) => {
  const { strategy_id, changes, version } = await req.json();
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  const { error } = await supabase.from('strategy_versions').insert([{ strategy_id, version, changes }]);
  return new Response(JSON.stringify({ ok: !error }), { status: error ? 500 : 200 });
});
