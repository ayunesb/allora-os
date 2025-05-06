import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
import { PageTitle } from "@/components/ui/page-title";
import { GraduationCap, Upload } from "lucide-react";
import { toast } from "sonner";
export default function PublishAcademyContent() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const handlePublish = () => {
        setIsUploading(true);
        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                const newProgress = prev + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    toast.success("Content published successfully!");
                    return 100;
                }
                return newProgress;
            });
        }, 500);
    };
    return (_jsxs("div", { className: "container px-4 py-6", children: [_jsx(DashboardBreadcrumb, { rootPath: "/academy", rootLabel: "Academy", rootIcon: _jsx(GraduationCap, { className: "h-4 w-4" }), currentPath: "/academy/publish", currentLabel: "Publish Content" }), _jsxs("div", { className: "mb-6", children: [_jsx(PageTitle, { children: "Publish Academy Content" }), _jsx("p", { className: "text-muted-foreground", children: "Upload and publish new educational content to the academy" })] }), _jsxs(Card, { className: "mb-8", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Content Details" }), _jsx(CardDescription, { children: "Provide information about the content you're publishing" })] }), _jsx(CardContent, { children: _jsx("p", { children: "Content form fields placeholder" }) }), _jsxs(CardFooter, { className: "justify-end space-x-2 border-t pt-6", children: [_jsx(Button, { variant: "outline", children: "Cancel" }), _jsx(Button, { onClick: handlePublish, disabled: isUploading, children: isUploading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })] }), "Uploading ", uploadProgress, "%"] })) : (_jsxs(_Fragment, { children: [_jsx(Upload, { className: "mr-2 h-4 w-4" }), "Publish Content"] })) })] })] })] }));
}
