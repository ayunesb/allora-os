var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const executiveRoutes = [
    {
        path: "executives",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Executives } = yield import("@/pages/dashboard/Executives");
                return { Component: Executives };
            });
        },
    },
    {
        path: "executive-agents",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: ExecutiveAgents } = yield import("@/pages/dashboard/ExecutiveAgents");
                return { Component: ExecutiveAgents };
            });
        },
    },
    {
        path: "decisions",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: ExecutiveDecisions } = yield import("@/pages/dashboard/ExecutiveDecisions");
                return { Component: ExecutiveDecisions };
            });
        },
    },
    {
        path: "risk-heatmap",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: RiskHeatmap } = yield import("@/pages/dashboard/RiskHeatmap");
                return { Component: RiskHeatmap };
            });
        },
    },
    {
        path: "leaderboard",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: ExecutiveLeaderboard } = yield import("@/pages/dashboard/ExecutiveLeaderboard");
                return { Component: ExecutiveLeaderboard };
            });
        },
    },
    {
        path: "executives/:name",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: ExecutiveProfile } = yield import("@/pages/dashboard/executives/[name]");
                return { Component: ExecutiveProfile };
            });
        },
    },
    {
        path: "executive-preferences",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: AISettings } = yield import("@/pages/dashboard/AISettings");
                return { Component: AISettings };
            });
        },
    },
];
