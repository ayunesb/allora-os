
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
  
  try {
    // Validate Companies
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('id, name, created_at')
      .or('name.ilike.%test%, name.ilike.%demo%, name.ilike.%example%')
      .eq('is_demo', true);
    
    if (companiesError) {
      results.errors.push({
        table: 'companies',
        message: `Error checking companies: ${companiesError.message}`,
        severity: 'error'
      });
    } else if (companies && companies.length > 0) {
      // Remove test/demo companies
      for (const company of companies) {
        await supabase
          .from('companies')
          .delete()
          .eq('id', company.id);
        
        results.warnings.push({
          table: 'companies',
          message: `Removed demo company: ${company.name}`,
          recordId: company.id,
          severity: 'warning'
        });
      }
    }
    
    // Validate Leads
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('id, name, email')
      .or('name.ilike.%test%, email.ilike.%test%, email.ilike.%demo%')
      .eq('is_demo', true);
    
    if (leadsError) {
      results.errors.push({
        table: 'leads',
        message: `Error checking leads: ${leadsError.message}`,
        severity: 'error'
      });
    } else if (leads && leads.length > 0) {
      // Remove test/demo leads
      for (const lead of leads) {
        await supabase
          .from('leads')
          .delete()
          .eq('id', lead.id);
        
        results.warnings.push({
          table: 'leads',
          message: `Removed demo lead: ${lead.name || lead.email}`,
          recordId: lead.id,
          severity: 'warning'
        });
      }
    }
    
    // Validate Strategies
    const { data: strategies, error: strategiesError } = await supabase
      .from('strategies')
      .select('id, title, description')
      .or('title.ilike.%test%, title.ilike.%demo%');
    
    if (strategiesError) {
      results.errors.push({
        table: 'strategies',
        message: `Error checking strategies: ${strategiesError.message}`,
        severity: 'error'
      });
    } else if (strategies && strategies.length > 0) {
      // Remove demo strategies
      for (const strategy of strategies) {
        await supabase
          .from('strategies')
          .delete()
          .eq('id', strategy.id);
        
        results.warnings.push({
          table: 'strategies',
          message: `Removed demo strategy: ${strategy.title}`,
          recordId: strategy.id,
          severity: 'warning'
        });
      }
    }
    
    // Count valid records
    const { count: validCompanies } = await supabase
      .from('companies')
      .select('id', { count: 'exact' })
      .not('name', 'ilike', '%test%')
      .not('name', 'ilike', '%demo%');
    
    const { count: validLeads } = await supabase
      .from('leads')
      .select('id', { count: 'exact' })
      .not('name', 'ilike', '%test%')
      .not('email', 'ilike', '%test%');
    
    const { count: validStrategies } = await supabase
      .from('strategies')
      .select('id', { count: 'exact' })
      .not('title', 'ilike', '%test%')
      .not('title', 'ilike', '%demo%');
    
    results.validRecords = (validCompanies || 0) + (validLeads || 0) + (validStrategies || 0);
    results.success = results.errors.length === 0;
    
    return results;
  } catch (error: any) {
    console.error("Validation error:", error);
    results.success = false;
    results.errors.push({
      table: 'system',
      message: `System error during validation: ${error.message}`,
      severity: 'error'
    });
    return results;
  }
}
