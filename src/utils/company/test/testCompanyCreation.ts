import { supabase } from "@/backend/supabase";
import { BasicCompanyData, CompanyResponse } from "../types/testCompanyTypes";

/**
 * Creates a test company for the given user
 */
export async function createTestCompany(
  userId: string,
  userEmail: string,
): Promise<CompanyResponse> {
  try {
    // Create a company name based on the user's email
    const emailPrefix = userEmail.split("@")[0];
    const companyName = `Test Company - ${emailPrefix}`;

    // Insert the new company
    const { data, error } = await supabase
      .from("companies")
      .insert([
        {
          name: companyName,
          industry: "Technology",
          details: {
            founded: new Date().getFullYear(),
            size: "small",
            description: "A test company for development purposes",
            created_for_user: userId,
          },
        },
      ])
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: `Failed to create test company: ${error.message}`,
        errorCode: error.code,
      };
    }

    return {
      success: true,
      message: `Test company "${companyName}" created successfully`,
      companyId: data.id,
      companyName: data.name,
      data: data as BasicCompanyData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Error creating test company: ${error.message}`,
      error: error.message,
    };
  }
}
