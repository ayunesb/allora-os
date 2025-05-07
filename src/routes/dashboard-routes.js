var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { executiveRoutes } from "./dashboard/executive-routes";
import { aiRoutes } from "./dashboard/ai-routes";
import { marketingRoutes } from "./dashboard/marketing-routes";
import { strategyRoutes } from "./dashboard/strategy-routes";
import { integrationRoutes } from "./dashboard/integration-routes";
import { accountRoutes } from "./dashboard/account-routes";
import { analyticsRoutes } from "./dashboard/analytics-routes";
export const dashboardRoutes = [
    {
        path: "/dashboard",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: DashboardLayout } = yield import("@/components/DashboardLayout");
                return { Component: DashboardLayout };
            });
        },
        children: [
            {
                index: true,
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: Dashboard } = yield import("@/pages/dashboard/Dashboard");
                        return { Component: Dashboard };
                    });
                },
            },
            // Include all modular route sections
            ...marketingRoutes,
            ...analyticsRoutes,
            ...strategyRoutes,
            ...integrationRoutes,
            ...executiveRoutes,
            ...aiRoutes,
            ...accountRoutes,
            // 404 route must be the last one
            {
                path: "*",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: NotFound } = yield import("@/pages/NotFound");
                        return { Component: NotFound };
                    });
                },
            },
        ],
    },
];
