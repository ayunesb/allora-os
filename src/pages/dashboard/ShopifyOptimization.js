var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Store, RefreshCw, Link } from "lucide-react";
import { toast } from "sonner";
import ShopifyOptimizationDashboard from "@/components/shopify/ShopifyOptimizationDashboard";
import { listShopifyProducts } from "@/utils/shopifyHelpers";
export default function ShopifyOptimization() {
    const navigate = useNavigate();
    const [storeId, setStoreId] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [storeUrl, setStoreUrl] = useState("");
    // For demo purposes, attempt to fetch products to see if already connected
    useEffect(() => {
        const checkConnection = () => __awaiter(this, void 0, void 0, function* () {
            const products = yield listShopifyProducts();
            if (products && products.length > 0) {
                setIsConnected(true);
                // For demo purposes, just use the first product's vendor as the store ID
                setStoreId(products[0].vendor || "demo-store");
            }
        });
        checkConnection();
    }, []);
    const handleConnect = () => __awaiter(this, void 0, void 0, function* () {
        if (!storeUrl) {
            toast.error("Please enter your Shopify store URL");
            return;
        }
        setIsConnecting(true);
        // In a real app, this would actually connect to the store via OAuth
        // For this demo, we'll simulate a successful connection
        try {
            // Simulate API call delay
            yield new Promise((resolve) => setTimeout(resolve, 1500));
            setIsConnected(true);
            setStoreId("demo-store");
            toast.success("Shopify store connected successfully");
        }
        catch (error) {
            toast.error("Failed to connect to Shopify store");
        }
        finally {
            setIsConnecting(false);
        }
    });
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("div", { className: "flex items-center mb-8", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate("/dashboard"), className: "mr-4", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }), "Back"] }), _jsx("h1", { className: "text-2xl font-bold", children: "Shopify Store Optimization" })] }), !isConnected ? (_jsxs(Card, { className: "max-w-2xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Store, { className: "h-5 w-5 mr-2" }), "Connect Your Shopify Store"] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "mb-6 text-gray-500", children: "Connect your Shopify store to get personalized optimization recommendations, automated improvements, and detailed analytics to help increase your sales." }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "store-url", children: "Shopify Store URL" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Input, { id: "store-url", placeholder: "yourstore.myshopify.com", value: storeUrl, onChange: (e) => setStoreUrl(e.target.value) }), _jsx(Button, { onClick: handleConnect, disabled: isConnecting, children: isConnecting ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2 animate-spin" }), "Connecting..."] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { className: "h-4 w-4 mr-2" }), "Connect"] })) })] })] }), _jsx("p", { className: "text-xs text-gray-400", children: "By connecting your store, you'll grant us read and write access to optimize your store. You can revoke access at any time from your Shopify admin panel." })] })] })] })) : (_jsx(ShopifyOptimizationDashboard, { storeId: storeId }))] }));
}
_jsx(Button, { variant: "outline", children: "Click Me" });
_jsx(Label, { htmlFor: "input-id", children: "Label Text" });
