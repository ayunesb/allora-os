var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Supabase Edge Function for Clearbit Lookups
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
// CORS headers for the response
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        // Get the request body
        const { type, query } = yield req.json();
        // console.log(`Received ${type} lookup request for: ${query}`);
        // Get the Clearbit API key from environment
        const clearbitApiKey = Deno.env.get("CLEARBIT_API_KEY");
        if (!clearbitApiKey) {
            throw new Error("CLEARBIT_API_KEY environment variable not set");
        }
        let result;
        // Perform the appropriate lookup based on type
        if (type === "company") {
            // Company lookup by domain
            const response = yield fetch(`https://company.clearbit.com/v2/companies/find?domain=${query}`, {
                headers: {
                    Authorization: `Bearer ${clearbitApiKey}`,
                },
            });
            if (!response.ok) {
                if (response.status === 404) {
                    return new Response(JSON.stringify({ result: "Company not found" }), {
                        headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                    });
                }
                throw new Error(`Clearbit API error: ${response.statusText}`);
            }
            const data = yield response.json();
            result = {
                name: data.name,
                domain: data.domain,
                logo: data.logo,
                description: data.description,
                industry: (_a = data.category) === null || _a === void 0 ? void 0 : _a.industry,
                sector: (_b = data.category) === null || _b === void 0 ? void 0 : _b.sector,
                employees: (_c = data.metrics) === null || _c === void 0 ? void 0 : _c.employees,
                location: data.location,
                country: (_d = data.geo) === null || _d === void 0 ? void 0 : _d.country,
                tags: data.tags,
            };
        }
        else if (type === "person") {
            // Person lookup by email
            const response = yield fetch(`https://person.clearbit.com/v2/people/find?email=${query}`, {
                headers: {
                    Authorization: `Bearer ${clearbitApiKey}`,
                },
            });
            if (!response.ok) {
                if (response.status === 404) {
                    return new Response(JSON.stringify({ result: "Person not found" }), {
                        headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
                    });
                }
                throw new Error(`Clearbit API error: ${response.statusText}`);
            }
            const data = yield response.json();
            result = {
                name: (_e = data.name) === null || _e === void 0 ? void 0 : _e.fullName,
                firstName: (_f = data.name) === null || _f === void 0 ? void 0 : _f.givenName,
                lastName: (_g = data.name) === null || _g === void 0 ? void 0 : _g.familyName,
                email: data.email,
                title: data.title,
                company: (_h = data.employment) === null || _h === void 0 ? void 0 : _h.name,
                role: (_j = data.employment) === null || _j === void 0 ? void 0 : _j.role,
                location: data.location,
                bio: data.bio,
                avatar: data.avatar,
            };
        }
        else {
            throw new Error("Invalid lookup type. Must be 'company' or 'person'");
        }
        // console.log("Lookup completed successfully");
        return new Response(JSON.stringify({ result }), {
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error in clearbit-lookup function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
