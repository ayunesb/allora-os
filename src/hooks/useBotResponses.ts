
import { useCallback } from 'react';
import { DebateMessage, DebateParticipant } from '@/utils/consultation/types';
import { generateBotResponse } from '@/backend/debate/botResponseGenerator';
import { toast } from 'sonner';

export function useBotResponses(
  addMessage: (message: DebateMessage) => void,
  setIsLoading: (loading: boolean) => void
) {
  const simulateBotResponses = useCallback(async (
    participants: DebateParticipant[],
    topic: string,
    riskAppetite: string = 'medium',
    businessPriority: string = 'growth',
    preferences?: any
  ) => {
    if (!participants.length || !topic) return;
    
    setIsLoading(true);
    
    try {
      // Add system message indicating the debate topic
      const systemMessage: DebateMessage = {
        id: `system-${Date.now()}`,
        sender: 'System',
        senderId: 'system',
        content: `Debate started: ${topic} Discussion\nObjective: Evaluate and decide on the best approach for ${topic}\nTopic: ${topic}\nRisk Appetite: ${riskAppetite}\nBusiness Priority: ${businessPriority}`,
        timestamp: new Date(),
        isUser: false,
        votes: 0,
        isFavorite: false
      };
      
      addMessage(systemMessage);
      
      // Get responses from each participant sequentially with slight delay between them
      for (const participant of participants) {
        try {
          // Get a unique, persona-specific response for this executive
          const content = await generateBotResponse(
            participant,
            topic,
            riskAppetite,
            businessPriority
          );
          
          // Format the response to include rationale if requested
          let finalContent = content;
          
          // If rationale isn't already included but was requested
          if (preferences?.showSources && !finalContent.includes('Rationale:')) {
            finalContent += `\n\nRationale: Based on my experience as ${participant.name}, I believe this approach aligns with the ${riskAppetite} risk profile and prioritizes ${businessPriority}.`;
          }
          
          // Add the bot response message
          const message: DebateMessage = {
            id: `msg-${Date.now()}-${participant.id}`,
            sender: participant.name,
            senderId: participant.id,
            content: finalContent,
            timestamp: new Date(),
            isUser: false,
            votes: 0,
            isFavorite: false
          };
          
          addMessage(message);
          
          // Add a delay between responses to make it feel more natural
          await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));
        } catch (error) {
          console.error(`Error generating response for ${participant.name}:`, error);
          
          // Create fallback response
          const fallbackMessage: DebateMessage = {
            id: `msg-${Date.now()}-${participant.id}`,
            sender: participant.name,
            senderId: participant.id,
            content: `I need more context about ${topic} before providing a detailed response. However, I would approach this with a ${riskAppetite} risk profile, focusing primarily on ${businessPriority}.`,
            timestamp: new Date(),
            isUser: false,
            votes: 0,
            isFavorite: false
          };
          
          addMessage(fallbackMessage);
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    } catch (error) {
      console.error('Error in simulateBotResponses:', error);
      toast.error('Error generating executive responses');
    } finally {
      setIsLoading(false);
    }
  }, [addMessage, setIsLoading]);

  return {
    simulateBotResponses
  };
}
