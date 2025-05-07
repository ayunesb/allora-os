import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Modal = ({ isOpen, onClose, className, children, }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: `modal ${className}`, children: _jsxs("div", { className: "modal-content", children: [children, _jsx("button", { onClick: onClose, children: "Close" })] }) }));
};
export default Modal;
