var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/backend/supabase";
// This is a client-side API endpoint for Vite (not Next.js)
export default function voiceToTextHandler(req) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method !== "POST") {
            return new Response(JSON.stringify({ error: "Method not allowed" }), {
                status: 405,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        try {
            const body = yield req.json();
            const { audio } = body;
            if (!audio) {
                return new Response(JSON.stringify({ error: "No audio data provided" }), {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
            // Call the Supabase Edge Function
            const { data, error } = yield supabase.functions.invoke("voice-to-text", {
                body: { audio },
            });
            if (error) {
                console.error("Error calling voice-to-text function:", error);
                return new Response(JSON.stringify({
                    error: error.message || "Failed to transcribe audio",
                }), {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        catch (error) {
            console.error("Error in voice-to-text API route:", error);
            return new Response(JSON.stringify({
                error: error instanceof Error ? error.message : "An unknown error occurred",
            }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    });
}
