
import { processWhatsAppMessage } from "../../src/utils/whatsapp/humanStyleResponder";
import { supabase } from "./supabase-client";

// Process incoming WhatsApp messages with human-like responses
export async function handleIncomingWhatsApp(
  from: string,
  body: string,
  messageSid: string,
  numMedia: string,
  mediaContentType?: string,
  mediaUrl?: string
) {
  console.log(`Received WhatsApp message from ${from}: ${body}`);
  
  try {
    // Clean the phone number (remove whatsapp: prefix)
    const cleanNumber = from.toString().replace('whatsapp:', '');
    
    // Find the lead associated with this number
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("*, campaigns(*)")
      .eq("phone", cleanNumber)
      .maybeSingle();
    
    if (leadError) {
      console.error("Error finding lead:", leadError);
      // Still proceed to log the message even if we can't find the lead
    }
    
    // Get the most recent communication with this lead
    const { data: previousCommunications, error: commsError } = await supabase
      .from("communications")
      .select("*")
      .eq("lead_id", lead?.id || "unknown")
      .order("created_at", { ascending: false })
      .limit(10);
    
    if (commsError) {
      console.error("Error fetching previous communications:", commsError);
    }
    
    // Log the incoming message
    const { data: messageLog, error: logError } = await supabase
      .from("communications")
      .insert({
        lead_id: lead?.id || "unknown",
        type: "whatsapp",
        content: body,
        status: "received",
        created_at: new Date().toISOString(),
        channel: 'whatsapp',
        metadata: {
          message_sid: messageSid,
          has_media: numMedia !== '0',
          media_type: mediaContentType?.toString() || null,
          media_url: mediaUrl?.toString() || null
        }
      });
    
    if (logError) {
      console.error("Error logging incoming message:", logError);
    }
    
    // Generate a human-like response
    const previousInteractionsCount = previousCommunications?.length || 0;
    const customerName = lead?.name?.split(' ')[0] || null;
    
    // Get a custom executive bot associated with the campaign
    let executiveBot = null;
    if (lead?.campaigns?.executiveBot) {
      executiveBot = typeof lead.campaigns.executiveBot === 'string' 
        ? lead.campaigns.executiveBot 
        : lead.campaigns.executiveBot?.name;
    }
    
    const aiResponse = await processWhatsAppMessage(
      body,
      customerName,
      previousInteractionsCount,
      executiveBot
    );
    
    // Log the outgoing response
    const { error: responseLogError } = await supabase
      .from("communications")
      .insert({
        lead_id: lead?.id || "unknown",
        type: "whatsapp",
        content: aiResponse,
        status: "sent",
        created_at: new Date().toISOString(),
        channel: 'whatsapp',
        is_ai_generated: true,
        metadata: {
          in_response_to: messageSid,
          previous_interactions: previousInteractionsCount
        }
      });
    
    if (responseLogError) {
      console.error("Error logging response message:", responseLogError);
    }
    
    // Update lead status if this is their first interaction
    if (lead && lead.status === 'new') {
      const { error: updateError } = await supabase
        .from("leads")
        .update({ status: 'contacted' })
        .eq("id", lead.id);
        
      if (updateError) {
        console.error("Error updating lead status:", updateError);
      }
    }
    
    return aiResponse;
  } catch (error) {
    console.error("Error processing incoming WhatsApp message:", error);
    // Return a generic response if something goes wrong
    return "Thank you for your message. I'll get back to you shortly.";
  }
}
