import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAdPlatformConnections } from "@/services/adPlatformService";
import ConnectPlatformsCard from "@/components/adplatforms/ConnectPlatformsCard";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
export default function AdAccountsConnect() {
  const [metaConnected, setMetaConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { profile } = useAuth();
  // Check if user has connected ad accounts
  useEffect(() => {
    const checkConnections = async () => {
      setIsLoading(true);
      try {
        const connections = await getAdPlatformConnections();
        setMetaConnected(
          connections.some(
            (conn) => conn.platform === "meta" && conn.is_active,
          ),
        );
        setTiktokConnected(
          connections.some(
            (conn) => conn.platform === "tiktok" && conn.is_active,
          ),
        );
      } catch (error) {
        console.error("Error checking ad platform connections:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (profile?.company_id) {
      checkConnections();
    }
  }, [profile]);
  useEffect(() => {
    // Check URL parameters for auth callback
    const searchParams = new URLSearchParams(window.location.search);
    const platform = searchParams.get("platform");
    const success = searchParams.get("success");
    if (platform && success) {
      if (success === "true") {
        toast.success(
          `${platform === "meta" ? "Meta" : "TikTok"} account connected successfully!`,
        );
        // Refresh connections after successful connection
        getAdPlatformConnections().then((connections) => {
          setMetaConnected(
            connections.some(
              (conn) => conn.platform === "meta" && conn.is_active,
            ),
          );
          setTiktokConnected(
            connections.some(
              (conn) => conn.platform === "tiktok" && conn.is_active,
            ),
          );
        });
      } else {
        toast.error(
          `Failed to connect ${platform === "meta" ? "Meta" : "TikTok"} account. Please try again.`,
        );
      }
      // Remove query params from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  const handleProceed = () => {
    navigate("/dashboard/campaigns/create");
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Connect Your Ad Accounts</h1>
          <p className="text-muted-foreground">
            To create and manage campaigns, connect your Meta or TikTok ad
            accounts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-2xl"
        >
          <ConnectPlatformsCard
            metaConnected={metaConnected}
            tiktokConnected={tiktokConnected}
            isLoading={isLoading}
            onProceed={handleProceed}
          />
        </motion.div>
      </div>
    </div>
  );
}
