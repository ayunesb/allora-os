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
import { getExecutiveDecisions } from "@/agents/decisionService";
export function useDecisions() {
    const [decisions, setDecisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        function loadDecisions() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    setLoading(true);
                    const decisionsData = yield getExecutiveDecisions();
                    setDecisions(decisionsData);
                    setError(null);
                }
                catch (err) {
                    console.error("Failed to load executive decisions:", err);
                    setError("Could not load executive decisions. Please try again later.");
                }
                finally {
                    setLoading(false);
                }
            });
        }
        loadDecisions();
    }, []);
    return { decisions, loading, error };
}
