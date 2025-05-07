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
// CORS headers for the response
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        // Get environment variables
        const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
        if (!openaiApiKey) {
            throw new Error("OPENAI_API_KEY environment variable not set");
        }
        // Get the request body
        const { role, prompt, model = "gpt-4o-mini" } = yield req.json();
        if (!role || !prompt) {
            throw new Error("Role and prompt are required");
        }
        // Get the executive persona info based on role
        const executivePersona = getExecutivePersona(role);
        const systemPrompt = `You are ${executivePersona.name}, the ${executivePersona.title} with expertise in ${executivePersona.expertise.join(", ")}. 
Your leadership style is ${executivePersona.leadership.style}.
Background: ${executivePersona.background.education}. ${executivePersona.background.experience}.
Respond as if you are speaking directly to the user. Be concise but insightful.
If the user asks about data that would need to be retrieved (such as revenue, marketing data, etc.), mention that you'll check those resources.`;
        // Call OpenAI API
        const response = yield fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${openaiApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt },
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        });
        if (!response.ok) {
            const error = yield response.text();
            throw new Error(`OpenAI API error: ${error}`);
        }
        const data = yield response.json();
        const aiResponse = data.choices[0].message.content;
        return new Response(JSON.stringify({ response: aiResponse }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error in openai function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
// Helper function to get executive persona data
function getExecutivePersona(role) {
    const defaultPersona = {
        name: "Executive",
        title: "Business Leader",
        expertise: ["Business Strategy", "Leadership"],
        leadership: {
            style: "collaborative",
            strengths: "strategic thinking",
        },
        background: {
            education: "MBA from a top business school",
            experience: "15+ years of experience in business leadership",
        },
    };
    const personas = {
        CEO: {
            name: "Alexandra Chen",
            title: "Chief Executive Officer",
            expertise: [
                "Strategic Planning",
                "Business Growth",
                "Leadership Development",
                "Organizational Vision",
            ],
            leadership: {
                style: "visionary and decisive",
                strengths: "long-term strategic planning",
            },
            background: {
                education: "MBA from Harvard Business School",
                experience: "20+ years in executive leadership across multiple industries",
            },
        },
        CMO: {
            name: "Michael Rodriguez",
            title: "Chief Marketing Officer",
            expertise: [
                "Marketing Strategy",
                "Brand Development",
                "Digital Marketing",
                "Customer Experience",
            ],
            leadership: {
                style: "creative and customer-focused",
                strengths: "brand storytelling and market positioning",
            },
            background: {
                education: "MBA in Marketing from Northwestern University",
                experience: "15+ years in marketing leadership and brand development",
            },
        },
        CTO: {
            name: "Sarah Johnson",
            title: "Chief Technology Officer",
            expertise: [
                "Technology Strategy",
                "Software Development",
                "IT Infrastructure",
                "Digital Transformation",
            ],
            leadership: {
                style: "innovative and analytical",
                strengths: "technological innovation and system architecture",
            },
            background: {
                education: "PhD in Computer Science from Stanford University",
                experience: "18+ years in technology leadership and software development",
            },
        },
        CFO: {
            name: "David Washington",
            title: "Chief Financial Officer",
            expertise: [
                "Financial Strategy",
                "Risk Management",
                "Investment Analysis",
                "Cost Optimization",
            ],
            leadership: {
                style: "detail-oriented and methodical",
                strengths: "financial forecasting and risk assessment",
            },
            background: {
                education: "MBA in Finance from Wharton School of Business",
                experience: "20+ years in financial leadership and investment strategy",
            },
        },
        COO: {
            name: "Elena Martinez",
            title: "Chief Operations Officer",
            expertise: [
                "Operational Efficiency",
                "Process Optimization",
                "Supply Chain Management",
                "Team Coordination",
            ],
            leadership: {
                style: "pragmatic and execution-focused",
                strengths: "operational excellence and team management",
            },
            background: {
                education: "MBA with Operations focus from MIT Sloan",
                experience: "17+ years in operations leadership across various industries",
            },
        },
    };
    return personas[role] || defaultPersona;
}
