
export type Campaign = {
  id: string;
  companyId: string;
  name: string;
  platform: 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok';
  budget: number;
  created_at: string;
};
