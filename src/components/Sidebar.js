import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Sidebar = () => {
    return (_jsx("nav", { children: _jsx("ul", { children: _jsx("li", { children: _jsx(Link, { to: "/dashboard", children: "Dashboard" }) }) }) }));
};
export default Sidebar;
