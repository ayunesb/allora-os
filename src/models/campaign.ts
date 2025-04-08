
export type Campaign = {
  id: string;
  company_id: string;
  name: string;
  platform: 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok';
  budget: number;
  created_at: string;
};
