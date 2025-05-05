export interface Webhook {
  id: string;
  url: string;
  event: string;
  createdAt: Date;
  updatedAt: Date;
}

export {};