
import { supabase } from "./supabase-client";

// Define the human style responder functionality directly in this file
// (instead of importing from a path that doesn't exist in the edge function context)

// Helper to add occasional emojis
const addRandomEmoji = (responseType: 'greeting' | 'thanks' | 'question' | 'confirmation'): string => {
  const emojis = {
    greeting: ['👋', '😊', '👍', '✨'],
    thanks: ['🙏', '😊', '👍', '✨'],
    question: ['🤔', '💭', '❓', '📝'],
    confirmation: ['👌', '✅', '👍', '💯']
  };
  
  // 70% chance to add emoji
  if (Math.random() > 0.3) {
    const emojiSet = emojis[responseType];
    return ` ${emojiSet[Math.floor(Math.random() * emojiSet.length)]}`;
  }
  return '';
};

// Generate personalized greetings
const generateGreeting = (name?: string): string => {
  const timeOfDay = new Date().getHours();
  let greeting = '';
  
  if (timeOfDay < 12) greeting = 'Good morning';
  else if (timeOfDay < 17) greeting = 'Good afternoon';
  else greeting = 'Good evening';
  
  if (name) {
    return `${greeting}, ${name}${addRandomEmoji('greeting')}! `;
  } else {
    const alternatives = [
      `${greeting}${addRandomEmoji('greeting')}! `,
      `Hi there${addRandomEmoji('greeting')}! `,
      `Hello${addRandomEmoji('greeting')}! `
    ];
    return alternatives[Math.floor(Math.random() * alternatives.length)];
  }
};

// Generate natural-sounding thanks
const generateThanks = (): string => {
  const options = [
    `Thanks for reaching out${addRandomEmoji('thanks')}`,
    `Thanks for your message${addRandomEmoji('thanks')}`,
    `Thank you for contacting us${addRandomEmoji('thanks')}`,
    `I appreciate your interest${addRandomEmoji('thanks')}`
  ];
  
  return options[Math.floor(Math.random() * options.length)];
};

// Generate human-like followup questions
const generateFollowupQuestion = (inquiryType: string): string => {
  const questions: Record<string, string[]> = {
    product: [
      `What specific features are you looking for?${addRandomEmoji('question')}`,
      `Have you used similar products before?${addRandomEmoji('question')}`,
      `What problems are you trying to solve?${addRandomEmoji('question')}`
    ],
    pricing: [
      `What's your budget range?${addRandomEmoji('question')}`,
      `Are you looking for a specific plan?${addRandomEmoji('question')}`,
      `Would you prefer monthly or annual billing?${addRandomEmoji('question')}`
    ],
    support: [
      `Could you tell me a bit more about the issue?${addRandomEmoji('question')}`,
      `When did you first notice this happening?${addRandomEmoji('question')}`,
      `Have you tried any solutions yet?${addRandomEmoji('question')}`
    ],
    general: [
      `How did you hear about us?${addRandomEmoji('question')}`,
      `What made you interested in our solution?${addRandomEmoji('question')}`,
      `Would it help if I shared more details about what we offer?${addRandomEmoji('question')}`
    ]
  };
  
  const typeQuestions = questions[inquiryType] || questions.general;
  return typeQuestions[Math.floor(Math.random() * typeQuestions.length)];
};

// Get communication style based on the executive bot
const getStyleForExecutive = (executiveBot?: string): string => {
  if (!executiveBot) return 'balanced';
  
  const executiveStyles: Record<string, string> = {
    'Trish Bertuzzi': 'outbound',
    'Mike Weinberg': 'consultative',
    'Sheryl Sandberg': 'relationship',
    'Elon Musk': 'outbound',
    'Steve Jobs': 'outbound',
    'Warren Buffett': 'consultative',
    'Jeff Bezos': 'consultative',
    'Satya Nadella': 'relationship'
  };
  
  return executiveStyles[executiveBot] || 'balanced';
};

// Generate a human-like response
function generateHumanResponse(
  message: string,
  executiveBot?: string,
  options: {
    customerName?: string;
    previousInteractions?: number;
    inquiryType?: 'product' | 'pricing' | 'support' | 'general';
    style?: string;
  } = {}
): string {
  // Determine communication style based on executive or specified style
  const style = options.style || getStyleForExecutive(executiveBot);
  
  // Determine the type of inquiry from message content
  let inquiryType: 'product' | 'pricing' | 'support' | 'general' = 'general';
  if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost') || message.toLowerCase().includes('plan')) {
    inquiryType = 'pricing';
  } else if (message.toLowerCase().includes('help') || message.toLowerCase().includes('issue') || message.toLowerCase().includes('problem')) {
    inquiryType = 'support';
  } else if (message.toLowerCase().includes('product') || message.toLowerCase().includes('feature') || message.toLowerCase().includes('work')) {
    inquiryType = 'product';
  }
  
  // Create parts of the response
  const greeting = (options.previousInteractions && options.previousInteractions > 0) 
    ? '' 
    : generateGreeting(options.customerName);
  
  const thanks = (options.previousInteractions && options.previousInteractions > 0) 
    ? '' 
    : generateThanks();
  
  // Generate different response based on style
  let mainResponse = '';
  switch (style) {
    case 'outbound':
      // Direct and focused on next steps
      mainResponse = `I'm looking at your question about ${inquiryType === 'general' ? 'our solution' : inquiryType}. ${generateFollowupQuestion(inquiryType)}`;
      break;
    case 'consultative':
      // Problem-solving and questioning approach
      mainResponse = `I'd like to understand your needs better. ${generateFollowupQuestion(inquiryType)}`;
      if (Math.random() > 0.7) {
        mainResponse += ` This would help me recommend the best solution for you.${addRandomEmoji('confirmation')}`;
      }
      break;
    case 'relationship':
      // Warm and relationship-focused
      mainResponse = `I'm here to help with your ${inquiryType === 'general' ? 'questions' : inquiryType + ' questions'}. ${generateFollowupQuestion(inquiryType)}`;
      if (Math.random() > 0.5) {
        mainResponse += ` I want to make sure we find exactly what works for you.`;
      }
      break;
    default:
      // Balanced approach
      mainResponse = `I'd be happy to help with your ${inquiryType === 'general' ? 'inquiry' : inquiryType + ' inquiry'}. ${generateFollowupQuestion(inquiryType)}`;
  }

  // Combine parts with proper spacing
  let response = '';
  if (greeting) response += greeting;
  if (thanks) {
    if (response) response += thanks.toLowerCase();
    else response += thanks;
  }
  
  if (response) {
    response += ' ';
  }
  
  response += mainResponse;
  
  return response;
}

// Process WhatsApp messages and generate appropriate AI responses
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
    
    // Check for opt-out messages
    if (body.trim().toLowerCase() === 'stop') {
      return "I've processed your request to opt out of future messages. You won't receive any more communications from us. If you change your mind, you can text START anytime. Thank you.";
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
    
    const aiResponse = generateHumanResponse(
      body,
      executiveBot,
      {
        customerName,
        previousInteractions: previousInteractionsCount,
        inquiryType: body.toLowerCase().includes('price') ? 'pricing' 
                  : body.toLowerCase().includes('help') ? 'support'
                  : body.toLowerCase().includes('feature') ? 'product'
                  : 'general'
      }
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
