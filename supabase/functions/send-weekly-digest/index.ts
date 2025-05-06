import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.5";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get all tenants
    const { data: tenants, error: tenantsError } = await supabase
      .from("tenants")
      .select("id, email_recipients");

    if (tenantsError) {
      throw tenantsError;
    }

    console.log(`Processing ${tenants?.length || 0} tenants`);

    for (const tenant of tenants || []) {
      if (!tenant.email_recipients || tenant.email_recipients.length === 0) {
        console.log(`No email recipients for tenant ${tenant.id}, skipping`);
        continue;
      }

      // Get latest KPIs for this tenant
      const { data: kpis, error: kpisError } = await supabase
        .from("kpi_metrics")
        .select("*")
        .eq("tenant_id", tenant.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (kpisError) {
        console.error(
          `Error fetching KPIs for tenant ${tenant.id}:`,
          kpisError,
        );
        continue;
      }

      if (!kpis || kpis.length === 0) {
        console.log(`No KPIs found for tenant ${tenant.id}, skipping`);
        continue;
      }

      // Create HTML email content
      const html = `
        <h2>Your Weekly KPI Summary</h2>
        <p>Here are your latest KPI metrics:</p>
        <ul>
          ${kpis.map((kpi) => `<li><strong>${kpi.metric}:</strong> ${kpi.value}</li>`).join("")}
        </ul>
        <p>Access your dashboard for more detailed insights.</p>
      `;

      // Send email to each recipient
      for (const email of tenant.email_recipients) {
        console.log(`Sending email to ${email}`);

        try {
          const emailResponse = await resend.emails.send({
            from: "digest@allora-ai.com",
            to: email,
            subject: "Your Weekly KPI Summary",
            html,
          });

          console.log(`Email sent to ${email}:`, emailResponse);

          // Log the email
          await supabase.from("email_logs").insert({
            tenant_id: tenant.id,
            status: "sent",
            recipient: email,
            subject: "Your Weekly KPI Summary",
          });
        } catch (emailError) {
          console.error(`Failed to send email to ${email}:`, emailError);

          // Log the email error
          await supabase.from("email_logs").insert({
            tenant_id: tenant.id,
            status: "error",
            recipient: email,
            subject: "Your Weekly KPI Summary",
            error: String(emailError),
          });
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Weekly digest emails sent" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error in send-weekly-digest function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: String(error),
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
