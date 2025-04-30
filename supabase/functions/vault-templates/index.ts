
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';

// Initialize the Supabase client
const adminClient = createClient(supabaseUrl, supabaseServiceKey);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get all strategy template drafts
 */
async function getDrafts(req: Request) {
  try {
    // Check if user is admin
    const token = req.headers.get('Authorization')?.replace('Bearer ', '') || '';
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return { error: 'Unauthorized', status: 401 };
    }
    
    // Verify the user is an admin
    const { data: profile, error: profileError } = await adminClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profileError || profile?.role !== 'admin') {
      return { error: 'Forbidden', status: 403 };
    }
    
    // Get strategy templates
    const { data, error } = await adminClient
      .from('strategy_templates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching template drafts:', error);
      return { error: 'Failed to fetch templates', status: 500 };
    }
    
    return { data, status: 200 };
  } catch (err) {
    console.error('Error in getDrafts:', err);
    return { error: 'Internal server error', status: 500 };
  }
}

/**
 * Publish a strategy template
 */
async function publishTemplate(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return { error: 'Missing template ID', status: 400 };
    }
    
    // Check if user is admin
    const token = req.headers.get('Authorization')?.replace('Bearer ', '') || '';
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return { error: 'Unauthorized', status: 401 };
    }
    
    // Verify the user is an admin
    const { data: profile, error: profileError } = await adminClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profileError || profile?.role !== 'admin') {
      return { error: 'Forbidden', status: 403 };
    }
    
    // Update the template
    const { data, error } = await adminClient
      .from('strategy_templates')
      .update({ is_public: true })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error publishing template:', error);
      return { error: 'Failed to publish template', status: 500 };
    }
    
    return { data, status: 200 };
  } catch (err) {
    console.error('Error in publishTemplate:', err);
    return { error: 'Internal server error', status: 500 };
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();
    
    if (req.method === 'GET' && path === 'drafts') {
      const result = await getDrafts(req);
      return new Response(JSON.stringify(result.data || { error: result.error }), {
        status: result.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    if (req.method === 'POST' && path === 'publish') {
      const result = await publishTemplate(req);
      return new Response(JSON.stringify(result.data || { error: result.error }), {
        status: result.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
