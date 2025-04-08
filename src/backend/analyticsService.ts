
import { supabase } from './supabase';
import { toast } from 'sonner';

// Types for analytics data
export interface CompanyAnalytics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  usersByRole: Record<string, number>;
}

export interface ConsultationAnalytics {
  totalConsultations: number;
  consultationsByBot: Record<string, number>;
  consultationsByTopic: Record<string, number>;
  averageConsultationLength: number;
}

export interface DebateAnalytics {
  totalDebates: number;
  debatesByTopic: Record<string, number>;
  averageParticipants: number;
  averageMessages: number;
}

export interface SystemAnalytics {
  apiCalls: number;
  errorRate: number;
  averageResponseTime: number;
  activeSubscriptions: number;
}

// Get company user analytics (mock implementation)
export const getCompanyUserAnalytics = async (companyId: string): Promise<CompanyAnalytics> => {
  try {
    // In a real implementation, this would query the Supabase database
    // For now, return mock data
    return {
      totalUsers: 12,
      activeUsers: 8,
      inactiveUsers: 4,
      usersByRole: {
        admin: 2,
        user: 10
      }
    };
  } catch (error: any) {
    console.error('Error fetching company user analytics:', error.message);
    toast.error(`Analytics error: ${error.message}`);
    
    // Return empty data on error
    return {
      totalUsers: 0,
      activeUsers: 0,
      inactiveUsers: 0,
      usersByRole: {}
    };
  }
};

// Get AI consultation analytics (mock implementation)
export const getConsultationAnalytics = async (companyId: string): Promise<ConsultationAnalytics> => {
  try {
    // In a real implementation, this would query the Supabase database
    // For now, return mock data
    return {
      totalConsultations: 24,
      consultationsByBot: {
        'Elon Musk': 8,
        'Warren Buffett': 6,
        'Satya Nadella': 4,
        'Ruth Porat': 3,
        'Sheryl Sandberg': 2,
        'Other': 1
      },
      consultationsByTopic: {
        'Strategy': 10,
        'Finance': 8,
        'Operations': 4,
        'Marketing': 2
      },
      averageConsultationLength: 12 // minutes
    };
  } catch (error: any) {
    console.error('Error fetching consultation analytics:', error.message);
    toast.error(`Analytics error: ${error.message}`);
    
    // Return empty data on error
    return {
      totalConsultations: 0,
      consultationsByBot: {},
      consultationsByTopic: {},
      averageConsultationLength: 0
    };
  }
};

// Get AI debate analytics (mock implementation)
export const getDebateAnalytics = async (companyId: string): Promise<DebateAnalytics> => {
  try {
    // In a real implementation, this would query the Supabase database
    // For now, return mock data
    return {
      totalDebates: 8,
      debatesByTopic: {
        'Growth Strategy': 3,
        'Market Expansion': 2,
        'Product Development': 2,
        'Cost Reduction': 1
      },
      averageParticipants: 4.5,
      averageMessages: 28
    };
  } catch (error: any) {
    console.error('Error fetching debate analytics:', error.message);
    toast.error(`Analytics error: ${error.message}`);
    
    // Return empty data on error
    return {
      totalDebates: 0,
      debatesByTopic: {},
      averageParticipants: 0,
      averageMessages: 0
    };
  }
};

// Get system analytics for administrators (mock implementation)
export const getSystemAnalytics = async (): Promise<SystemAnalytics> => {
  try {
    // In a real implementation, this would query system logs and metrics
    // For now, return mock data
    return {
      apiCalls: 2458,
      errorRate: 0.023, // 2.3%
      averageResponseTime: 246, // ms
      activeSubscriptions: 48
    };
  } catch (error: any) {
    console.error('Error fetching system analytics:', error.message);
    toast.error(`Analytics error: ${error.message}`);
    
    // Return empty data on error
    return {
      apiCalls: 0,
      errorRate: 0,
      averageResponseTime: 0,
      activeSubscriptions: 0
    };
  }
};

// Get analytics dashboard data for company admins
export const getCompanyDashboardAnalytics = async (companyId: string) => {
  try {
    const [userAnalytics, consultationAnalytics, debateAnalytics] = await Promise.all([
      getCompanyUserAnalytics(companyId),
      getConsultationAnalytics(companyId),
      getDebateAnalytics(companyId)
    ]);
    
    return {
      userAnalytics,
      consultationAnalytics,
      debateAnalytics
    };
  } catch (error: any) {
    console.error('Error fetching dashboard analytics:', error.message);
    toast.error(`Dashboard analytics error: ${error.message}`);
    throw error;
  }
};
