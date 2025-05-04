import { BotConsultation } from './types';
export declare function getUserConsultationHistory(): Promise<BotConsultation[]>;
export declare function startNewConsultation(botName: string, botRole: string): Promise<string | null>;
