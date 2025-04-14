
/**
 * Validates and cleans production data to ensure only real company information is used
 */

export interface ValidationIssue {
  table: string;
  record_id?: string;
  field?: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResults {
  success: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  validRecords: number;
  timestamp: string;
}

import { supabase } from '@/integrations/supabase/client';

/**
 * Validates all production data to ensure it meets quality standards
 * and doesn't contain any demo/test data
 */
export async function validateAndCleanProductionData(): Promise<ValidationResults> {
  const results: ValidationResults = {
    success: true,
    errors: [],
    warnings: [],
    validRecords: 0,
    timestamp: new Date().toISOString()
  };

  try {
    // Step 1: Validate companies
    await validateCompanies(results);
    
    // Step 2: Validate strategies
    await validateStrategies(results);
    
    // Step 3: Validate leads
    await validateLeads(results);
    
    // Step 4: Validate campaigns
    await validateCampaigns(results);
    
    // Step 5: Validate communications
    await validateCommunications(results);
    
    // If we have any errors, the validation fails
    results.success = results.errors.length === 0;
    
    return results;
  } catch (error) {
    console.error("Error during data validation:", error);
    results.success = false;
    results.errors.push({
      table: 'general',
      message: `Validation process failed: ${error.message || 'Unknown error'}`,
      severity: 'error'
    });
    return results;
  }
}

/**
 * Validates company records
 */
async function validateCompanies(results: ValidationResults): Promise<void> {
  const { data: companies, error } = await supabase
    .from('companies')
    .select('id, name, industry, details, created_at');
    
  if (error) {
    results.errors.push({
      table: 'companies',
      message: `Failed to fetch companies: ${error.message}`,
      severity: 'error'
    });
    return;
  }
  
  if (!companies || companies.length === 0) {
    results.errors.push({
      table: 'companies',
      message: 'No company records found. Please complete onboarding.',
      severity: 'error'
    });
    return;
  }
  
  // Validate each company
  for (const company of companies) {
    // Check for test/demo company names
    const nameLower = company.name?.toLowerCase() || '';
    if (
      nameLower.includes('test') || 
      nameLower.includes('demo') || 
      nameLower.includes('example') ||
      nameLower.length < 2
    ) {
      results.errors.push({
        table: 'companies',
        record_id: company.id,
        field: 'name',
        message: `Company name "${company.name}" appears to be a test/demo record`,
        severity: 'error'
      });
      continue;
    }
    
    // Check for missing industry
    if (!company.industry) {
      results.warnings.push({
        table: 'companies',
        record_id: company.id,
        field: 'industry',
        message: `Company "${company.name}" is missing an industry`,
        severity: 'warning'
      });
    }
    
    // Check for missing details
    if (!company.details) {
      results.warnings.push({
        table: 'companies',
        record_id: company.id,
        field: 'details',
        message: `Company "${company.name}" has no details`,
        severity: 'warning'
      });
    } else {
      // Check if company details have goals
      if (!company.details.goals || company.details.goals.length === 0) {
        results.warnings.push({
          table: 'companies',
          record_id: company.id,
          field: 'details.goals',
          message: `Company "${company.name}" has no business goals defined`,
          severity: 'warning'
        });
      }
    }
    
    // Valid company found
    results.validRecords++;
  }
}

/**
 * Validates strategy records
 */
async function validateStrategies(results: ValidationResults): Promise<void> {
  const { data: strategies, error } = await supabase
    .from('strategies')
    .select('id, title, description, company_id, risk_level');
    
  if (error) {
    results.warnings.push({
      table: 'strategies',
      message: `Failed to fetch strategies: ${error.message}`,
      severity: 'warning'
    });
    return;
  }
  
  if (!strategies || strategies.length === 0) {
    results.warnings.push({
      table: 'strategies',
      message: 'No strategies found. AI will generate strategies based on company profile.',
      severity: 'warning'
    });
    return;
  }
  
  // Validate each strategy
  for (const strategy of strategies) {
    // Check for test/demo strategy titles
    const titleLower = strategy.title?.toLowerCase() || '';
    if (
      titleLower.includes('test') || 
      titleLower.includes('demo') || 
      titleLower.includes('lorem ipsum') || 
      titleLower.includes('example')
    ) {
      results.errors.push({
        table: 'strategies',
        record_id: strategy.id,
        field: 'title',
        message: `Strategy "${strategy.title}" appears to be a test/demo record`,
        severity: 'error'
      });
      continue;
    }
    
    // Check for missing company_id
    if (!strategy.company_id) {
      results.errors.push({
        table: 'strategies',
        record_id: strategy.id,
        field: 'company_id',
        message: `Strategy "${strategy.title}" is not linked to a company`,
        severity: 'error'
      });
    }
    
    // Check for missing description
    if (!strategy.description) {
      results.warnings.push({
        table: 'strategies',
        record_id: strategy.id,
        field: 'description',
        message: `Strategy "${strategy.title}" is missing a description`,
        severity: 'warning'
      });
    }
    
    // Valid strategy found
    results.validRecords++;
  }
}

/**
 * Validates lead records
 */
async function validateLeads(results: ValidationResults): Promise<void> {
  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, name, email, phone, status, campaign_id');
    
  if (error) {
    results.warnings.push({
      table: 'leads',
      message: `Failed to fetch leads: ${error.message}`,
      severity: 'warning'
    });
    return;
  }
  
  if (!leads || leads.length === 0) {
    // This is just a warning, not having leads isn't critical
    results.warnings.push({
      table: 'leads',
      message: 'No leads found in the system',
      severity: 'warning'
    });
    return;
  }
  
  // Validate each lead
  for (const lead of leads) {
    // Check for test/demo lead names
    const nameLower = lead.name?.toLowerCase() || '';
    if (
      nameLower.includes('test') || 
      nameLower.includes('demo') || 
      nameLower.includes('example') ||
      nameLower === 'john doe' ||
      nameLower === 'jane doe'
    ) {
      results.errors.push({
        table: 'leads',
        record_id: lead.id,
        field: 'name',
        message: `Lead "${lead.name}" appears to be a test/demo record`,
        severity: 'error'
      });
      continue;
    }
    
    // Check for missing email and phone (both should be present for a quality lead)
    if (!lead.email && !lead.phone) {
      results.warnings.push({
        table: 'leads',
        record_id: lead.id,
        field: 'contact',
        message: `Lead "${lead.name}" has no email or phone number`,
        severity: 'warning'
      });
    }
    
    // Check for missing campaign association
    if (!lead.campaign_id) {
      results.warnings.push({
        table: 'leads',
        record_id: lead.id,
        field: 'campaign_id',
        message: `Lead "${lead.name}" is not associated with a campaign`,
        severity: 'warning'
      });
    }
    
    // Valid lead found
    results.validRecords++;
  }
}

/**
 * Validates campaign records
 */
async function validateCampaigns(results: ValidationResults): Promise<void> {
  const { data: campaigns, error } = await supabase
    .from('campaigns')
    .select('id, name, platform, budget, company_id');
    
  if (error) {
    results.warnings.push({
      table: 'campaigns',
      message: `Failed to fetch campaigns: ${error.message}`,
      severity: 'warning'
    });
    return;
  }
  
  if (!campaigns || campaigns.length === 0) {
    // This is just a warning, not having campaigns isn't critical
    results.warnings.push({
      table: 'campaigns',
      message: 'No marketing campaigns found in the system',
      severity: 'warning'
    });
    return;
  }
  
  // Validate each campaign
  for (const campaign of campaigns) {
    // Check for test/demo campaign names
    const nameLower = campaign.name?.toLowerCase() || '';
    if (
      nameLower.includes('test') || 
      nameLower.includes('demo') || 
      nameLower.includes('example')
    ) {
      results.errors.push({
        table: 'campaigns',
        record_id: campaign.id,
        field: 'name',
        message: `Campaign "${campaign.name}" appears to be a test/demo record`,
        severity: 'error'
      });
      continue;
    }
    
    // Check for missing company_id
    if (!campaign.company_id) {
      results.errors.push({
        table: 'campaigns',
        record_id: campaign.id,
        field: 'company_id',
        message: `Campaign "${campaign.name}" is not linked to a company`,
        severity: 'error'
      });
    }
    
    // Check for missing platform
    if (!campaign.platform) {
      results.warnings.push({
        table: 'campaigns',
        record_id: campaign.id,
        field: 'platform',
        message: `Campaign "${campaign.name}" has no platform specified`,
        severity: 'warning'
      });
    }
    
    // Check for budget
    if (!campaign.budget) {
      results.warnings.push({
        table: 'campaigns',
        record_id: campaign.id,
        field: 'budget',
        message: `Campaign "${campaign.name}" has no budget specified`,
        severity: 'warning'
      });
    }
    
    // Valid campaign found
    results.validRecords++;
  }
}

/**
 * Validates communication records
 */
async function validateCommunications(results: ValidationResults): Promise<void> {
  const { data: communications, error } = await supabase
    .from('communications')
    .select('id, type, lead_id, status');
    
  if (error) {
    results.warnings.push({
      table: 'communications',
      message: `Failed to fetch communications: ${error.message}`,
      severity: 'warning'
    });
    return;
  }
  
  if (!communications || communications.length === 0) {
    // Not having communications isn't critical
    return;
  }
  
  // Validate each communication
  for (const comm of communications) {
    // Check for missing lead association
    if (!comm.lead_id) {
      results.warnings.push({
        table: 'communications',
        record_id: comm.id,
        field: 'lead_id',
        message: `Communication (ID: ${comm.id}) is not linked to a lead`,
        severity: 'warning'
      });
    }
    
    // Valid communication found
    results.validRecords++;
  }
}
