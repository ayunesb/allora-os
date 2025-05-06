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
import { toast } from "sonner";
import { trackUserAction } from "@/utils/selfLearning"; // Updated import path
export function makeCall(to, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("twilio", {
                body: { action: "make-call", to },
            });
            if (error)
                throw error;
            if (data.success) {
                toast.success("Call initiated successfully");
                // Track this action in our self-learning system if we have userId
                if (userId) {
                    yield trackUserAction(userId, "initiate_call", "call_initiate", data.callSid, "phone_call", { to, success: true });
                }
                return {
                    success: true,
                    callSid: data.callSid,
                };
            }
            else {
                throw new Error(data.message || "Failed to initiate call");
            }
            return data; // Ensure return in try block
        }
        catch (error) {
            toast.error(`Call error: ${error.message}`);
            // Track failed call attempt if we have userId
            if (userId) {
                yield trackUserAction(userId, "failed_call", "call_initiate", "", "phone_call", { to, success: false, error: error.message });
            }
            return {
                success: false,
                error: error.message,
            };
        }
    });
}
export function getCallStatus(callSid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("twilio", {
                body: { action: "get-call-status", callSid },
            });
            if (error)
                throw error;
            if (data.success) {
                return {
                    success: true,
                    status: data.status,
                };
            }
            else {
                throw new Error(data.message || "Failed to get call status");
            }
        }
        catch (error) {
            console.error("Call status error:", error.message);
            return {
                success: false,
                error: error.message,
            };
        }
    });
}
// Example usage of someFunc with a fallback string
someFunc(""); // Replace undefined with a fallback string
// OR
const someCondition = true; // Define someCondition with a default value
if (someCondition)
    someFunc("default value"); // Provide a default string argument
function someFunc(p0) {
    throw new Error("Function not implemented.");
}
