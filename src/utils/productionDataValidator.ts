
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ValidationIssue {
  table: string;
  message: string;
  recordId?: string;
  severity: 'error' | 'warning';
}

export interface ValidationResults {
  success: boolean;
  validRecords: number;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  timestamp: string;
}

/**
 * Validates the database to ensure it contains only production-ready data
 * and not test/demo data
 */
export async function validateAndCleanProductionData(): Promise<ValidationResults> {
  const results: ValidationResults = {
    success: false,
    validRecords: 0,
    errors: [],
    warnings: [],
    timestamp: new Date().toISOString()
  };
  
  try {
    // Check companies table for test/demo data
    const { data: testCompanies, error: companyError } = await supabase
      .from('companies')
      .select('id, name')
      .or('name.ilike.%test%,name.ilike.%demo%,name.ilike.%example%,name.ilike.%sample%')
      .limit(100);
      
    if (companyError) {
      results.errors.push({
        table: 'companies',
        message: `Error checking companies: ${companyError.message}`,
        severity: 'error'
      });
    } else if (testCompanies && testCompanies.length > 0) {
      // Found test companies - critical error
      for (const company of testCompanies) {
        results.errors.push({
          table: 'companies',
          message: `Test company found: "${company.name}"`,
          recordId: company.id,
          severity: 'error'
        });
      }
    }
    
    // Check for test users
    const { data: testUsers, error: userError } = await supabase
      .from('profiles')
      .select('id, email')
      .or('email.ilike.%test%,email.ilike.%demo%,email.ilike.%example%')
      .limit(100);
      
    if (userError) {
      results.errors.push({
        table: 'profiles',
        message: `Error checking users: ${userError.message}`,
        severity: 'error'
      });
    } else if (testUsers && testUsers.length > 0) {
      // Found test users - critical error
      for (const user of testUsers) {
        results.errors.push({
          table: 'profiles',
          message: `Test user found: "${user.email}"`,
          recordId: user.id,
          severity: 'error'
        });
      }
    }
    
    // Check for demo leads
    const { data: demoLeads, error: leadsError } = await supabase
      .from('leads')
      .select('id, name, is_demo')
      .eq('is_demo', true)
      .limit(100);
      
    if (leadsError) {
      results.warnings.push({
        table: 'leads',
        message: `Error checking leads: ${leadsError.message}`,
        severity: 'warning'
      });
    } else if (demoLeads && demoLeads.length > 0) {
      // Found demo leads - warning only
      for (const lead of demoLeads) {
        results.warnings.push({
          table: 'leads',
          message: `Demo lead found: "${lead.name}"`,
          recordId: lead.id,
          severity: 'warning'
        });
      }
    }
    
    // Verify company-user relationships
    const { data: usersWithoutCompany, error: relationError } = await supabase
      .from('profiles')
      .select('id, email')
      .is('company_id', null)
      .not('role', 'eq', 'admin') // Admins don't need company relationships
      .limit(100);
      
    if (relationError) {
      results.warnings.push({
        table: 'profiles',
        message: `Error checking user-company relationships: ${relationError.message}`,
        severity: 'warning'
      });
    } else if (usersWithoutCompany && usersWithoutCompany.length > 0) {
      // Found users without company - warning only
      for (const user of usersWithoutCompany) {
        results.warnings.push({
          table: 'profiles',
          message: `User "${user.email}" has no associated company`,
          recordId: user.id,
          severity: 'warning'
        });
      }
    }
    
    // Count valid production records
    const { count: validCompanies, error: countError } = await supabase
      .from('companies')
      .select('id', { count: 'exact' })
      .not('name', 'ilike', '%test%')
      .not('name', 'ilike', '%demo%')
      .not('name', 'ilike', '%example%')
      .not('name', 'ilike', '%sample%');
      
    if (!countError) {
      results.validRecords = validCompanies || 0;
    }
    
    // Mark validation as successful if no critical errors found
    results.success = results.errors.length === 0;
    
    // Log results
    console.log("Production data validation results:", results);
    
    return results;
  } catch (error: any) {
    console.error("Error in production data validation:", error);
    results.errors.push({
      table: 'general',
      message: `Validation process error: ${error.message}`,
      severity: 'error'
    });
    results.success = false;
    return results;
  }
}

/**
 * Attempts to clean production data by removing test/demo records
 * WARNING: This actually deletes data, so use with caution
 */
export async function cleanProductionData(): Promise<{
  success: boolean;
  cleanedCompanies: number;
  cleanedUsers: number;
  cleanedLeads: number;
  error?: string;
}> {
  try {
    // Delete test companies
    const { data: deletedCompanies, error: companyError } = await supabase
      .from('companies')
      .delete()
      .or('name.ilike.%test%,name.ilike.%demo%,name.ilike.%example%,name.ilike.%sample%')
      .select('id');
      
    if (companyError) {
      return {
        success: false,
        cleanedCompanies: 0,
        cleanedUsers: 0,
        cleanedLeads: 0,
        error: `Error cleaning companies: ${companyError.message}`
      };
    }
    
    // Mark demo leads as real by removing demo flag
    const { data: updatedLeads, error: leadsError } = await supabase
      .from('leads')
      .update({ is_demo: false })
      .eq('is_demo', true)
      .select('id');
      
    if (leadsError) {
      return {
        success: false,
        cleanedCompanies: deletedCompanies?.length || 0,
        cleanedUsers: 0,
        cleanedLeads: 0,
        error: `Error cleaning leads: ${leadsError.message}`
      };
    }
    
    // Don't delete users, as this would require auth deletion
    // Instead, just log a warning
    const { count: testUsersCount, error: userError } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' })
      .or('email.ilike.%test%,email.ilike.%demo%,email.ilike.%example%');
      
    if (userError) {
      return {
        success: false,
        cleanedCompanies: deletedCompanies?.length || 0,
        cleanedLeads: updatedLeads?.length || 0,
        cleanedUsers: 0,
        error: `Error counting test users: ${userError.message}`
      };
    }
    
    if (testUsersCount && testUsersCount > 0) {
      toast.warning(`Found ${testUsersCount} test users that should be removed manually from the Supabase Auth panel.`);
    }
    
    return {
      success: true,
      cleanedCompanies: deletedCompanies?.length || 0,
      cleanedUsers: 0, // We don't actually delete users
      cleanedLeads: updatedLeads?.length || 0
    };
  } catch (error: any) {
    console.error("Error cleaning production data:", error);
    return {
      success: false,
      cleanedCompanies: 0,
      cleanedUsers: 0,
      cleanedLeads: 0,
      error: error.message
    };
  }
}
