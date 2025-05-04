import { ConsultationMessage } from './types';
import { UserPreferences } from '@/hooks/useUserPreferences';
export declare function saveConsultationMessage(consultationId: string, message: Omit<ConsultationMessage, 'timestamp'>): Promise<boolean>;
export declare function generateBotResponse(botName: string, botRole: string, userMessage: string, previousMessages?: ConsultationMessage[], debateContext?: any, preferences?: UserPreferences): Promise<string>;
