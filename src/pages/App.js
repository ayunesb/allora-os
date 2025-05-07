import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { appRoutes } from "./routes"; // your full route array
function AppRoutes() {
    return (_jsx(Suspense, { fallback: _jsx("div", { className: "p-6", children: "Loading..." }), children: useRoutes(appRoutes) }));
}
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AppRoutes, {}) }));
}
