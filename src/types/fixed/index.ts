export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = "admin" | "editor" | "viewer";

export interface Webhook {
  id: string;
  url: string;
  event: string;
  isActive: boolean;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface Campaign {
  id: string;
  title: string;
  budget: number;
  startDate: Date;
  endDate: Date;
}
