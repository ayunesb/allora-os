
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Regex patterns to identify potential test/demo data
const TEST_PATTERNS = [
  /test/i,
  /demo/i,
  /example/i,
  /sample/i,
  /lorem ipsum/i,
  /placeholder/i,
  /dummy/i
];

// Data structure for validation results
export interface ValidationResults {
  success: boolean;
  validRecords: number;
  warnings: {
    type: string;
    message: string;
    id?: string;
    table?: string;
  }[];
  errors: {
    type: string;
    message: string;
    id?: string;
    table?: string;
  }[];
}

/**
 * Utility to clean up test/demo data and verify production readiness
 */
export async function validateAndCleanProductionData(): Promise<ValidationResults> {
  console.log("Starting production data validation and cleanup...");
  
  const results: ValidationResults = {
    success: false,
    validRecords: 0,
    warnings: [],
    errors: []
  };
  
  try {
    // 1. Connect and validate company data
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('*');
      
    if (companiesError) {
      results.errors.push({
        type: 'database',
        message: `Failed to fetch companies: ${companiesError.message}`
      });
      return results;
    }
    
    // Check if we have any valid companies
    const validCompanies = companies.filter(company => {
      // Check for test/demo patterns in company name
      const isTestName = TEST_PATTERNS.some(pattern => 
        pattern.test(company.name)
      );
      
      if (isTestName) {
        results.warnings.push({
          type: 'company',
          message: `Found potential test company: ${company.name}`,
          id: company.id,
          table: 'companies'
        });
        return false;
      }
      
      return true;
    });
    
    if (validCompanies.length === 0) {
      // No valid companies found, this is critical
      results.errors.push({
        type: 'company',
        message: 'No valid production companies found. Cannot proceed with validation.'
      });
      return results;
    }
    
    // Store valid company IDs for use in other queries
    const validCompanyIds = validCompanies.map(c => c.id);
    console.log(`Found ${validCompanyIds.length} valid companies`);
    results.validRecords += validCompanyIds.length;
    
    // 2. Validate strategies
    const { data: strategies, error: strategiesError } = await supabase
      .from('strategies')
      .select('*')
      .in('company_id', validCompanyIds);
      
    if (strategiesError) {
      results.errors.push({
        type: 'database',
        message: `Failed to fetch strategies: ${strategiesError.message}`
      });
    } else {
      const validStrategies = strategies.filter(strategy => {
        // Check for test/demo content
        const isTestContent = TEST_PATTERNS.some(pattern => 
          pattern.test(strategy.title) || (strategy.description && pattern.test(strategy.description))
        );
        
        if (isTestContent) {
          results.warnings.push({
            type: 'strategy',
            message: `Found potential test strategy: ${strategy.title}`,
            id: strategy.id,
            table: 'strategies'
          });
          return false;
        }
        
        // Check for missing required fields
        if (!strategy.title || !strategy.description) {
          results.warnings.push({
            type: 'strategy',
            message: `Strategy missing required fields: ${strategy.id}`,
            id: strategy.id,
            table: 'strategies'
          });
        }
        
        return true;
      });
      
      console.log(`Found ${validStrategies.length} valid strategies`);
      results.validRecords += validStrategies.length;
    }
    
    // 3. Validate campaigns
    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('*')
      .in('company_id', validCompanyIds);
      
    if (campaignsError) {
      results.errors.push({
        type: 'database',
        message: `Failed to fetch campaigns: ${campaignsError.message}`
      });
    } else {
      const validCampaigns = campaigns.filter(campaign => {
        // Check for test/demo content
        const isTestContent = TEST_PATTERNS.some(pattern => 
          pattern.test(campaign.name)
        );
        
        if (isTestContent) {
          results.warnings.push({
            type: 'campaign',
            message: `Found potential test campaign: ${campaign.name}`,
            id: campaign.id,
            table: 'campaigns'
          });
          return false;
        }
        
        // Check for missing required fields
        if (!campaign.name || !campaign.platform) {
          results.warnings.push({
            type: 'campaign',
            message: `Campaign missing required fields: ${campaign.id}`,
            id: campaign.id,
            table: 'campaigns'
          });
        }
        
        return true;
      });
      
      console.log(`Found ${validCampaigns.length} valid campaigns`);
      results.validRecords += validCampaigns.length;
    }
    
    // 4. Validate leads
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*');
      
    if (leadsError) {
      results.errors.push({
        type: 'database',
        message: `Failed to fetch leads: ${leadsError.message}`
      });
    } else {
      const validLeads = leads.filter(lead => {
        // Check for test/demo content
        const isTestContent = TEST_PATTERNS.some(pattern => 
          pattern.test(lead.name) || 
          (lead.email && pattern.test(lead.email)) || 
          (lead.company && pattern.test(lead.company))
        );
        
        if (isTestContent) {
          results.warnings.push({
            type: 'lead',
            message: `Found potential test lead: ${lead.name}`,
            id: lead.id,
            table: 'leads'
          });
          return false;
        }
        
        // Check if lead is associated with valid campaign/company
        const hasValidAssociation = validCompanyIds.includes(lead.company_id);
        
        if (!hasValidAssociation) {
          results.warnings.push({
            type: 'lead',
            message: `Lead not associated with valid company: ${lead.id}`,
            id: lead.id,
            table: 'leads'
          });
        }
        
        return hasValidAssociation;
      });
      
      console.log(`Found ${validLeads.length} valid leads`);
      results.validRecords += validLeads.length;
    }

    // Check for critical errors that would prevent system from working properly
    if (results.errors.length === 0 && results.validRecords > 0) {
      results.success = true;
    }
    
    return results;
  } catch (error: any) {
    console.error("Error validating production data:", error);
    results.errors.push({
      type: 'system',
      message: `Validation failed: ${error.message}`
    });
    return results;
  }
}

/**
 * Attempts to clean up test/demo data from the database
 * Only run this in production environment after confirming with admin
 */
export async function cleanupTestData(): Promise<boolean> {
  try {
    // Get valid companies first to ensure we don't delete real data
    const { data: validCompanies } = await supabase
      .from('companies')
      .select('id, name')
      .not('name', 'ilike', '%test%')
      .not('name', 'ilike', '%demo%')
      .not('name', 'ilike', '%example%')
      .not('name', 'ilike', '%sample%');
      
    if (!validCompanies || validCompanies.length === 0) {
      console.error("No valid companies found, aborting cleanup to prevent data loss");
      toast.error("Could not identify valid companies, cleanup aborted");
      return false;
    }
    
    const validCompanyIds = validCompanies.map(c => c.id);
    
    // Delete test strategies
    const { error: strategiesError } = await supabase
      .from('strategies')
      .delete()
      .or(
        `title.ilike.%test%, title.ilike.%demo%, title.ilike.%example%, title.ilike.%sample%`
      )
      .not('company_id', 'in', `(${validCompanyIds.join(',')})`);
      
    if (strategiesError) {
      console.error("Error deleting test strategies:", strategiesError);
    }
    
    // Delete test campaigns
    const { error: campaignsError } = await supabase
      .from('campaigns')
      .delete()
      .or(
        `name.ilike.%test%, name.ilike.%demo%, name.ilike.%example%, name.ilike.%sample%`
      )
      .not('company_id', 'in', `(${validCompanyIds.join(',')})`);
      
    if (campaignsError) {
      console.error("Error deleting test campaigns:", campaignsError);
    }
    
    // Delete test leads
    const { error: leadsError } = await supabase
      .from('leads')
      .delete()
      .or(
        `name.ilike.%test%, name.ilike.%demo%, name.ilike.%example%, name.ilike.%sample%`
      )
      .not('company_id', 'in', `(${validCompanyIds.join(',')})`);
      
    if (leadsError) {
      console.error("Error deleting test leads:", leadsError);
    }
    
    toast.success("Test data cleanup completed");
    return true;
  } catch (error) {
    console.error("Error during test data cleanup:", error);
    toast.error("Error cleaning up test data");
    return false;
  }
}
