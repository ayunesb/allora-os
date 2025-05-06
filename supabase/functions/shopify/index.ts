import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const SHOPIFY_API_KEY = Deno.env.get("SHOPIFY_API_KEY") || "";
const SHOPIFY_API_SECRET = Deno.env.get("SHOPIFY_API_SECRET") || "";
const SHOPIFY_SHOP_DOMAIN = Deno.env.get("SHOPIFY_SHOP_DOMAIN") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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
      headers: { ...corsHeaders, "Content-Type": "application/json" },
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
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get the request body
    const {
      action,
      productId,
      productData,
      customerId,
      variantId,
      quantity,
      checkoutId,
      shippingAddress,
      storeId,
    } = await req.json();

    // Generate Shopify admin API access token
    const shopifyAuthString = btoa(`${SHOPIFY_API_KEY}:${SHOPIFY_API_SECRET}`);

    if (action === "list-products") {
      // Get products from Shopify API
      const shopifyResponse = await fetch(
        `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/products.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${shopifyAuthString}`,
          },
        },
      );

      const shopifyResult = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to list products",
            details: shopifyResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          products: shopifyResult.products,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else if (action === "get-product") {
      // Validate request
      if (!productId) {
        return new Response(JSON.stringify({ error: "Missing product ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get product from Shopify API
      const shopifyResponse = await fetch(
        `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/products/${productId}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${shopifyAuthString}`,
          },
        },
      );

      const shopifyResult = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to get product",
            details: shopifyResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          product: shopifyResult.product,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else if (action === "create-product") {
      // Validate request
      if (!productData) {
        return new Response(JSON.stringify({ error: "Missing product data" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Create product using Shopify API
      const shopifyResponse = await fetch(
        `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/products.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${shopifyAuthString}`,
          },
          body: JSON.stringify({ product: productData }),
        },
      );

      const shopifyResult = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to create product",
            details: shopifyResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          product: shopifyResult.product,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else if (action === "get-store-data") {
      // Validate request
      if (!storeId) {
        return new Response(JSON.stringify({ error: "Missing store ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get store data from Shopify API
      const shopifyResponse = await fetch(
        `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/shop.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${shopifyAuthString}`,
          },
        },
      );

      const shopifyResult = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to get store data",
            details: shopifyResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // Now get analytics data
      const analyticsResponse = await fetch(
        `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/reports/sales.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${shopifyAuthString}`,
          },
        },
      );

      const analyticsResult = await analyticsResponse.json();

      // Combine data for a more complete picture
      const storeData = {
        ...shopifyResult.shop,
        orders_count: analyticsResult?.report?.orders_count || 0,
        conversion_rate: calculateConversionRate(
          shopifyResult.shop,
          analyticsResult,
        ),
        average_order_value: calculateAOV(analyticsResult),
      };

      return new Response(
        JSON.stringify({
          success: true,
          store: storeData,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else if (action === "optimize-product-seo") {
      // Validate request
      if (!productId) {
        return new Response(JSON.stringify({ error: "Missing product ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get the product first
      const productResponse = await fetch(
        `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/products/${productId}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${shopifyAuthString}`,
          },
        },
      );

      const productResult = await productResponse.json();

      if (!productResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to get product for SEO optimization",
            details: productResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      const product = productResult.product;

      // Enhance SEO metadata
      const seoUpdates = {
        product: {
          id: product.id,
          metafields_global_title_tag:
            product.title + " | " + shopifyResult?.shop?.name,
          metafields_global_description_tag: generateSeoDescription(product),
          tags: enhanceProductTags(product.tags || ""),
        },
      };

      // Update the product
      const updateResponse = await fetch(
        `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/products/${productId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${shopifyAuthString}`,
          },
          body: JSON.stringify(seoUpdates),
        },
      );

      const updateResult = await updateResponse.json();

      if (!updateResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to optimize product SEO",
            details: updateResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          product: updateResult.product,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else if (action === "optimize-images") {
      // Validate request
      if (!productId) {
        return new Response(JSON.stringify({ error: "Missing product ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // This would typically connect to an image optimization service
      // For this example, we'll just return a success message

      return new Response(
        JSON.stringify({
          success: true,
          message: "Image optimization initiated for product " + productId,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else if (action === "create-checkout") {
      // Validate request
      if (!variantId || !quantity) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // Create checkout using Shopify API
      const checkoutData = {
        checkout: {
          line_items: [
            {
              variant_id: variantId,
              quantity: quantity,
            },
          ],
          email: user.email,
        },
      };

      // Add shipping address if provided
      if (shippingAddress) {
        checkoutData.checkout.shipping_address = shippingAddress;
      }

      const shopifyResponse = await fetch(
        `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/checkouts.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${shopifyAuthString}`,
          },
          body: JSON.stringify(checkoutData),
        },
      );

      const shopifyResult = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to create checkout",
            details: shopifyResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          checkout: shopifyResult.checkout,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else if (action === "get-checkout") {
      // Validate request
      if (!checkoutId) {
        return new Response(JSON.stringify({ error: "Missing checkout ID" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get checkout from Shopify API
      const shopifyResponse = await fetch(
        `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2023-04/checkouts/${checkoutId}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${shopifyAuthString}`,
          },
        },
      );

      const shopifyResult = await shopifyResponse.json();

      if (!shopifyResponse.ok) {
        return new Response(
          JSON.stringify({
            error: "Failed to get checkout",
            details: shopifyResult,
          }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          checkout: shopifyResult.checkout,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } else {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    console.error(`Shopify API error: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

/**
 * Helper function to calculate conversion rate
 */
function calculateConversionRate(shop: any, analytics: any) {
  if (!shop || !analytics || !analytics.report) {
    return 0;
  }

  const visitCount = analytics.report.visits || 0;
  const orderCount = analytics.report.orders_count || 0;

  if (visitCount === 0) {
    return 0;
  }

  return orderCount / visitCount;
}

/**
 * Helper function to calculate average order value
 */
function calculateAOV(analytics: any) {
  if (!analytics || !analytics.report) {
    return 0;
  }

  const totalSales = analytics.report.sales || 0;
  const orderCount = analytics.report.orders_count || 0;

  if (orderCount === 0) {
    return 0;
  }

  return totalSales / orderCount;
}

/**
 * Generate an SEO-friendly description
 */
function generateSeoDescription(product: any) {
  if (!product) {
    return "";
  }

  // Start with existing description or create one from title
  let description = product.body_html
    ? stripHtmlTags(product.body_html)
    : `Buy ${product.title} from our store.`;

  // Limit to 160 characters for SEO best practices
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }

  return description;
}

/**
 * Strip HTML tags from a string
 */
function stripHtmlTags(html: string) {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

/**
 * Enhance product tags for better searchability
 */
function enhanceProductTags(existingTags: string) {
  // This is a simple example - in a real app this might use AI or more complex logic
  const existingTagArray = existingTags.split(", ");

  // Add some common converting tags if they don't exist
  const enhancementTags = ["sale", "best-seller", "featured"];

  enhancementTags.forEach((tag) => {
    if (!existingTagArray.includes(tag)) {
      existingTagArray.push(tag);
    }
  });

  return existingTagArray.join(", ");
}
