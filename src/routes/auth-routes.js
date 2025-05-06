var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const authRoutes = [
    {
        path: "login",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Login } = yield import("@/pages/Login");
                return { Component: Login };
            });
        },
    },
    {
        path: "auth/login",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Login } = yield import("@/pages/Login");
                return { Component: Login };
            });
        },
    },
    {
        path: "signup",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: SignUpNew } = yield import("@/pages/SignUpNew");
                return { Component: SignUpNew };
            });
        },
    },
    {
        path: "reset-password",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: ResetPassword } = yield import("@/pages/ResetPassword");
                return { Component: ResetPassword };
            });
        },
    },
    {
        path: "email-confirm",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: EmailConfirm } = yield import("@/pages/EmailConfirm");
                return { Component: EmailConfirm };
            });
        },
    },
    {
        path: "verify-otp",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: VerifyOtp } = yield import("@/pages/VerifyOtp");
                return { Component: VerifyOtp };
            });
        },
    },
    {
        path: "update-password",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: UpdatePassword } = yield import("@/pages/UpdatePassword");
                return { Component: UpdatePassword };
            });
        },
    },
    {
        path: "auth/tiktok/callback",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: TiktokCallback } = yield import("@/components/auth/TiktokCallback");
                return { Component: TiktokCallback };
            });
        },
    },
];
