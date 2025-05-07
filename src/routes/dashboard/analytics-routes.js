var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const analyticsRoutes = [
    {
        path: "analytics",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Analytics } = yield import("@/pages/dashboard/Analytics");
                return { Component: Analytics };
            });
        },
    },
    {
        path: "insights",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: InsightsDashboard } = yield import("@/pages/dashboard/insights");
                return { Component: InsightsDashboard };
            });
        },
    },
    {
        path: "insights/kpis",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: KPIMetricsPage } = yield import("@/pages/insights/kpis");
                return { Component: KPIMetricsPage };
            });
        },
    },
    {
        path: "forecast",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Forecast } = yield import("@/pages/dashboard/Forecast");
                return { Component: Forecast };
            });
        },
    },
];
