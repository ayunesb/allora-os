import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardFooter, } from "@/components/ui/card";
const BotDetailSkeleton = () => {
    return (_jsxs(Card, { className: "flex flex-col h-[calc(100vh-350px)] min-h-[400px]", children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(Skeleton, { className: "h-6 w-32" }) }), _jsx(CardContent, { className: "overflow-y-auto flex-grow pb-0 space-y-4", children: _jsx("div", { className: "flex flex-col space-y-4", children: Array(3)
                        .fill(0)
                        .map((_, i) => (_jsx("div", { className: `flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`, children: _jsxs("div", { className: `max-w-[80%] ${i % 2 === 0 ? "mr-auto" : "ml-auto"}`, children: [_jsx(Skeleton, { className: "h-8 w-8 rounded-full mb-2" }), _jsx(Skeleton, { className: "h-24 w-full rounded-lg" })] }) }, i))) }) }), _jsx(CardFooter, { className: "pt-4 pb-4 border-t", children: _jsxs("div", { className: "flex items-center gap-2 w-full", children: [_jsx(Skeleton, { className: "h-[60px] flex-grow" }), _jsx(Skeleton, { className: "h-[60px] w-[60px] flex-shrink-0" })] }) })] }));
};
export default BotDetailSkeleton;
