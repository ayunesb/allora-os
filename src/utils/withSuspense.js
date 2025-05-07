import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from "react";
export default function withSuspense(element) {
    return (_jsx(Suspense, { fallback: _jsx("div", { className: "p-4", children: "Loading..." }), children: element }));
}
