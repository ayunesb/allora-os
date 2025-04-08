
export type ConsultationMessage = {
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
};

export type BotConsultation = {
  id: string;
  botName: string;
  botRole: string;
  messages: ConsultationMessage[];
};
