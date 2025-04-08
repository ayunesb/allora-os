
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const SHOPIFY_API_KEY = Deno.env.get("SHOPIFY_API_KEY") || "";
const SHOPIFY_API_SECRET = Deno.env.get("SHOPIFY_API_SECRET") || "";
const SHOPIFY_SHOP_DOMAIN = Deno.env.get("SHOPIFY_SHOP_DOMAIN") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get the authorization header
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "No authorization header" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  // Initialize supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        Authorization: authHeader,
      },
    },
  });

  try {
    // Get the current user from the auth header
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Get the request body
    const { action, productId, productData, customerId, variantId, quantity, checkoutId, shippingAddress } = await req.json();

    // Generate Shopify admin API access token
    const shopifyAuthString = btoa(`${SHOPIFY_API_KEY}:${SHOPIFY_API_SECRET}`);

    if (action === "list-products") {
      // Get products from Shopify API
      const shopifyResponse = await fetch(`https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/products.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${shopifyAuthString}`
        }
      });

      const shopifyResult = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return new Response(JSON.stringify({ 
          error: "Failed to list products",
          details: shopifyResult 
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({ 
        success: true,
        products: shopifyResult.products
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    else if (action === "get-product") {
      // Validate request
      if (!productId) {
        return new Response(JSON.stringify({ error: "Missing product ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Get product from Shopify API
      const shopifyResponse = await fetch(`https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/products/${productId}.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${shopifyAuthString}`
        }
      });

      const shopifyResult = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return new Response(JSON.stringify({ 
          error: "Failed to get product",
          details: shopifyResult 
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({ 
        success: true,
        product: shopifyResult.product
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    else if (action === "create-product") {
      // Validate request
      if (!productData) {
        return new Response(JSON.stringify({ error: "Missing product data" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Create product using Shopify API
      const shopifyResponse = await fetch(`https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/products.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${shopifyAuthString}`
        },
        body: JSON.stringify({ product: productData })
      });

      const shopifyResult = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return new Response(JSON.stringify({ 
          error: "Failed to create product",
          details: shopifyResult 
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({ 
        success: true,
        product: shopifyResult.product
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    else if (action === "create-checkout") {
      // Validate request
      if (!variantId || !quantity) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Create checkout using Shopify API
      const checkoutData = {
        checkout: {
          line_items: [
            {
              variant_id: variantId,
              quantity: quantity
            }
          ],
          email: user.email
        }
      };

      // Add shipping address if provided
      if (shippingAddress) {
        checkoutData.checkout.shipping_address = shippingAddress;
      }

      const shopifyResponse = await fetch(`https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/checkouts.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${shopifyAuthString}`
        },
        body: JSON.stringify(checkoutData)
      });

      const shopifyResult = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return new Response(JSON.stringify({ 
          error: "Failed to create checkout",
          details: shopifyResult 
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({ 
        success: true,
        checkout: shopifyResult.checkout
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    else if (action === "get-checkout") {
      // Validate request
      if (!checkoutId) {
        return new Response(JSON.stringify({ error: "Missing checkout ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Get checkout from Shopify API
      const shopifyResponse = await fetch(`https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/checkouts/${checkoutId}.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${shopifyAuthString}`
        }
      });

      const shopifyResult = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return new Response(JSON.stringify({ 
          error: "Failed to get checkout",
          details: shopifyResult 
        }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({ 
        success: true,
        checkout: shopifyResult.checkout
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    else {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  } catch (err) {
    console.error(`Shopify API error: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
