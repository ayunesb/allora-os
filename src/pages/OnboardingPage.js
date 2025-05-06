import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
const OnboardingPage = () => {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Welcome to the Onboarding Process" }), _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(Outlet, {}) })] }));
};
export default OnboardingPage;
