export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface Bot {
  id?: string;
  name: string;
  title?: string;
  role?: string;
  description?: string;
  avatar?: string;
  expertise?: string;
  isActive?: boolean;
}
