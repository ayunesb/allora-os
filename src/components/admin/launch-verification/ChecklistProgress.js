import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Progress } from "@/components/ui/progress";
export function ChecklistProgress({ completed, total, categories }) {
    // Calculate percentage
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    // Determine status color based on percentage
    const getStatusColor = () => {
        if (percentage >= 90)
            return "text-green-500";
        if (percentage >= 60)
            return "text-yellow-400";
        return "text-red-400";
    };
    // Determine progress bar color based on percentage
    const getProgressColor = () => {
        if (percentage >= 90)
            return "bg-green-500";
        if (percentage >= 60)
            return "bg-yellow-400";
        return "bg-red-400";
    };
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("div", { className: "text-sm text-gray-300", children: "Completion Status" }), _jsxs("div", { className: `font-medium ${getStatusColor()}`, children: [percentage, "%"] })] }), _jsx(Progress, { value: percentage, className: "h-2 bg-secondary/20", indicatorClassName: getProgressColor() }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsxs("span", { className: "text-gray-300", children: [_jsx("span", { className: "font-medium text-white", children: completed }), " of", " ", _jsx("span", { className: "font-medium text-white", children: total }), " checks completed"] }), _jsx("span", { className: percentage === 100 ? "text-green-500 font-medium" : "text-gray-300", children: percentage === 100 ? "All checks passed" : "Checks in progress" })] })] }));
}
