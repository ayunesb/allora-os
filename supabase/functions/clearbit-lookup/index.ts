// Supabase Edge Function for Clearbit Lookups
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// CORS headers for the response
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { type, query }: { type: string; query: string } = await req.json();
    // console.log(`Received ${type} lookup request for: ${query}`);

    // Get the Clearbit API key from environment
    const clearbitApiKey = Deno.env.get("CLEARBIT_API_KEY");
    if (!clearbitApiKey) {
      throw new Error("CLEARBIT_API_KEY environment variable not set");
    }

    let result: unknown;

    // Perform the appropriate lookup based on type
    if (type === "company") {
      // Company lookup by domain
      const response = await fetch(
        `https://company.clearbit.com/v2/companies/find?domain=${query}`,
        {
          headers: {
            Authorization: `Bearer ${clearbitApiKey}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          return new Response(JSON.stringify({ result: "Company not found" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        throw new Error(`Clearbit API error: ${response.statusText}`);
      }

      const data: {
        name: string;
        domain: string;
        logo: string;
        description: string;
        category?: { industry: string; sector: string };
        metrics?: { employees: number };
        location: string;
        geo?: { country: string };
        tags: string[];
      } = await response.json();
      result = {
        name: data.name,
        domain: data.domain,
        logo: data.logo,
        description: data.description,
        industry: data.category?.industry,
        sector: data.category?.sector,
        employees: data.metrics?.employees,
        location: data.location,
        country: data.geo?.country,
        tags: data.tags,
      };
    } else if (type === "person") {
      // Person lookup by email
      const response = await fetch(
        `https://person.clearbit.com/v2/people/find?email=${query}`,
        {
          headers: {
            Authorization: `Bearer ${clearbitApiKey}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          return new Response(JSON.stringify({ result: "Person not found" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        throw new Error(`Clearbit API error: ${response.statusText}`);
      }

      const data: {
        name?: { fullName: string; givenName: string; familyName: string };
        email: string;
        title: string;
        employment?: { name: string; role: string };
        location: string;
        bio: string;
        avatar: string;
      } = await response.json();
      result = {
        name: data.name?.fullName,
        firstName: data.name?.givenName,
        lastName: data.name?.familyName,
        email: data.email,
        title: data.title,
        company: data.employment?.name,
        role: data.employment?.role,
        location: data.location,
        bio: data.bio,
        avatar: data.avatar,
      };
    } else {
      throw new Error("Invalid lookup type. Must be 'company' or 'person'");
    }

    // console.log("Lookup completed successfully");
    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in clearbit-lookup function:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
