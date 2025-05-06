export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export type UserProfile = {
  userId: string;
  address: string;
  phone: string;
  bio?: string;
};
