var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { lazy } from "react";
import AdminGuard from "@/guards/AdminGuard";
import Loading from "@/components/ui/loading";
const LazyAdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
export const adminRoutes = [
    {
        path: "admin",
        element: React.createElement(AdminGuard, null, React.createElement(React.Suspense, { fallback: React.createElement(Loading) }, React.createElement(LazyAdminDashboard))),
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: AdminLayout } = yield import("@/components/layouts/AdminLayout");
                return { Component: AdminLayout };
            });
        },
        children: [
            {
                index: true,
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: AdminDashboard } = yield import("@/pages/admin/AdminDashboard");
                        return { Component: AdminDashboard };
                    });
                },
            },
            {
                path: "entities",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: AdminEntities } = yield import("@/pages/admin/AdminEntities");
                        return { Component: AdminEntities };
                    });
                },
            },
            {
                path: "users",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: AdminUsers } = yield import("@/pages/admin/AdminUsers");
                        return { Component: AdminUsers };
                    });
                },
            },
            {
                path: "companies",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: AdminCompanies } = yield import("@/pages/admin/AdminCompanies");
                        return { Component: AdminCompanies };
                    });
                },
            },
            {
                path: "settings",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: AdminSettings } = yield import("@/pages/admin/AdminSettings");
                        return { Component: AdminSettings };
                    });
                },
            },
            {
                path: "webhooks",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: AdminWebhooks } = yield import("@/pages/admin/AdminWebhooks");
                        return { Component: AdminWebhooks };
                    });
                },
            },
            {
                path: "system-health",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: AdminSystemHealth } = yield import("@/pages/admin/SystemHealth");
                        return { Component: AdminSystemHealth };
                    });
                },
            },
            {
                path: "diagnostics",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: SystemPage } = yield import("@/pages/admin/system");
                        return { Component: SystemPage };
                    });
                },
            },
            {
                path: "launch-prep",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: AdminLaunchPrep } = yield import("@/pages/admin/AdminLaunchPrep");
                        return { Component: AdminLaunchPrep };
                    });
                },
            },
            {
                path: "campaigns",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: AdminCampaigns } = yield import("@/pages/admin/AdminCampaigns");
                        return { Component: AdminCampaigns };
                    });
                },
            },
            {
                path: "analytics",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: AdminAnalytics } = yield import("@/pages/admin/AdminAnalytics");
                        return { Component: AdminAnalytics };
                    });
                },
            },
            {
                path: "leads",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: AdminLeads } = yield import("@/pages/admin/AdminLeads");
                        return { Component: AdminLeads };
                    });
                },
            },
            {
                path: "notion-integration",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: NotionIntegration } = yield import("@/pages/admin/NotionIntegration");
                        return { Component: NotionIntegration };
                    });
                },
            },
            {
                path: "stripe-integration",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: StripeIntegration } = yield import("@/pages/admin/StripeIntegration");
                        return { Component: StripeIntegration };
                    });
                },
            },
            {
                path: "clearbit-integration",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: ClearbitIntegration } = yield import("@/pages/admin/ClearbitIntegration");
                        return { Component: ClearbitIntegration };
                    });
                },
            },
            {
                path: "calendly-integration",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: CalendlyIntegration } = yield import("@/pages/admin/CalendlyIntegration");
                        return { Component: CalendlyIntegration };
                    });
                },
            },
        ],
    },
];
export default adminRoutes;
