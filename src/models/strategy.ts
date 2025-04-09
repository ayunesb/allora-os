
export type Strategy = {
  id: string;
  company_id: string;
  title: string;
  description: string;
  risk_level: 'Low' | 'Medium' | 'High';
  created_at: string;
};

// Import and re-export GeneratedStrategy type
import { GeneratedStrategy } from '../utils/strategy/types';
export type { GeneratedStrategy };
