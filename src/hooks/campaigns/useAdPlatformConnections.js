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
import { getAdPlatformConnections } from "@/services/adPlatformService";
export function useAdPlatformConnections() {
    const [hasAdPlatformConnections, setHasAdPlatformConnections] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkConnections = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const connections = yield getAdPlatformConnections();
                setHasAdPlatformConnections(connections.length > 0);
            }
            catch (error) {
                console.error("Error checking ad platform connections:", error);
                setHasAdPlatformConnections(false);
            }
            finally {
                setIsLoading(false);
            }
        });
        checkConnections();
    }, []);
    return { hasAdPlatformConnections, isLoading };
}
