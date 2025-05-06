import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, RefreshCcw } from "lucide-react";
import {
  checkCampaignPaymentStatus,
  deployCampaign,
  getCampaign,
} from "@/services/campaignService";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
export default function CampaignPaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [campaign, setCampaign] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState("pending");
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        navigate("/dashboard/campaigns");
        return;
      }
      try {
        // Find the campaign with this Stripe session ID
        const { data: campaigns, error } = await supabase
          .from("campaigns")
          .select("*")
          .eq("stripe_payment_id", sessionId)
          .limit(1);
        if (error) throw error;
        if (!campaigns || campaigns.length === 0) {
          toast.error("Campaign not found");
          navigate("/dashboard/campaigns");
          return;
        }
        const campaignId = campaigns[0].id;
        // Check payment status
        const paymentStatus = await checkCampaignPaymentStatus(campaignId);
        if (!paymentStatus.success) {
          toast.error("Failed to verify payment");
          navigate("/dashboard/campaigns");
          return;
        }
        if (paymentStatus.status !== "paid") {
          // Update payment status in real time
          const campaignData = await getCampaign(campaignId);
          setCampaign(campaignData);
          setIsLoading(false);
          // Poll for payment status
          const interval = setInterval(async () => {
            const status = await checkCampaignPaymentStatus(campaignId);
            if (status.status === "paid") {
              clearInterval(interval);
              // Refresh campaign data
              const updatedCampaign = await getCampaign(campaignId);
              setCampaign(updatedCampaign);
            }
          }, 2000);
          return () => clearInterval(interval);
        } else {
          // Payment is already verified
          const campaignData = await getCampaign(campaignId);
          setCampaign(campaignData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        toast.error("Failed to verify payment");
        navigate("/dashboard/campaigns");
      }
    };
    verifyPayment();
  }, [sessionId, navigate]);
  const handleDeployCampaign = async () => {
    if (!campaign) return;
    setIsDeploying(true);
    setDeploymentStatus("deploying");
    try {
      const result = await deployCampaign(campaign.id);
      if (result.success) {
        setDeploymentStatus("deployed");
        // Refresh campaign data
        const updatedCampaign = await getCampaign(campaign.id);
        setCampaign(updatedCampaign);
        toast.success("Campaign deployed successfully!");
      } else {
        setDeploymentStatus("failed");
        toast.error("Failed to deploy campaign");
      }
    } catch (error) {
      console.error("Error deploying campaign:", error);
      setDeploymentStatus("failed");
      toast.error("Failed to deploy campaign");
    } finally {
      setIsDeploying(false);
    }
  };
  const handleViewCampaigns = () => {
    navigate("/dashboard/campaigns");
  };
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex justify-center">
              <RefreshCcw className="h-6 w-6 animate-spin" />
            </CardTitle>
            <CardDescription>Verifying payment...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="flex flex-col items-center gap-2">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <span>Payment Successful!</span>
              </CardTitle>
              <CardDescription>
                Your payment has been processed successfully.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md space-y-2">
                  <h3 className="font-medium">Campaign Details</h3>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Campaign:</span>
                    <span>{campaign?.name}</span>

                    <span className="text-muted-foreground">Platform:</span>
                    <span>
                      {campaign?.ad_platform === "meta"
                        ? "Meta (Facebook/Instagram)"
                        : "TikTok"}
                    </span>

                    <span className="text-muted-foreground">Budget:</span>
                    <span>${campaign?.budget}</span>

                    <span className="text-muted-foreground">
                      Management Fee:
                    </span>
                    <span>${campaign?.management_fee}</span>

                    <span className="text-muted-foreground">Total Amount:</span>
                    <span>${campaign?.total_amount}</span>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md border border-green-200 dark:border-green-800">
                  <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">
                    Next Steps
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Your campaign is ready for deployment. Click the button
                    below to automatically deploy it to{" "}
                    {campaign?.ad_platform === "meta"
                      ? "Meta Ads"
                      : "TikTok Ads"}
                    .
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              {deploymentStatus === "deployed" ? (
                <Button className="w-full" onClick={handleViewCampaigns}>
                  View Campaign Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleDeployCampaign}
                  disabled={
                    isDeploying || campaign?.deployment_status === "deployed"
                  }
                >
                  {isDeploying ? (
                    <>
                      <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                      Deploying Campaign...
                    </>
                  ) : deploymentStatus === "failed" ? (
                    "Retry Deployment"
                  ) : campaign?.deployment_status === "deployed" ? (
                    "Campaign Already Deployed"
                  ) : (
                    "Deploy Campaign Now"
                  )}
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={handleViewCampaigns}
              >
                View All Campaigns
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
