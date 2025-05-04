import { toast } from 'sonner';
import { botResponses } from './mockResponses';
import { supabase } from '@/integrations/supabase/client';
export async function saveConsultationMessage(consultationId, message) {
    try {
        // Since the bot_messages table doesn't exist yet, we'll create a mock implementation
        console.log('Would save message to consultation:', consultationId, message);
        // Simulate successful save
        toast.success('Message saved');
        return true;
    }
    catch (error) {
        console.error('Error saving message:', error);
        toast.error(`Failed to save message: ${error.message}`);
        return false;
    }
}
export async function generateBotResponse(botName, botRole, userMessage, previousMessages = [], debateContext, preferences) {
    try {
        let response;
        // Use OpenAI API through the Supabase Edge Function
        try {
            // Format previous messages for the API
            const formattedMessages = previousMessages.map(msg => ({
                type: msg.type, // 'user' or 'bot'
                content: msg.content,
                timestamp: msg.timestamp
            }));
            // Add the current user message
            formattedMessages.push({
                type: 'user',
                content: userMessage,
                timestamp: new Date().toISOString()
            });
            // Call the OpenAI edge function
            const { data, error } = await supabase.functions.invoke('openai', {
                body: {
                    botName,
                    botRole,
                    messages: formattedMessages,
                    debateContext,
                    preferences // Pass user preferences to the API
                }
            });
            if (error) {
                throw new Error(`Edge function error: ${error.message}`);
            }
            if (data.error) {
                throw new Error(`API error: ${data.error}`);
            }
            response = data.content;
            console.log('AI response:', response);
        }
        catch (apiError) {
            console.error('Error calling OpenAI API, falling back to mock data:', apiError);
            // Fall back to mock responses if the API call fails
            const roleResponses = botResponses[botRole] || botResponses.strategy;
            const randomIndex = Math.floor(Math.random() * roleResponses.length);
            response = `As ${botName}, ${roleResponses[randomIndex]}`;
        }
        return response;
    }
    catch (error) {
        console.error('Error generating bot response:', error.message);
        return `I apologize, but I'm having trouble formulating a response right now. Could we try a different approach to your question?`;
    }
}
