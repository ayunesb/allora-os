var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
// Patterns for identifying test/demo data
const TEST_PATTERNS = [
    "%test%",
    "%demo%",
    "%example%",
    "%sample%",
    "%dummy%",
    "%mock%",
];
/**
 * Validates production data and removes test/demo data if necessary
 * This is used by the admin system to ensure the database is ready for production
 */
export function validateAndCleanProductionData() {
    return __awaiter(this, void 0, void 0, function* () {
        const results = {
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
                campaigns: { total: 0, valid: 0, cleaned: 0 },
            },
        };
        try {
            // Check database connection first
            const { error: connectionError } = yield supabase
                .from("companies")
                .select("count")
                .limit(1);
            if (connectionError) {
                results.errors.push({
                    table: "system",
                    message: `Database connection error: ${connectionError.message}`,
                    severity: "error",
                });
                results.success = false;
                return results;
            }
            // Begin validation process
            yield validateCompanies(results);
            yield validateLeads(results);
            yield validateStrategies(results);
            yield validateCampaigns(results);
            // Calculate total valid records across all tables
            results.validRecords =
                results.validationDetails.companies.valid +
                    results.validationDetails.leads.valid +
                    results.validationDetails.strategies.valid +
                    results.validationDetails.campaigns.valid;
            results.success = results.errors.length === 0;
            return results;
        }
        catch (error) {
            console.error("Validation error:", error);
            results.success = false;
            results.errors.push({
                table: "system",
                message: `System error during validation: ${error.message}`,
                severity: "error",
            });
            return results;
        }
    });
}
/**
 * Validates and cleans companies table
 */
function validateCompanies(results) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First, get total count for reporting
            const { count: totalCount, error: countError } = yield supabase
                .from("companies")
                .select("*", { count: "exact", head: true });
            if (countError)
                throw new Error(`Error counting companies: ${countError.message}`);
            results.validationDetails.companies.total = totalCount || 0;
            // Look for test/demo companies using multiple patterns
            const orConditions = TEST_PATTERNS.map((pattern) => `name.ilike.${pattern}`).join(", ");
            const { data: testCompanies, error: companiesError } = yield supabase
                .from("companies")
                .select("id, name, created_at")
                .or(orConditions);
            if (companiesError) {
                results.errors.push({
                    table: "companies",
                    message: `Error checking companies: ${companiesError.message}`,
                    severity: "error",
                });
                return;
            }
            if (testCompanies && testCompanies.length > 0) {
                results.cleanupPerformed = true;
                results.validationDetails.companies.cleaned = testCompanies.length;
                // Remove test/demo companies
                for (const company of testCompanies) {
                    const { error: deleteError } = yield supabase
                        .from("companies")
                        .delete()
                        .eq("id", company.id);
                    if (deleteError) {
                        results.errors.push({
                            table: "companies",
                            message: `Error removing test company ${company.name}: ${deleteError.message}`,
                            recordId: company.id,
                            severity: "error",
                        });
                    }
                    else {
                        results.warnings.push({
                            table: "companies",
                            message: `Removed test/demo company: ${company.name}`,
                            recordId: company.id,
                            severity: "warning",
                        });
                    }
                }
            }
            // Count valid records (non-test companies)
            const { count: validCount, error: validError } = yield supabase
                .from("companies")
                .select("id", { count: "exact", head: true })
                .not("name", "ilike", "%test%")
                .not("name", "ilike", "%demo%")
                .not("name", "ilike", "%example%")
                .not("name", "ilike", "%sample%");
            if (validError) {
                results.errors.push({
                    table: "companies",
                    message: `Error counting valid companies: ${validError.message}`,
                    severity: "error",
                });
            }
            else {
                results.validationDetails.companies.valid = validCount || 0;
            }
        }
        catch (error) {
            results.errors.push({
                table: "companies",
                message: `Error during company validation: ${error.message}`,
                severity: "error",
            });
        }
    });
}
/**
 * Validates and cleans leads table
 */
function validateLeads(results) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First, get total count for reporting
            const { count: totalCount, error: countError } = yield supabase
                .from("leads")
                .select("*", { count: "exact", head: true });
            if (countError)
                throw new Error(`Error counting leads: ${countError.message}`);
            results.validationDetails.leads.total = totalCount || 0;
            // Build conditions to find test leads
            const nameConditions = TEST_PATTERNS.map((pattern) => `name.ilike.${pattern}`).join(", ");
            const emailConditions = TEST_PATTERNS.map((pattern) => `email.ilike.${pattern}`).join(", ");
            const { data: testLeads, error: leadsError } = yield supabase
                .from("leads")
                .select("id, name, email")
                .or(`${nameConditions}, ${emailConditions}`);
            if (leadsError) {
                results.errors.push({
                    table: "leads",
                    message: `Error checking leads: ${leadsError.message}`,
                    severity: "error",
                });
                return;
            }
            if (testLeads && testLeads.length > 0) {
                results.cleanupPerformed = true;
                results.validationDetails.leads.cleaned = testLeads.length;
                // Remove test/demo leads
                for (const lead of testLeads) {
                    const { error: deleteError } = yield supabase
                        .from("leads")
                        .delete()
                        .eq("id", lead.id);
                    if (deleteError) {
                        results.errors.push({
                            table: "leads",
                            message: `Error removing test lead ${lead.name || lead.email}: ${deleteError.message}`,
                            recordId: lead.id,
                            severity: "error",
                        });
                    }
                    else {
                        results.warnings.push({
                            table: "leads",
                            message: `Removed test/demo lead: ${lead.name || lead.email}`,
                            recordId: lead.id,
                            severity: "warning",
                        });
                    }
                }
            }
            // Count valid records (non-test leads)
            const { count: validCount, error: validError } = yield supabase
                .from("leads")
                .select("id", { count: "exact", head: true })
                .not("name", "ilike", "%test%")
                .not("name", "ilike", "%demo%")
                .not("name", "ilike", "%example%")
                .not("email", "ilike", "%test%")
                .not("email", "ilike", "%demo%")
                .not("email", "ilike", "%example%");
            if (validError) {
                results.errors.push({
                    table: "leads",
                    message: `Error counting valid leads: ${validError.message}`,
                    severity: "error",
                });
            }
            else {
                results.validationDetails.leads.valid = validCount || 0;
            }
        }
        catch (error) {
            results.errors.push({
                table: "leads",
                message: `Error during leads validation: ${error.message}`,
                severity: "error",
            });
        }
    });
}
/**
 * Validates and cleans strategies table
 */
function validateStrategies(results) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First, get total count for reporting
            const { count: totalCount, error: countError } = yield supabase
                .from("strategies")
                .select("*", { count: "exact", head: true });
            if (countError)
                throw new Error(`Error counting strategies: ${countError.message}`);
            results.validationDetails.strategies.total = totalCount || 0;
            // Build conditions to find test strategies
            const titleConditions = TEST_PATTERNS.map((pattern) => `title.ilike.${pattern}`).join(", ");
            const descConditions = TEST_PATTERNS.map((pattern) => `description.ilike.${pattern}`).join(", ");
            const { data: testStrategies, error: strategiesError } = yield supabase
                .from("strategies")
                .select("id, title, description")
                .or(`${titleConditions}, ${descConditions}`);
            if (strategiesError) {
                results.errors.push({
                    table: "strategies",
                    message: `Error checking strategies: ${strategiesError.message}`,
                    severity: "error",
                });
                return;
            }
            if (testStrategies && testStrategies.length > 0) {
                results.cleanupPerformed = true;
                results.validationDetails.strategies.cleaned = testStrategies.length;
                // Remove test strategies
                for (const strategy of testStrategies) {
                    const { error: deleteError } = yield supabase
                        .from("strategies")
                        .delete()
                        .eq("id", strategy.id);
                    if (deleteError) {
                        results.errors.push({
                            table: "strategies",
                            message: `Error removing test strategy ${strategy.title}: ${deleteError.message}`,
                            recordId: strategy.id,
                            severity: "error",
                        });
                    }
                    else {
                        results.warnings.push({
                            table: "strategies",
                            message: `Removed test/demo strategy: ${strategy.title}`,
                            recordId: strategy.id,
                            severity: "warning",
                        });
                    }
                }
            }
            // Count valid records (non-test strategies)
            const { count: validCount, error: validError } = yield supabase
                .from("strategies")
                .select("id", { count: "exact", head: true })
                .not("title", "ilike", "%test%")
                .not("title", "ilike", "%demo%")
                .not("title", "ilike", "%example%")
                .not("description", "ilike", "%test%")
                .not("description", "ilike", "%demo%")
                .not("description", "ilike", "%example%");
            if (validError) {
                results.errors.push({
                    table: "strategies",
                    message: `Error counting valid strategies: ${validError.message}`,
                    severity: "error",
                });
            }
            else {
                results.validationDetails.strategies.valid = validCount || 0;
            }
        }
        catch (error) {
            results.errors.push({
                table: "strategies",
                message: `Error during strategies validation: ${error.message}`,
                severity: "error",
            });
        }
    });
}
/**
 * Validates and cleans campaigns table
 */
function validateCampaigns(results) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First, get total count for reporting
            const { count: totalCount, error: countError } = yield supabase
                .from("campaigns")
                .select("*", { count: "exact", head: true });
            if (countError)
                throw new Error(`Error counting campaigns: ${countError.message}`);
            results.validationDetails.campaigns.total = totalCount || 0;
            // Build conditions to find test campaigns
            const nameConditions = TEST_PATTERNS.map((pattern) => `name.ilike.${pattern}`).join(", ");
            const { data: testCampaigns, error: campaignsError } = yield supabase
                .from("campaigns")
                .select("id, name")
                .or(nameConditions);
            if (campaignsError) {
                results.errors.push({
                    table: "campaigns",
                    message: `Error checking campaigns: ${campaignsError.message}`,
                    severity: "error",
                });
                return;
            }
            if (testCampaigns && testCampaigns.length > 0) {
                results.cleanupPerformed = true;
                results.validationDetails.campaigns.cleaned = testCampaigns.length;
                // Remove test campaigns
                for (const campaign of testCampaigns) {
                    const { error: deleteError } = yield supabase
                        .from("campaigns")
                        .delete()
                        .eq("id", campaign.id);
                    if (deleteError) {
                        results.errors.push({
                            table: "campaigns",
                            message: `Error removing test campaign ${campaign.name}: ${deleteError.message}`,
                            recordId: campaign.id,
                            severity: "error",
                        });
                    }
                    else {
                        results.warnings.push({
                            table: "campaigns",
                            message: `Removed test/demo campaign: ${campaign.name}`,
                            recordId: campaign.id,
                            severity: "warning",
                        });
                    }
                }
            }
            // Count valid records (non-test campaigns)
            const { count: validCount, error: validError } = yield supabase
                .from("campaigns")
                .select("id", { count: "exact", head: true })
                .not("name", "ilike", "%test%")
                .not("name", "ilike", "%demo%")
                .not("name", "ilike", "%example%");
            if (validError) {
                results.errors.push({
                    table: "campaigns",
                    message: `Error counting valid campaigns: ${validError.message}`,
                    severity: "error",
                });
            }
            else {
                results.validationDetails.campaigns.valid = validCount || 0;
            }
        }
        catch (error) {
            results.errors.push({
                table: "campaigns",
                message: `Error during campaigns validation: ${error.message}`,
                severity: "error",
            });
        }
    });
}
