var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { syncCampaignData } from "@/services/campaignService";
import { toast } from "sonner";
/**
 * Refreshes campaign data from external ad platforms
 *
 * This function syncs data for all deployed and paid campaigns,
 * showing appropriate toast messages for success/failure.
 *
 * @returns Promise that resolves when refresh operation is complete
 */
export function refreshCampaignData(_a) {
    return __awaiter(this, arguments, void 0, function* ({ campaigns, onComplete, setIsRefreshing, }) {
        setIsRefreshing(true);
        try {
            // Only refresh deployed campaigns
            const deployedCampaigns = campaigns.filter((c) => c.deployment_status === "deployed" && c.payment_status === "paid");
            if (deployedCampaigns.length === 0) {
                yield onComplete();
                toast.success("Campaign list refreshed");
                return;
            }
            // Sync data for each deployed campaign
            for (const campaign of deployedCampaigns) {
                yield syncCampaignData(campaign.id);
            }
            // Refetch campaigns
            yield onComplete();
            toast.success("Campaign data refreshed");
        }
        catch (error) {
            console.error("Error refreshing campaign data:", error);
            toast.error("Failed to refresh campaign data");
            // Provide more detailed error information when available
            if (error instanceof Error) {
                console.error("Error details:", error.message);
            }
        }
        finally {
            setIsRefreshing(false);
        }
    });
}
