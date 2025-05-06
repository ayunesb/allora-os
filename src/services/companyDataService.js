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
export function fetchCompanyDataFromWebsite(website) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Fetching company data for:", website);
            const { data, error } = yield supabase.functions.invoke("get-company-data", {
                body: { website },
            });
            if (error) {
                console.error("Error fetching company data:", error);
                return null;
            }
            console.log("Company data fetched successfully:", data);
            return data.data;
        }
        catch (error) {
            console.error("Error in fetchCompanyDataFromWebsite:", error);
            return null;
        }
    });
}
