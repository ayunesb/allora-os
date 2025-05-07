var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { corsHeaders } from "../_shared/cors.ts";
// Get environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const zyteApiKey = Deno.env.get("ZYTE_API_KEY") || "";
// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);
Deno.serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    // Ensure only POST requests are handled
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    try {
        // Get the request body
        const { website } = yield req.json();
        if (!website) {
            return new Response(JSON.stringify({ error: "Website URL is required" }), {
                status: 400,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        console.log(`Fetching company data for website: ${website}`);
        // Normalize the website URL
        let normalizedUrl = website;
        if (!normalizedUrl.startsWith("http")) {
            normalizedUrl = `https://${normalizedUrl}`;
        }
        // Make request to Zyte API with comprehensive extraction
        const zyteResponse = yield fetch("https://api.zyte.com/v1/extract", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${btoa(`${zyteApiKey}:`)}`,
            },
            body: JSON.stringify({
                url: normalizedUrl,
                browserHtml: true,
                extractFrom: {
                    webPage: {
                        "schema.org": {
                            "@type": ["Organization", "LocalBusiness", "Corporation"],
                        },
                        meta: true,
                        article: true,
                        address: true,
                        organizationContacts: true,
                        product: true,
                        autoKeywords: true,
                        links: true,
                        itemList: true,
                        screenshot: true,
                    },
                },
            }),
        });
        if (!zyteResponse.ok) {
            const errorData = yield zyteResponse.json();
            console.error("Zyte API error:", errorData);
            return new Response(JSON.stringify({
                error: "Failed to fetch company data",
                details: errorData,
            }), {
                status: 500,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        // Process the response
        const responseData = yield zyteResponse.json();
        const companyData = processCompanyData(responseData);
        return new Response(JSON.stringify({
            success: true,
            data: companyData,
        }), {
            status: 200,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: error.message || "Unknown error occurred" }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
// Helper function to process and extract relevant company data from Zyte response
function processCompanyData(zyteData) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    try {
        const result = {
            name: "",
            description: "",
            industry: "",
            size: "",
            products: [],
            services: [],
            website: "",
            headquarters: "",
            founded: "",
        };
        // Extract company name
        if ((_b = (_a = zyteData.webPage) === null || _a === void 0 ? void 0 : _a.schema) === null || _b === void 0 ? void 0 : _b.org) {
            const org = zyteData.webPage.schema.org.find((item) => item["@type"] === "Organization" ||
                item["@type"] === "LocalBusiness" ||
                item["@type"] === "Corporation");
            if (org) {
                result.name = org.name || "";
                result.website = org.url || "";
                result.founded = org.foundingDate || "";
            }
        }
        // If no name found in schema.org data, try meta data
        if (!result.name && ((_c = zyteData.webPage) === null || _c === void 0 ? void 0 : _c.meta)) {
            result.name = zyteData.webPage.meta.title || "";
        }
        // Extract description
        if ((_e = (_d = zyteData.webPage) === null || _d === void 0 ? void 0 : _d.meta) === null || _e === void 0 ? void 0 : _e.description) {
            result.description = zyteData.webPage.meta.description;
        }
        else if ((_g = (_f = zyteData.webPage) === null || _f === void 0 ? void 0 : _f.article) === null || _g === void 0 ? void 0 : _g.description) {
            result.description = zyteData.webPage.article.description;
        }
        // Extract industry from keywords
        if ((_h = zyteData.webPage) === null || _h === void 0 ? void 0 : _h.autoKeywords) {
            const keywords = zyteData.webPage.autoKeywords
                .slice(0, 5)
                .map((k) => k.value);
            const industryKeywords = {
                technology: "Technology",
                software: "Technology",
                tech: "Technology",
                healthcare: "Healthcare",
                medical: "Healthcare",
                finance: "Finance",
                banking: "Finance",
                education: "Education",
                retail: "Retail",
                ecommerce: "E-Commerce",
                manufacturing: "Manufacturing",
                "real estate": "Real Estate",
                property: "Real Estate",
                construction: "Construction",
                // Add more industry mappings as needed
            };
            for (const keyword of keywords) {
                for (const [industryKey, industryValue] of Object.entries(industryKeywords)) {
                    if (keyword.toLowerCase().includes(industryKey)) {
                        result.industry = industryValue;
                        break;
                    }
                }
                if (result.industry)
                    break;
            }
        }
        // Extract products
        if ((_j = zyteData.webPage) === null || _j === void 0 ? void 0 : _j.product) {
            result.products = zyteData.webPage.product.map((p) => p.name || "Unnamed Product");
        }
        // Try to extract services from navigation
        if ((_k = zyteData.webPage) === null || _k === void 0 ? void 0 : _k.links) {
            const serviceKeywords = [
                "services",
                "solutions",
                "offerings",
                "what we do",
            ];
            const serviceLinks = zyteData.webPage.links.filter((link) => serviceKeywords.some((keyword) => link.text.toLowerCase().includes(keyword)));
            if (serviceLinks.length > 0) {
                result.services = serviceLinks.map((link) => link.text);
            }
        }
        // Try to estimate company size
        if ((_m = (_l = zyteData.webPage) === null || _l === void 0 ? void 0 : _l.article) === null || _m === void 0 ? void 0 : _m.text) {
            const sizePatterns = [
                { regex: /([0-9,]+)\s*employees/i, group: 1 },
                { regex: /team of\s*([0-9,]+)/i, group: 1 },
                { regex: /staff of\s*([0-9,]+)/i, group: 1 },
                { regex: /company of\s*([0-9,]+)/i, group: 1 },
            ];
            for (const pattern of sizePatterns) {
                const match = zyteData.webPage.article.text.match(pattern.regex);
                if (match && match[pattern.group]) {
                    result.size = match[pattern.group].replace(/,/g, "");
                    break;
                }
            }
        }
        return result;
    }
    catch (error) {
        console.error("Error processing company data:", error);
        return {
            name: "",
            description: "",
            industry: "",
            size: "",
            products: [],
            services: [],
            website: "",
            headquarters: "",
            founded: "",
        };
    }
}
