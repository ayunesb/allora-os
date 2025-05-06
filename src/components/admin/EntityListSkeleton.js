import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "@/components/ui/skeleton";
export function Table({ children, className }) {
    return _jsx("table", { className: className, children: children });
}
export function TableHeader({ children, className }) {
    return _jsx("thead", { className: className, children: children });
}
export function TableBody({ children, className }) {
    return _jsx("tbody", { className: className, children: children });
}
export function TableRow({ children, className }) {
    return _jsx("tr", { className: className, children: children });
}
export function TableHead({ children, className }) {
    return _jsx("th", { className: className, children: children });
}
export function TableCell({ children, className }) {
    return _jsx("td", { className: className, children: children });
}
export function EntityListSkeleton() {
    return (_jsxs("div", { className: "space-y-4 animate-pulse", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx(Skeleton, { className: "h-10 w-52" }), _jsx(Skeleton, { className: "h-9 w-32" })] }), _jsx("div", { className: "rounded-md border border-white/10 overflow-hidden bg-[#111827]", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-[#1A1F2C]", children: _jsxs(TableRow, { className: "border-white/10", children: [_jsx(TableHead, { className: "h-10 w-[25%]", children: _jsx(Skeleton, { className: "h-4 w-24" }) }), _jsx(TableHead, { className: "h-10 w-[25%]", children: _jsx(Skeleton, { className: "h-4 w-32" }) }), _jsx(TableHead, { className: "h-10 w-[20%]", children: _jsx(Skeleton, { className: "h-4 w-16" }) }), _jsx(TableHead, { className: "h-10 w-[15%]", children: _jsx(Skeleton, { className: "h-4 w-24" }) }), _jsx(TableHead, { className: "h-10 w-[15%]", children: _jsx(Skeleton, { className: "h-4 w-16" }) })] }) }), _jsx(TableBody, { children: Array.from({ length: 5 }).map((_, i) => (_jsxs(TableRow, { className: "border-white/10", children: [_jsx(TableCell, { children: _jsx(Skeleton, { className: "h-5 w-32" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-5 w-40" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-6 w-20 rounded-full" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-5 w-24" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-8 w-full" }) })] }, i))) })] }) })] }));
}
