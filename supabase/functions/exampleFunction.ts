import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

interface RequestBody {
    userId: string;
    action: string;
}

serve(async (req: Request) => {
    try {
        const { userId, action }: RequestBody = await req.json();
        if (!userId || !action) {
            return new Response("Invalid request body", { status: 400 });
        }
        // Perform action logic here
        return new Response("Action performed successfully", { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error handling request:", error.message);
        }
        return new Response("Internal server error", { status: 500 });
    }
});
