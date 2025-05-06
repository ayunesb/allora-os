var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getSystemServices } from "../services/systemService";
const SystemHealth = () => {
    const items = getSystemServices(); // ✅ Typed items
    return (_jsx("div", { children: items.map((item) => (_jsxs(InfoCard, { children: [_jsx("h2", { children: item.name }), _jsxs("p", { children: ["Status: ", item.status] })] }, item.name))) }));
};
export const Panel = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (_jsx("div", Object.assign({}, props, { children: children })));
};
const InfoCard = ({ children, className }) => _jsx("div", { className: className, children: children });
export default SystemHealth;
