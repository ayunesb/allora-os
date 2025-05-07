import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
import { PageTitle } from "@/components/ui/page-title";
import { GraduationCap } from "lucide-react";
export default function AcademyIndex() {
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        // Simulate loading content
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);
    const navigateToCourse = () => {
        // Navigation logic here
    };
    return (_jsxs("div", { className: "container px-4 py-6", children: [_jsx(DashboardBreadcrumb, { rootPath: "/academy", rootLabel: "Academy", rootIcon: _jsx(GraduationCap, { className: "h-4 w-4" }) }), _jsx(PageTitle, { children: "Academy Content" }), _jsxs("div", { className: "grid gap-6", children: [isReady ? (_jsx("p", { children: "Academy content loaded successfully!" })) : (_jsx("p", { children: "Loading academy content..." })), _jsx("a", { href: "/academy/course", onClick: (e) => {
                            e.preventDefault();
                            navigateToCourse();
                        }, children: "Go to Course" })] })] }));
}
