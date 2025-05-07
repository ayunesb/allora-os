import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
/**
 * Accessibility announcer component for screen readers
 * Announces route changes and other important information
 * This component must be used within a Router context
 */
export function AccessibilityAnnouncer() {
    const [announcement, setAnnouncement] = useState("");
    // Since this component needs to be within a Router context,
    // we'll safely access the location
    let location;
    try {
        location = useLocation();
    }
    catch (error) {
        // Fallback if used outside Router context
        console.warn("AccessibilityAnnouncer used outside Router context");
        return null; // Return nothing if outside Router context
    }
    // Announce route changes
    useEffect(() => {
        if (!location)
            return;
        // Get the page title from document or h1 elements
        const getPageTitle = () => {
            // Try to get the document title
            if (document.title) {
                return document.title;
            }
            // Try to get the first h1 element
            const h1Element = document.querySelector("h1");
            if (h1Element && h1Element.textContent) {
                return h1Element.textContent;
            }
            // Default to pathname
            return location.pathname.replace(/\//g, " ").trim() || "Home";
        };
        // Build the announcement
        const pageTitle = getPageTitle();
        const newAnnouncement = `Navigated to ${pageTitle}`;
        // Set the announcement
        setAnnouncement(newAnnouncement);
        // Clear the announcement after 3 seconds
        const timer = setTimeout(() => {
            setAnnouncement("");
        }, 3000);
        return () => clearTimeout(timer);
    }, [location]);
    return (_jsx("div", { className: "sr-only", role: "status", "aria-live": "polite", "aria-atomic": "true", children: announcement }));
}
export default AccessibilityAnnouncer;
