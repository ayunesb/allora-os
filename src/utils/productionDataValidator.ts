
import { supabase } from '@/integrations/supabase/client';

export interface ValidationResults {
  success: boolean;
  validRecords: number;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  timestamp: string;
  cleanupPerformed: boolean;
  validationDetails: ValidationDetails;
}

interface ValidationDetails {
  companies: {
    total: number;
    valid: number;
    cleaned: number;
  };
  leads: {
    total: number;
    valid: number;
    cleaned: number;
  };
  strategies: {
    total: number;
    valid: number;
    cleaned: number;
  };
  campaigns: {
    total: number;
    valid: number;
    cleaned: number;
  };
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

// Patterns for identifying test/demo data
const TEST_PATTERNS = [
  '%test%', 
  '%demo%', 
  '%example%', 
  '%sample%', 
  '%dummy%',
  '%mock%'
];

/**
 * Validates production data and removes test/demo data if necessary
 * This is used by the admin system to ensure the database is ready for production
 */
export async function validateAndCleanProductionData(): Promise<ValidationResults> {
  const results: ValidationResults = {
    success: true,
    validRecords: 0,
    errors: [],
    warnings: [],
    timestamp: new Date().toISOString(),
    cleanupPerformed: false,
    validationDetails: {
      companies: { total: 0, valid: 0, cleaned: 0 },
      leads: { total: 0, valid: 0, cleaned: 0 },
      strategies: { total: 0, valid: 0, cleaned: 0 },
      campaigns: { total: 0, valid: 0, cleaned: 0 }
    }
  };
  
  try {
    // Check database connection first
    const { error: connectionError } = await supabase
      .from('companies')
      .select('count')
      .limit(1);
      
    if (connectionError) {
      results.errors.push({
        table: 'system',
        message: `Database connection error: ${connectionError.message}`,
        severity: 'error'
      });
      results.success = false;
      return results;
    }
    
    // Begin validation process
    await validateCompanies(results);
    await validateLeads(results);
    await validateStrategies(results);
    await validateCampaigns(results);
    
    // Calculate total valid records across all tables
    results.validRecords = 
      results.validationDetails.companies.valid + 
      results.validationDetails.leads.valid + 
      results.validationDetails.strategies.valid +
      results.validationDetails.campaigns.valid;
    
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

/**
 * Validates and cleans companies table
 */
async function validateCompanies(results: ValidationResults): Promise<void> {
  try {
    // First, get total count for reporting
    const { count: totalCount, error: countError } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true });
      
    if (countError) throw new Error(`Error counting companies: ${countError.message}`);
    results.validationDetails.companies.total = totalCount || 0;
    
    // Look for test/demo companies using multiple patterns
    const orConditions = TEST_PATTERNS.map(pattern => `name.ilike.${pattern}`).join(', ');
    
    const { data: testCompanies, error: companiesError } = await supabase
      .from('companies')
      .select('id, name, created_at')
      .or(orConditions);
    
    if (companiesError) {
      results.errors.push({
        table: 'companies',
        message: `Error checking companies: ${companiesError.message}`,
        severity: 'error'
      });
      return;
    }
    
    if (testCompanies && testCompanies.length > 0) {
      results.cleanupPerformed = true;
      results.validationDetails.companies.cleaned = testCompanies.length;
      
      // Remove test/demo companies
      for (const company of testCompanies) {
        const { error: deleteError } = await supabase
          .from('companies')
          .delete()
          .eq('id', company.id);
          
        if (deleteError) {
          results.errors.push({
            table: 'companies',
            message: `Error removing test company ${company.name}: ${deleteError.message}`,
            recordId: company.id,
            severity: 'error'
          });
        } else {
          results.warnings.push({
            table: 'companies',
            message: `Removed test/demo company: ${company.name}`,
            recordId: company.id,
            severity: 'warning'
          });
        }
      }
    }
    
    // Count valid records (non-test companies)
    const { count: validCount, error: validError } = await supabase
      .from('companies')
      .select('id', { count: 'exact', head: true })
      .not('name', 'ilike', '%test%')
      .not('name', 'ilike', '%demo%')
      .not('name', 'ilike', '%example%')
      .not('name', 'ilike', '%sample%');
      
    if (validError) {
      results.errors.push({
        table: 'companies',
        message: `Error counting valid companies: ${validError.message}`,
        severity: 'error'
      });
    } else {
      results.validationDetails.companies.valid = validCount || 0;
    }
  } catch (error: any) {
    results.errors.push({
      table: 'companies',
      message: `Error during company validation: ${error.message}`,
      severity: 'error'
    });
  }
}

/**
 * Validates and cleans leads table
 */
async function validateLeads(results: ValidationResults): Promise<void> {
  try {
    // First, get total count for reporting
    const { count: totalCount, error: countError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });
      
    if (countError) throw new Error(`Error counting leads: ${countError.message}`);
    results.validationDetails.leads.total = totalCount || 0;
    
    // Build conditions to find test leads
    const nameConditions = TEST_PATTERNS.map(pattern => `name.ilike.${pattern}`).join(', ');
    const emailConditions = TEST_PATTERNS.map(pattern => `email.ilike.${pattern}`).join(', ');
    
    const { data: testLeads, error: leadsError } = await supabase
      .from('leads')
      .select('id, name, email')
      .or(`${nameConditions}, ${emailConditions}`);
    
    if (leadsError) {
      results.errors.push({
        table: 'leads',
        message: `Error checking leads: ${leadsError.message}`,
        severity: 'error'
      });
      return;
    }
    
    if (testLeads && testLeads.length > 0) {
      results.cleanupPerformed = true;
      results.validationDetails.leads.cleaned = testLeads.length;
      
      // Remove test/demo leads
      for (const lead of testLeads) {
        const { error: deleteError } = await supabase
          .from('leads')
          .delete()
          .eq('id', lead.id);
          
        if (deleteError) {
          results.errors.push({
            table: 'leads',
            message: `Error removing test lead ${lead.name || lead.email}: ${deleteError.message}`,
            recordId: lead.id,
            severity: 'error'
          });
        } else {
          results.warnings.push({
            table: 'leads',
            message: `Removed test/demo lead: ${lead.name || lead.email}`,
            recordId: lead.id,
            severity: 'warning'
          });
        }
      }
    }
    
    // Count valid records (non-test leads)
    const { count: validCount, error: validError } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .not('name', 'ilike', '%test%')
      .not('name', 'ilike', '%demo%')
      .not('name', 'ilike', '%example%')
      .not('email', 'ilike', '%test%')
      .not('email', 'ilike', '%demo%')
      .not('email', 'ilike', '%example%');
      
    if (validError) {
      results.errors.push({
        table: 'leads',
        message: `Error counting valid leads: ${validError.message}`,
        severity: 'error'
      });
    } else {
      results.validationDetails.leads.valid = validCount || 0;
    }
  } catch (error: any) {
    results.errors.push({
      table: 'leads',
      message: `Error during leads validation: ${error.message}`,
      severity: 'error'
    });
  }
}

/**
 * Validates and cleans strategies table
 */
async function validateStrategies(results: ValidationResults): Promise<void> {
  try {
    // First, get total count for reporting
    const { count: totalCount, error: countError } = await supabase
      .from('strategies')
      .select('*', { count: 'exact', head: true });
      
    if (countError) throw new Error(`Error counting strategies: ${countError.message}`);
    results.validationDetails.strategies.total = totalCount || 0;
    
    // Build conditions to find test strategies
    const titleConditions = TEST_PATTERNS.map(pattern => `title.ilike.${pattern}`).join(', ');
    const descConditions = TEST_PATTERNS.map(pattern => `description.ilike.${pattern}`).join(', ');
    
    const { data: testStrategies, error: strategiesError } = await supabase
      .from('strategies')
      .select('id, title, description')
      .or(`${titleConditions}, ${descConditions}`);
    
    if (strategiesError) {
      results.errors.push({
        table: 'strategies',
        message: `Error checking strategies: ${strategiesError.message}`,
        severity: 'error'
      });
      return;
    }
    
    if (testStrategies && testStrategies.length > 0) {
      results.cleanupPerformed = true;
      results.validationDetails.strategies.cleaned = testStrategies.length;
      
      // Remove test strategies
      for (const strategy of testStrategies) {
        const { error: deleteError } = await supabase
          .from('strategies')
          .delete()
          .eq('id', strategy.id);
          
        if (deleteError) {
          results.errors.push({
            table: 'strategies',
            message: `Error removing test strategy ${strategy.title}: ${deleteError.message}`,
            recordId: strategy.id,
            severity: 'error'
          });
        } else {
          results.warnings.push({
            table: 'strategies',
            message: `Removed test/demo strategy: ${strategy.title}`,
            recordId: strategy.id,
            severity: 'warning'
          });
        }
      }
    }
    
    // Count valid records (non-test strategies)
    const { count: validCount, error: validError } = await supabase
      .from('strategies')
      .select('id', { count: 'exact', head: true })
      .not('title', 'ilike', '%test%')
      .not('title', 'ilike', '%demo%')
      .not('title', 'ilike', '%example%')
      .not('description', 'ilike', '%test%')
      .not('description', 'ilike', '%demo%')
      .not('description', 'ilike', '%example%');
      
    if (validError) {
      results.errors.push({
        table: 'strategies',
        message: `Error counting valid strategies: ${validError.message}`,
        severity: 'error'
      });
    } else {
      results.validationDetails.strategies.valid = validCount || 0;
    }
  } catch (error: any) {
    results.errors.push({
      table: 'strategies',
      message: `Error during strategies validation: ${error.message}`,
      severity: 'error'
    });
  }
}

/**
 * Validates and cleans campaigns table
 */
async function validateCampaigns(results: ValidationResults): Promise<void> {
  try {
    // First, get total count for reporting
    const { count: totalCount, error: countError } = await supabase
      .from('campaigns')
      .select('*', { count: 'exact', head: true });
      
    if (countError) throw new Error(`Error counting campaigns: ${countError.message}`);
    results.validationDetails.campaigns.total = totalCount || 0;
    
    // Build conditions to find test campaigns
    const nameConditions = TEST_PATTERNS.map(pattern => `name.ilike.${pattern}`).join(', ');
    
    const { data: testCampaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('id, name')
      .or(nameConditions);
    
    if (campaignsError) {
      results.errors.push({
        table: 'campaigns',
        message: `Error checking campaigns: ${campaignsError.message}`,
        severity: 'error'
      });
      return;
    }
    
    if (testCampaigns && testCampaigns.length > 0) {
      results.cleanupPerformed = true;
      results.validationDetails.campaigns.cleaned = testCampaigns.length;
      
      // Remove test campaigns
      for (const campaign of testCampaigns) {
        const { error: deleteError } = await supabase
          .from('campaigns')
          .delete()
          .eq('id', campaign.id);
          
        if (deleteError) {
          results.errors.push({
            table: 'campaigns',
            message: `Error removing test campaign ${campaign.name}: ${deleteError.message}`,
            recordId: campaign.id,
            severity: 'error'
          });
        } else {
          results.warnings.push({
            table: 'campaigns',
            message: `Removed test/demo campaign: ${campaign.name}`,
            recordId: campaign.id,
            severity: 'warning'
          });
        }
      }
    }
    
    // Count valid records (non-test campaigns)
    const { count: validCount, error: validError } = await supabase
      .from('campaigns')
      .select('id', { count: 'exact', head: true })
      .not('name', 'ilike', '%test%')
      .not('name', 'ilike', '%demo%')
      .not('name', 'ilike', '%example%');
      
    if (validError) {
      results.errors.push({
        table: 'campaigns',
        message: `Error counting valid campaigns: ${validError.message}`,
        severity: 'error'
      });
    } else {
      results.validationDetails.campaigns.valid = validCount || 0;
    }
  } catch (error: any) {
    results.errors.push({
      table: 'campaigns',
      message: `Error during campaigns validation: ${error.message}`,
      severity: 'error'
    });
  }
}
