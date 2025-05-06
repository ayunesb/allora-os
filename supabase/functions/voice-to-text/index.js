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
// Process base64 in chunks to prevent memory issues
function processBase64Chunks(base64String, chunkSize = 32768) {
    const chunks = [];
    let position = 0;
    while (position < base64String.length) {
        const chunk = base64String.slice(position, position + chunkSize);
        const binaryChunk = atob(chunk);
        const bytes = new Uint8Array(binaryChunk.length);
        for (let i = 0; i < binaryChunk.length; i++) {
            bytes[i] = binaryChunk.charCodeAt(i);
        }
        chunks.push(bytes);
        position += chunkSize;
    }
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result;
}
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        const { audio } = yield req.json();
        if (!audio) {
            throw new Error("No audio data provided");
        }
        // Process audio in chunks
        const binaryAudio = processBase64Chunks(audio);
        // Prepare form data
        const formData = new FormData();
        const blob = new Blob([binaryAudio], { type: "audio/webm" });
        formData.append("file", blob, "audio.webm");
        formData.append("model", "whisper-1");
        // Send to OpenAI
        const response = yield fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`OpenAI API error: ${yield response.text()}`);
        }
        const result = yield response.json();
        return new Response(JSON.stringify({ text: result.text }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error in voice-to-text function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
