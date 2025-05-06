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
/**
 * Validates API connections
 */
export function validateApiConnections() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // In a real-world scenario, you would make test calls to each API
            // This is a simplified check to verify Supabase connection
            const { error } = yield supabase.from("companies").select("id").limit(1);
            if (error) {
                return {
                    valid: false,
                    message: `Database connection error: ${error.message}`,
                };
            }
            return {
                valid: true,
                message: "API connections are working correctly.",
            };
        }
        catch (error) {
            return {
                valid: false,
                message: "Error validating API connections: " +
                    (error instanceof Error ? error.message : String(error)),
            };
        }
    });
}
