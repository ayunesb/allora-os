import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const PageTitle = ({ title, description, children }) => {
    return (_jsx("div", { className: "mb-6", children: _jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl sm:text-3xl font-bold tracking-tight", children: title }), description && (_jsx("p", { className: "text-muted-foreground mt-1", children: description }))] }), _jsx("div", { className: "mt-4 md:mt-0 flex items-center space-x-2", children: children })] }) }));
};
export default PageTitle;
