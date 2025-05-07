var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
        if (!OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not configured in Supabase secrets");
        }
        const { text, voice = "alloy" } = yield req.json();
        if (!text) {
            throw new Error("Text is required");
        }
        // Generate speech from text using OpenAI TTS API
        const response = yield fetch("https://api.openai.com/v1/audio/speech", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "tts-1",
                input: text,
                voice: voice, // alloy, echo, fable, onyx, nova, or shimmer
                response_format: "mp3",
            }),
        });
        if (!response.ok) {
            const error = yield response.json();
            throw new Error(((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || "Failed to generate speech");
        }
        // Get audio as ArrayBuffer
        const audioArrayBuffer = yield response.arrayBuffer();
        // Convert to base64 for easy transfer
        const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioArrayBuffer)));
        return new Response(JSON.stringify({
            audio: base64Audio,
            format: "mp3",
            voice: voice,
            text: text,
        }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error in text-to-speech function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
