import { jsx as _jsx } from "react/jsx-runtime";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PageLoader } from "@/components/ui/page-loader";
const GalaxyExplorer = lazy(() => import("@/pages/explore/GalaxyExplorer"));
export const exploreRoutes = [
    {
        path: "explore",
        element: _jsx(GalaxyExplorer, {}),
    },
];
const ExploreRoutes = () => {
    return (_jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx(Routes, { children: _jsx(Route, { path: "galaxy", element: _jsx(GalaxyExplorer, {}) }) }) }));
};
export default ExploreRoutes;
