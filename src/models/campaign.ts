
export type Campaign = {
  id: string;
  company_id: string;
  name: string;
  platform: 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok' | string; // Allow string for flexibility
  budget: number;
  created_at: string;
  // For joins with companies table
  companies?: { name: string };
};
