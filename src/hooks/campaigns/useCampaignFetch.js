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
export function useCampaignFetch() {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCampaigns = () => __awaiter(this, void 0, void 0, function* () {
            setIsLoading(true);
            try {
                // Mock data with correct types
                const mockCampaigns = [
                    {
                        id: "1",
                        name: "Summer Sale",
                        platform: "meta",
                        budget: 5000,
                        status: "active",
                        executiveBot: "marketing-bot",
                        justification: "Seasonal promotion",
                        roi: 2.5, // Ensure this is a number, not string
                        healthScore: "92%",
                    },
                    {
                        id: "2",
                        name: "Product Launch",
                        platform: "tiktok",
                        budget: 10000,
                        status: "draft",
                        executiveBot: "launch-bot",
                        justification: "New product line",
                        roi: 0, // Ensure this is a number, not string
                        healthScore: "N/A",
                    },
                ];
                setCampaigns(mockCampaigns);
            }
            catch (err) {
                setError(err.message || "Failed to fetch campaigns");
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchCampaigns();
    }, []);
    return {
        campaigns,
        isLoading,
        error,
    };
}
