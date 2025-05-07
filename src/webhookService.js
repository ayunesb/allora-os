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
import withSuspense from "@/utils/withSuspense"; // Assuming this utility exists
export const onboardingRoutes = [
    {
        path: "onboarding",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { default: OnboardingLayout } = yield import("@/layouts/OnboardingLayout");
                    return { element: withSuspense(_jsx(OnboardingLayout, {})) };
                }
                catch (error) {
                    console.error(error instanceof Error ? error.message : "Unknown error");
                    throw error;
                }
            });
        },
        children: [
            {
                index: true,
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const { default: OnboardingWelcome } = yield import("@/pages/onboarding/OnboardingWelcome");
                            return { element: withSuspense(_jsx(OnboardingWelcome, {})) };
                        }
                        catch (error) {
                            console.error(error instanceof Error ? error.message : "Unknown error");
                            throw error;
                        }
                    });
                },
            },
            {
                path: "profile",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const { default: OnboardingProfile } = yield import("@/pages/onboarding/OnboardingProfile");
                            return { element: withSuspense(_jsx(OnboardingProfile, {})) };
                        }
                        catch (error) {
                            console.error(error instanceof Error ? error.message : "Unknown error");
                            throw error;
                        }
                    });
                },
            },
            {
                path: "company",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const { default: OnboardingCompany } = yield import("@/pages/onboarding/OnboardingCompany");
                            return { element: withSuspense(_jsx(OnboardingCompany, {})) };
                        }
                        catch (error) {
                            console.error(error instanceof Error ? error.message : "Unknown error");
                            throw error;
                        }
                    });
                },
            },
            {
                path: "team",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const { default: OnboardingTeam } = yield import("@/pages/onboarding/OnboardingTeam");
                            return { element: withSuspense(_jsx(OnboardingTeam, {})) };
                        }
                        catch (error) {
                            console.error(error instanceof Error ? error.message : "Unknown error");
                            throw error;
                        }
                    });
                },
            },
            {
                path: "integrations",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const { default: OnboardingIntegrations } = yield import("@/pages/onboarding/OnboardingIntegrations");
                            return { element: withSuspense(_jsx(OnboardingIntegrations, {})) };
                        }
                        catch (error) {
                            console.error(error instanceof Error ? error.message : "Unknown error");
                            throw error;
                        }
                    });
                },
            },
            {
                path: "ai-workflow",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const { default: OnboardingAIWorkflow } = yield import("@/pages/onboarding/OnboardingAIWorkflow");
                            return { element: withSuspense(_jsx(OnboardingAIWorkflow, {})) };
                        }
                        catch (error) {
                            console.error(error instanceof Error ? error.message : "Unknown error");
                            throw error;
                        }
                    });
                },
            },
            {
                path: "complete",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            const { default: OnboardingComplete } = yield import("@/pages/onboarding/OnboardingComplete");
                            return { element: withSuspense(_jsx(OnboardingComplete, {})) };
                        }
                        catch (error) {
                            console.error(error instanceof Error ? error.message : "Unknown error");
                            throw error;
                        }
                    });
                },
            },
        ],
    },
];
export default onboardingRoutes;
