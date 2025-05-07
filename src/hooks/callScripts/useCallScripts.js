var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
export const useCallScripts = () => {
    const [scripts, setScripts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { profile } = useAuth();
    const generateScript = (params) => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const companyName = (profile === null || profile === void 0 ? void 0 : profile.company) || "your company";
            const industryName = (profile === null || profile === void 0 ? void 0 : profile.industry) || params.industry || "your industry";
            const { data, error } = yield supabase.functions.invoke("generate-call-script", {
                body: {
                    company: companyName,
                    industry: industryName,
                    scriptType: params.scriptType,
                    companySize: typeof params.companySize === "number"
                        ? params.companySize.toString()
                        : params.companySize || "Small",
                    productName: params.productName || "our product",
                    targetAudience: params.targetAudience || "potential customers",
                },
            });
            if (error)
                throw error;
            // Save script to database
            const { data: savedScript, error: saveError } = yield supabase
                .from("ai_communication_scripts")
                .insert({
                content: data.script,
                script_type: params.scriptType,
                company_id: profile === null || profile === void 0 ? void 0 : profile.company_id,
                executive_bot: "Sales Director",
            })
                .select()
                .single();
            if (saveError)
                throw saveError;
            // Update local state
            setScripts((prev) => [savedScript, ...prev]);
            return savedScript;
        }
        catch (err) {
            console.error("Error generating script:", err);
            setError(err.message || "Failed to generate script");
            return null;
        }
        finally {
            setIsLoading(false);
        }
    });
    const fetchScripts = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!(profile === null || profile === void 0 ? void 0 : profile.company_id))
            return;
        setIsLoading(true);
        try {
            const { data, error } = yield supabase
                .from("ai_communication_scripts")
                .select("*")
                .eq("company_id", profile.company_id)
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            setScripts(data);
        }
        catch (err) {
            console.error("Error fetching scripts:", err);
            setError(err.message || "Failed to fetch scripts");
        }
        finally {
            setIsLoading(false);
        }
    });
    useEffect(() => {
        fetchScripts();
    }, [profile === null || profile === void 0 ? void 0 : profile.company_id]);
    return {
        scripts,
        isLoading,
        error,
        generateScript,
        fetchScripts,
    };
};
