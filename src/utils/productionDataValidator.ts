
import { supabase } from '@/integrations/supabase/client';

export interface ValidationResults {
  success: boolean;
  validRecords: number;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  timestamp: string;
}

interface ValidationError {
  table: string;
  message: string;
  recordId?: string;
  severity: 'error';
}

interface ValidationWarning {
  table: string;
  message: string;
  recordId?: string;
  severity: 'warning';
}

export async function validateAndCleanProductionData(): Promise<ValidationResults> {
  const results: ValidationResults = {
    success: true,
    validRecords: 0,
    errors: [],
    warnings: [],
    timestamp: new Date().toISOString()
  };
  
  let validCount = 0;
  
  try {
    // Check companies table for test data
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('id, name')
      .or('name.ilike.%test%,name.ilike.%demo%,name.ilike.%example%');
      
    if (companiesError) {
      results.warnings.push({
        table: 'companies',
        message: `Error checking companies: ${companiesError.message}`,
        severity: 'warning'
      });
    } else {
      // Log test companies as warnings
      companies?.forEach(company => {
        results.warnings.push({
          table: 'companies',
          message: `Company "${company.name}" appears to be test data`,
          recordId: company.id,
          severity: 'warning'
        });
      });
      
      // Get valid company count
      const { count, error: countError } = await supabase
        .from('companies')
        .select('id', { count: 'exact' })
        .not('name', 'ilike', '%test%')
        .not('name', 'ilike', '%demo%')
        .not('name', 'ilike', '%example%');
        
      if (!countError) {
        validCount += count || 0;
      }
    }
    
    // Check profiles for users without companies
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, company_id, company')
      .is('company_id', null);
      
    if (profilesError) {
      results.warnings.push({
        table: 'profiles',
        message: `Error checking profiles: ${profilesError.message}`,
        severity: 'warning'
      });
    } else {
      // Log orphaned users as warnings
      profiles?.forEach(profile => {
        results.warnings.push({
          table: 'profiles',
          message: `User "${profile.id}" has no associated company`,
          recordId: profile.id,
          severity: 'warning'
        });
      });
    }
    
    // Check leads for test data - without using is_demo column
    try {
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('id, name, email')
        .or('name.ilike.%test%,name.ilike.%demo%,email.ilike.%test%,email.ilike.%example%');
        
      if (leadsError) {
        results.warnings.push({
          table: 'leads',
          message: `Error checking leads: ${leadsError.message}`,
          severity: 'warning'
        });
      } else {
        // Log test leads as warnings
        leads?.forEach(lead => {
          results.warnings.push({
            table: 'leads',
            message: `Lead "${lead.name}" appears to be test data`,
            recordId: lead.id,
            severity: 'warning'
          });
        });
      }
    } catch (error: any) {
      results.warnings.push({
        table: 'leads',
        message: `Error checking leads: ${error.message}`,
        severity: 'warning'
      });
    }
    
    // Check campaigns for test data
    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('id, name')
      .or('name.ilike.%test%,name.ilike.%demo%,name.ilike.%example%');
      
    if (campaignsError) {
      results.warnings.push({
        table: 'campaigns',
        message: `Error checking campaigns: ${campaignsError.message}`,
        severity: 'warning'
      });
    } else {
      // Log test campaigns as warnings
      campaigns?.forEach(campaign => {
        results.warnings.push({
          table: 'campaigns',
          message: `Campaign "${campaign.name}" appears to be test data`,
          recordId: campaign.id,
          severity: 'warning'
        });
      });
    }
    
    // Set final results
    results.validRecords = validCount;
    results.success = results.errors.length === 0;
    
    return results;
  } catch (error: any) {
    results.success = false;
    results.errors.push({
      table: 'system',
      message: `System error during validation: ${error.message}`,
      severity: 'error'
    });
    return results;
  }
}
