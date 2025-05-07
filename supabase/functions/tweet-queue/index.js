var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";
import { corsHeaders } from "../_shared/cors.ts";
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://tnfqzklfdwknmplrygag.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZnF6a2xmZHdrbm1wbHJ5Z2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTUwNTksImV4cCI6MjA2MDI3MTA1OX0.8s7ol8jfz_6anK4l2aGBXaICDf3lLHmHSPovcXXGQ1A";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);
const adminClient = createClient(supabaseUrl, supabaseServiceKey);
/**
 * Get all tweets in the queue with pagination and filtering
 */
function getTweetQueue(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase
            .from("tweet_queue")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) {
            console.error("Error fetching tweet queue:", error);
            return { error: error.message };
        }
        return data;
    });
}
/**
 * Add a tweet to the queue
 */
function queueTweet(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tenant_id, message } = body;
        if (!tenant_id || !message) {
            return { error: "Missing required parameters: tenant_id and message" };
        }
        const { data, error } = yield supabase
            .from("tweet_queue")
            .insert({
            tenant_id,
            content: message,
            status: "pending",
        })
            .select()
            .single();
        if (error) {
            console.error("Error adding tweet to queue:", error);
            return { error: error.message };
        }
        return { success: true, tweet: data };
    });
}
/**
 * Process a tweet from the queue
 */
function processTweet(params, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = params.get("id");
        const action = params.get("action");
        if (!id) {
            return { error: "Missing required parameter: id" };
        }
        if (action === "approve") {
            try {
                // Fetch the tweet to get its content
                const { data: tweet, error: fetchError } = yield supabase
                    .from("tweet_queue")
                    .select("*")
                    .eq("id", id)
                    .single();
                if (fetchError || !tweet) {
                    console.error("Error fetching tweet:", fetchError);
                    return { error: (fetchError === null || fetchError === void 0 ? void 0 : fetchError.message) || "Tweet not found" };
                }
                // Call the twitter-post function to post the tweet
                const twitterResponse = yield fetch(`${supabaseUrl}/functions/v1/twitter-post`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${supabaseKey}`,
                    },
                    body: JSON.stringify({
                        tenant_id: tweet.tenant_id,
                        message: tweet.content,
                    }),
                });
                const twitterResult = yield twitterResponse.json();
                // Update the tweet status based on the result
                const newStatus = twitterResult.success ? "sent" : "failed";
                yield supabase
                    .from("tweet_queue")
                    .update({
                    status: newStatus,
                    processed_at: new Date().toISOString(),
                    result: twitterResult,
                })
                    .eq("id", id);
                return {
                    success: twitterResult.success,
                    tweet_id: twitterResult.tweet_id,
                    status: newStatus,
                };
            }
            catch (error) {
                console.error("Error processing tweet:", error);
                // Update the tweet status to failed
                yield supabase
                    .from("tweet_queue")
                    .update({
                    status: "failed",
                    processed_at: new Date().toISOString(),
                    result: { error: error.message },
                })
                    .eq("id", id);
                return { error: error.message || "Unknown error" };
            }
        }
        else if (action === "reject") {
            const { error } = yield supabase
                .from("tweet_queue")
                .update({
                status: "rejected",
                processed_at: new Date().toISOString(),
            })
                .eq("id", id);
            if (error) {
                console.error("Error rejecting tweet:", error);
                return { error: error.message };
            }
            return { success: true, status: "rejected" };
        }
        return { error: "Invalid action" };
    });
}
Deno.serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }
    try {
        const url = new URL(req.url);
        const params = url.searchParams;
        // GET request to fetch the tweet queue
        if (req.method === "GET") {
            const tweets = yield getTweetQueue(params);
            return new Response(JSON.stringify(tweets), {
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        // POST request to either add a tweet to the queue or process a tweet
        if (req.method === "POST") {
            const action = params.get("action");
            const body = yield req.json();
            let result;
            if (action === "approve" || action === "reject") {
                // Process an existing tweet
                result = yield processTweet(params, body);
            }
            else {
                // Add a new tweet to the queue
                result = yield queueTweet(body);
            }
            return new Response(JSON.stringify(result), {
                status: result.error ? 400 : 200,
                headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
            });
        }
        // Handle other request types
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
    catch (error) {
        console.error("Error in tweet-queue function:", error);
        return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
            status: 500,
            headers: Object.assign(Object.assign({}, corsHeaders), { "Content-Type": "application/json" }),
        });
    }
}));
