import { jsx as _jsx } from "react/jsx-runtime";
import { HelmetProvider as ReactHelmetProvider } from "react-helmet-async";
/**
 * A wrapper component to provide Helmet context to the application
 */
export default function HelmetProvider({ children }) {
    return _jsx(ReactHelmetProvider, { children: children });
}
