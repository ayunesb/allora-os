
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

// Initialize Supabase client
const supabaseUrl = "https://ofwxyctfzskeeniaaazw.supabase.co";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

/**
 * Handles incoming WhatsApp messages
 * @param from Sender's phone number
 * @param body Message content
 * @param messageSid Twilio message ID
 * @param numMedia Number of media attachments
 * @param mediaContentType Media content type
 * @param mediaUrl Media URL
 * @returns AI-generated human-like response
 */
export async function handleIncomingWhatsApp(
  from: string,
  body: string,
  messageSid: string,
  numMedia: string,
  mediaContentType?: string,
  mediaUrl?: string
): Promise<string> {
  console.log(`Received WhatsApp from ${from}: ${body}`);
  
  try {
    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Log the incoming message
    await supabase.from("inbound_messages").insert({
      platform: "whatsapp",
      from_number: from,
      message_content: body,
      message_sid: messageSid,
      has_media: numMedia !== "0",
      media_type: mediaContentType || null,
      media_url: mediaUrl || null,
      received_at: new Date().toISOString()
    });
    
    // Find the lead associated with this phone number
    const { data: leads, error: leadsError } = await supabase
      .from("leads")
      .select("id, name, status, campaigns(id, name, company_id)")
      .eq("phone", from.replace("whatsapp:", ""))
      .order("created_at", { ascending: false })
      .limit(1);
      
    if (leadsError) {
      console.error("Error finding lead:", leadsError);
    }
    
    // Process the message and generate a response
    let responseMessage = "Thank you for your message. Our team will get back to you shortly.";
    
    // If we found a lead, personalize the response
    if (leads && leads.length > 0) {
      const lead = leads[0];
      
      // Log the communication for this lead
      await supabase.from("lead_communications").insert({
        lead_id: lead.id,
        type: "whatsapp",
        content: body,
        direction: "inbound",
        received_at: new Date().toISOString()
      });
      
      // Personalize response based on lead status
      if (lead.name) {
        switch (lead.status) {
          case "new":
            responseMessage = `Hi ${lead.name}, thanks for reaching out! Our team will contact you soon to discuss how we can help your business grow.`;
            break;
          case "contacted":
            responseMessage = `Hello ${lead.name}, we've received your message. Our representative will follow up with you shortly.`;
            break;
          case "qualified":
            responseMessage = `Thank you for your message, ${lead.name}. Your dedicated account manager will respond to you as soon as possible.`;
            break;
          default:
            responseMessage = `Thank you for your message, ${lead.name}. We'll get back to you shortly.`;
        }
      }
    } else {
      // No matching lead found, log as an unknown contact
      await supabase.from("unknown_contacts").insert({
        phone_number: from,
        last_message: body,
        last_contact: new Date().toISOString()
      });
    }
    
    return responseMessage;
  } catch (error) {
    console.error("Error handling incoming WhatsApp:", error);
    return "Thanks for your message. We'll get back to you as soon as possible.";
  }
}
