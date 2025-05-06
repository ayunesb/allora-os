import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import CertificationCard from "./CertificationCard";
import { certifications } from "./mockData";
export default function CertificationsList() {
    return (_jsxs(Card, { className: "mt-8", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Certifications" }), _jsx(CardDescription, { children: "Current compliance certifications" })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: certifications.map((cert) => (_jsx(CertificationCard, { title: cert.title, validUntil: cert.validUntil, iconUrl: cert.iconUrl, alt: cert.alt }, cert.id))) }) })] }));
}
