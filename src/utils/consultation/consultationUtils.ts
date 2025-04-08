
import { toast } from 'sonner';
import { BotConsultation } from './types';

export async function getUserConsultationHistory(): Promise<BotConsultation[]> {
  try {
    // Mock implementation since we don't have the actual tables yet
    // This returns a static set of sample consultations
    
    // Generate some sample consultations
    const sampleConsultations: BotConsultation[] = [
      {
        id: '1',
        botName: 'Elon Musk',
        botRole: 'ceo',
        messages: [
          {
            type: 'user',
            content: 'How can I scale my business faster?',
            timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
          },
          {
            type: 'bot',
            content: 'As Elon Musk, I would recommend focusing on your unit economics first before scaling. Make sure each transaction is profitable.',
            timestamp: new Date(Date.now() - 86300000).toISOString()
          }
        ]
      },
      {
        id: '2',
        botName: 'Ruth Porat',
        botRole: 'cfo',
        messages: [
          {
            type: 'user',
            content: 'Should I invest in marketing or product development?',
            timestamp: new Date(Date.now() - 172800000).toISOString() // 2 days ago
          },
          {
            type: 'bot',
            content: "As Ruth Porat, I'd recommend calculating the ROI of both options. Typically, investing in product enhancements that increase customer lifetime value yields better long-term results.",
            timestamp: new Date(Date.now() - 172700000).toISOString()
          }
        ]
      }
    ];
    
    return sampleConsultations;
  } catch (error: any) {
    console.error('Error fetching consultation history:', error.message);
    return [];
  }
}

export async function startNewConsultation(botName: string, botRole: string): Promise<string | null> {
  try {
    // Mock implementation since we don't have the actual tables
    // In a real implementation, this would save to a database
    console.log('Starting new consultation with', botName, 'in role', botRole);
    
    // Generate a random ID for the consultation
    const consultationId = Math.random().toString(36).substring(2, 15);
    
    return consultationId;
  } catch (error: any) {
    console.error('Error starting new consultation:', error.message);
    toast.error('Failed to start consultation');
    return null;
  }
}
