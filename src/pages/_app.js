import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Toaster } from "sonner";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, {}), _jsx(Component, Object.assign({}, pageProps))] }));
}
export default MyApp;
