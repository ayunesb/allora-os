var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { runTestCompanySetup } from "@/utils/company/test";
import { checkSupabaseConnection } from "@/integrations/supabase/client";
import { Lock, Database, Code } from "lucide-react";
import ApiTestingTool from "./ApiTestingTool";
import { Badge } from "@/components/ui/badge";
export default function DevelopmentToolsTab() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const handleSetupTestCompany = () => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.email)) {
            toast.error("User email not available");
            return;
        }
        setIsLoading(true);
        try {
            const result = yield runTestCompanySetup(user.email);
            if (result.success) {
                toast.success(result.message);
            }
            else {
                toast.error(result.message);
            }
        }
        catch (error) {
            console.error("Error in test company setup:", error);
            toast.error("Failed to set up test company");
        }
        finally {
            setIsLoading(false);
        }
    });
    const handleDatabaseTest = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const result = yield checkSupabaseConnection();
            if (result.connected) {
                toast.success(result.message || "Database connection successful");
            }
            else {
                toast.error(result.message || "Database connection failed");
            }
            console.log("Database connection test result:", result);
        }
        catch (error) {
            console.error("Database test error:", error);
            toast.error(`Database test failed: ${error.message}`);
        }
        finally {
            setIsLoading(false);
        }
    });
    return (_jsx("div", { className: "grid gap-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: ["Development Tools", _jsx(Badge, { variant: "outline", className: "bg-yellow-100 text-yellow-800 border-yellow-300 ml-2", children: "Admin Only" }), _jsx(Lock, { className: "h-4 w-4 text-yellow-600" })] }), _jsx(CardDescription, { children: "Tools for testing and debugging" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Test Data" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Set up test company data for the current user." }), _jsxs(Button, { onClick: handleSetupTestCompany, disabled: isLoading, variant: "outline", children: [isLoading ? "Setting up..." : "Set Up Test Company", !isLoading && _jsx(Code, { className: "ml-2 h-4 w-4" })] })] }), _jsx(Separator, {}), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Database Connection Test" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Verify your connection to the database." }), _jsxs(Button, { variant: "outline", onClick: handleDatabaseTest, disabled: isLoading, children: [isLoading ? "Testing..." : "Test Database Connection", !isLoading && _jsx(Database, { className: "ml-2 h-4 w-4" })] })] }), _jsx(Separator, {}), _jsx(ApiTestingTool, {})] })] }) }));
}
