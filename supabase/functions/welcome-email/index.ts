import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
  const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
  const POSTMARK_API_KEY = Deno.env.get("POSTMARK_API_KEY") || "";

  if (!POSTMARK_API_KEY) {
    return new Response(
      JSON.stringify({ error: "Postmark API key is not configured" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    // Parse request body
    const { userId } = await req.json();

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get user profile data
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch user profile" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Get company data
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .select("*")
      .eq("id", profile.company_id)
      .single();

    if (companyError && companyError.code !== "PGRST116") {
      console.error("Error fetching company data:", companyError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch company data" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Get user's email from auth
    const { data: userData, error: userError } =
      await supabase.auth.admin.getUserById(userId);

    if (userError || !userData?.user?.email) {
      console.error("Error fetching user data:", userError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch user email" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const userEmail = userData.user.email;
    const firstName = profile.name?.split(" ")[0] || "there";
    const companyName = company?.name || profile.company || "your business";
    const riskAppetite = (
      company?.details?.riskAppetite ||
      profile.risk_appetite ||
      "medium"
    ).toLowerCase();

    // Create an executive team based on the risk appetite
    const executives = getExecutiveTeam(riskAppetite);
    const executivesList = executives
      .map((exec) => `<li>${exec.name} - ${exec.role}</li>`)
      .join("");

    // Create welcome email content
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Welcome to Allora AI</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #4f46e5; }
        h2 { color: #6366f1; }
        .executive-team { background-color: #f9fafb; padding: 15px; border-radius: 5px; }
        .cta-button { display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
        .footer { margin-top: 30px; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <h1>Welcome to Allora AI, ${firstName}!</h1>
      
      <p>We're excited to have you and ${companyName} join our platform. Your AI executive team is ready to help you grow your business with tailored strategies and insights.</p>
      
      <h2>Meet Your Executive Team</h2>
      <div class="executive-team">
        <p>Based on your company profile and risk appetite (${riskAppetite}), we've assembled the following executive team for you:</p>
        <ul>
          ${executivesList}
        </ul>
      </div>
      
      <p>They're already working on strategies for ${companyName} and will have their first recommendations ready for you in your dashboard.</p>
      
      <p>
        <a href="https://app.alloraai.com/dashboard" class="cta-button">View Your Dashboard</a>
      </p>
      
      <p>If you have any questions, you can reply to this email or contact our support team.</p>
      
      <p>Best regards,<br>The Allora AI Team</p>
      
      <div class="footer">
        <p>
          You're receiving this email because you signed up for Allora AI.<br>
          If you no longer wish to receive these emails, you can <a href="https://app.alloraai.com/unsubscribe?id=${userId}">unsubscribe here</a>.
        </p>
      </div>
    </body>
    </html>
    `;

    // Send email using Postmark API
    const response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": POSTMARK_API_KEY,
      },
      body: JSON.stringify({
        From: "welcome@alloraai.com",
        To: userEmail,
        Subject: `Welcome to Allora AI, ${firstName}!`,
        HtmlBody: emailHtml,
        TextBody: `Welcome to Allora AI, ${firstName}! We're excited to have you and ${companyName} join our platform. Your AI executive team is ready to help you grow your business with tailored strategies and insights.`,
        MessageStream: "outbound",
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Postmark API error:", responseData);
      return new Response(
        JSON.stringify({ error: "Failed to send welcome email" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Log the email in the communications table
    const { error: logError } = await supabase.from("communications").insert({
      lead_id: userId,
      type: "email",
      content: "Welcome email",
      status: "sent",
      created_at: new Date().toISOString(),
      channel: "email",
      is_ai_generated: true,
      metadata: {
        email_type: "welcome",
        template: "welcome_email",
        postmark_message_id: responseData.MessageID,
      },
    });

    if (logError) {
      console.error("Error logging email in communications:", logError);
    }

    return new Response(
      JSON.stringify({ success: true, messageId: responseData.MessageID }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error in welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

// Helper function to select executive team based on risk appetite
function getExecutiveTeam(
  riskAppetite: string,
): Array<{ name: string; role: string }> {
  const executives = {
    low: [
      { name: "Warren Buffett", role: "Chief Investment Advisor" },
      { name: "Satya Nadella", role: "Technology Strategy" },
      { name: "Mary Barra", role: "Operations Executive" },
      { name: "Tim Cook", role: "Supply Chain & Execution" },
    ],
    medium: [
      { name: "Sheryl Sandberg", role: "COO & Growth Strategy" },
      { name: "Jeff Bezos", role: "Business Expansion" },
      { name: "Trish Bertuzzi", role: "Sales Innovation" },
      { name: "Brian Chesky", role: "Customer Experience" },
    ],
    high: [
      { name: "Elon Musk", role: "Chief Innovation Officer" },
      { name: "Steve Jobs", role: "Product Visionary" },
      { name: "Mike Weinberg", role: "Sales Strategy" },
      { name: "Gary Vaynerchuk", role: "Marketing Disruption" },
    ],
  };

  // Default to medium if risk appetite is not recognized
  return (
    executives[riskAppetite as keyof typeof executives] || executives.medium
  );
}
