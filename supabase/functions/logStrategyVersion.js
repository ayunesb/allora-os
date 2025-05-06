var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";
serve((req) => __awaiter(void 0, void 0, void 0, function* () {
    const { strategy_id, changes, version } = yield req.json();
    const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
    const { error } = yield supabase
        .from("strategy_versions")
        .insert([{ strategy_id, version, changes }]);
    return new Response(JSON.stringify({ ok: !error }), {
        status: error ? 500 : 200,
    });
}));
