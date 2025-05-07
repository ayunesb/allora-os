var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const onboardingRoutes = [
    {
        path: "onboarding",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const OnboardingLayout = (yield import("@/layouts/OnboardingLayout"))
                    .default;
                return {
                    Component: OnboardingLayout,
                };
            });
        },
        children: [
            {
                index: true,
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: OnboardingWelcome } = yield import("@/pages/onboarding/OnboardingWelcome");
                        return { Component: OnboardingWelcome };
                    });
                },
            },
            {
                path: "profile",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: OnboardingProfile } = yield import("@/pages/onboarding/OnboardingProfile");
                        return { Component: OnboardingProfile };
                    });
                },
            },
            {
                path: "company",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: OnboardingCompany } = yield import("@/pages/onboarding/OnboardingCompany");
                        return { Component: OnboardingCompany };
                    });
                },
            },
            {
                path: "team",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: OnboardingTeam } = yield import("@/pages/onboarding/OnboardingTeam");
                        return { Component: OnboardingTeam };
                    });
                },
            },
            {
                path: "integrations",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: OnboardingIntegrations } = yield import("@/pages/onboarding/OnboardingIntegrations");
                        return { Component: OnboardingIntegrations };
                    });
                },
            },
            {
                path: "ai-workflow",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: OnboardingAIWorkflow } = yield import("@/pages/onboarding/OnboardingAIWorkflow");
                        return { Component: OnboardingAIWorkflow };
                    });
                },
            },
            {
                path: "complete",
                lazy() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { default: OnboardingComplete } = yield import("@/pages/onboarding/OnboardingComplete");
                        return { Component: OnboardingComplete };
                    });
                },
            },
        ],
    },
];
export default onboardingRoutes;
