import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
export default function ExecutiveDetailPage() {
    const { name } = useParams();
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/dashboard/executives");
    };
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsxs("title", { children: [name, " | Executive Detail | Allora AI"] }) }), _jsxs("div", { className: "container mx-auto py-8", children: [_jsx("button", { onClick: goBack, className: "mb-4 text-blue-500 hover:underline", children: "\u2190 Back to Executives" }), _jsxs("h1", { className: "text-3xl font-bold mb-6", children: [name, " Executive Profile"] }), _jsx("p", { children: "This page is under development. Executive profiles will be available soon." })] })] }));
}
