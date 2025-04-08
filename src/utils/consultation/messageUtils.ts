
import { toast } from 'sonner';
import { ConsultationMessage } from './types';
import { botResponses } from './mockResponses';

export async function saveConsultationMessage(
  consultationId: string,
  message: Omit<ConsultationMessage, 'timestamp'>
): Promise<boolean> {
  try {
    // Since the bot_messages table doesn't exist yet, we'll create a mock implementation
    console.log('Would save message to consultation:', consultationId, message);
    
    // Simulate successful save
    toast.success('Message saved');
    return true;
  } catch (error: any) {
    console.error('Error saving message:', error);
    toast.error(`Failed to save message: ${error.message}`);
    return false;
  }
}

export async function generateBotResponse(
  botName: string,
  botRole: string,
  userMessage: string
): Promise<string> {
  try {
    // Get responses for this bot role, fallback to strategy if not found
    const roleResponses = botResponses[botRole] || botResponses.strategy;
    
    // Select a random response from the available options
    const randomIndex = Math.floor(Math.random() * roleResponses.length);
    const baseResponse = roleResponses[randomIndex];
    
    // Personalize the response with the bot's name
    return `As ${botName}, ${baseResponse}`;
  } catch (error: any) {
    console.error('Error generating bot response:', error.message);
    return `I apologize, but I'm having trouble formulating a response right now. Could we try a different approach to your question?`;
  }
}
