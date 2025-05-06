import { useState, useEffect } from "react";
import { getAdPlatformConnections } from "@/services/adPlatformService";

export function useAdPlatformConnections() {
  const [hasAdPlatformConnections, setHasAdPlatformConnections] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConnections = async () => {
      try {
        const connections = await getAdPlatformConnections();
        setHasAdPlatformConnections(connections.length > 0);
      } catch (error) {
        console.error("Error checking ad platform connections:", error);
        setHasAdPlatformConnections(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkConnections();
  }, []);

  return { hasAdPlatformConnections, isLoading };
}
