var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const accountRoutes = [
    {
        path: "settings",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Settings } = yield import("@/pages/dashboard/Settings");
                return { Component: Settings };
            });
        },
    },
    {
        path: "profile",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Profile } = yield import("@/pages/dashboard/Profile");
                return { Component: Profile };
            });
        },
    },
    {
        path: "company-setup",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: CompanySetup } = yield import("@/pages/DevAdminHelper");
                return { Component: CompanySetup };
            });
        },
    },
    {
        path: "billing",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Billing } = yield import("@/pages/Billing");
                return { Component: Billing };
            });
        },
    },
];
