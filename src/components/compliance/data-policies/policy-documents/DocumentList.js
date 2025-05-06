var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import DocumentItem from "./DocumentItem";
import { useCompliance } from "@/context/ComplianceContext";
const DocumentList = () => {
    const { pendingUpdates, isApplyingUpdate, applyUpdate } = useCompliance();
    const [updatingDocId, setUpdatingDocId] = useState(null);
    const documents = [
        {
            id: "terms-of-service",
            name: "Terms of Service",
            version: "v2.0",
            path: "/legal/terms-of-service",
            lastUpdated: "April 10, 2025",
            updateAvailable: pendingUpdates.includes("terms-of-service"),
        },
        {
            id: "privacy-policy",
            name: "Privacy Policy",
            version: "v2.4",
            path: "/legal/privacy-policy",
            lastUpdated: "April 10, 2025",
            updateAvailable: pendingUpdates.includes("privacy-policy"),
        },
        {
            id: "cookies",
            name: "Cookie Policy",
            version: "v1.1",
            path: "/legal/cookies",
            lastUpdated: "April 10, 2025",
            updateAvailable: pendingUpdates.includes("cookies"),
        },
        {
            id: "refund-policy",
            name: "Cancellation & Refund Policy",
            version: "v1.0",
            path: "/legal/refund-policy",
            lastUpdated: "April 10, 2025",
            updateAvailable: pendingUpdates.includes("refund-policy"),
        },
        {
            id: "data-processing",
            name: "Data Processing Agreement",
            version: "v1.3",
            path: "/legal/data-processing",
            lastUpdated: "April 10, 2025",
            updateAvailable: pendingUpdates.includes("data-processing"),
        },
        {
            id: "messaging-consent",
            name: "Messaging Consent",
            version: "v1.0",
            path: "/legal/messaging-consent",
            lastUpdated: "April 10, 2025",
            updateAvailable: pendingUpdates.includes("messaging-consent"),
        },
    ];
    const handleUpdateDocument = (docId) => __awaiter(void 0, void 0, void 0, function* () {
        setUpdatingDocId(docId);
        yield applyUpdate(docId);
        setUpdatingDocId(null);
    });
    return (_jsx("ul", { className: "space-y-3", children: documents.map((doc) => (_jsx(DocumentItem, { document: doc, updatingDocId: updatingDocId }, doc.id))) }));
};
export default DocumentList;
