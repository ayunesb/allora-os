
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Bot {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  isActive: boolean;
}
