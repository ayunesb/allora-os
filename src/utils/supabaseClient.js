"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseClient = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
var supabaseUrl = process.env.SUPABASE_URL || "";
var supabaseKey = process.env.SUPABASE_KEY || "";
exports.SupabaseClient = (0, supabase_js_1.createClient)(
  supabaseUrl,
  supabaseKey,
);
