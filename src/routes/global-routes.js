var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const globalRoutes = [
    {
        path: "/404",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: NotFound } = yield import("@/pages/NotFound");
                return { Component: NotFound };
            });
        },
    },
    {
        path: "/legal",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Legal } = yield import("@/pages/Legal");
                return { Component: Legal };
            });
        },
    },
    {
        path: "/faq",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: FAQ } = yield import("@/pages/FAQ");
                return { Component: FAQ };
            });
        },
    },
    {
        path: "/privacy",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Privacy } = yield import("@/pages/Privacy");
                return { Component: Privacy };
            });
        },
    },
    {
        path: "/terms",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: TermsOfService } = yield import("@/pages/TermsOfService");
                return { Component: TermsOfService };
            });
        },
    },
    {
        path: "/contact",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Contact } = yield import("@/pages/Contact");
                return { Component: Contact };
            });
        },
    },
    {
        path: "/security",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Security } = yield import("@/pages/Security");
                return { Component: Security };
            });
        },
    },
];
