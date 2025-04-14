
import { supabase } from '@/integrations/supabase/client';

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  responseTime?: number;
}

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: Record<string, ServiceHealth>;
  environment?: string;
  version?: string;
  uptime?: number;
}

export async function checkSystemHealth(): Promise<HealthCheckResult> {
  try {
    // Check Supabase connection
    const supabaseCheck = await checkSupabaseConnection();

    // Check other critical services (you can expand this)
    const services: Record<string, ServiceHealth> = {
      database: supabaseCheck,
      authentication: await checkAuthService(),
      api: await checkApiService()
    };

    // Determine overall system status
    const overallStatus = determineOverallStatus(services);

    return {
      status: overallStatus,
      services,
      environment: import.meta.env.MODE || 'development',
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      uptime: process.uptime ? process.uptime() * 1000 : undefined
    };
  } catch (error) {
    console.error('System health check failed:', error);
    return {
      status: 'unhealthy',
      services: {},
      environment: import.meta.env.MODE || 'development'
    };
  }
}

async function checkSupabaseConnection(): Promise<ServiceHealth> {
  try {
    const start = Date.now();
    const { data, error } = await supabase
      .from('system_settings')
      .select('key')
      .limit(1);

    const responseTime = Date.now() - start;

    if (error) {
      return {
        status: 'unhealthy',
        responseTime
      };
    }

    return {
      status: responseTime < 500 ? 'healthy' : 'degraded',
      responseTime
    };
  } catch {
    return {
      status: 'unhealthy'
    };
  }
}

async function checkAuthService(): Promise<ServiceHealth> {
  try {
    const start = Date.now();
    const { data } = await supabase.auth.getSession();
    const responseTime = Date.now() - start;

    return {
      status: responseTime < 300 ? 'healthy' : 'degraded',
      responseTime
    };
  } catch {
    return {
      status: 'unhealthy'
    };
  }
}

async function checkApiService(): Promise<ServiceHealth> {
  // Simulated API check - replace with actual API endpoint if available
  const start = Date.now();
  await new Promise(resolve => setTimeout(resolve, 100));
  const responseTime = Date.now() - start;

  return {
    status: responseTime < 200 ? 'healthy' : 'degraded',
    responseTime
  };
}

function determineOverallStatus(services: Record<string, ServiceHealth>): 'healthy' | 'degraded' | 'unhealthy' {
  const statuses = Object.values(services).map(service => service.status);
  
  if (statuses.some(status => status === 'unhealthy')) return 'unhealthy';
  if (statuses.some(status => status === 'degraded')) return 'degraded';
  
  return 'healthy';
}
