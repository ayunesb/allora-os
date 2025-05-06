/**
 * Apply accessibility classes to the document based on user preferences
 */
export function applyAccessibilityClasses(preferences = {}) {
    if (!preferences)
        return;
    // Get the document root element
    const html = document.documentElement;
    // Apply or remove classes based on preferences
    html.classList.toggle("high-contrast", !!preferences.highContrast);
    html.classList.toggle("large-text", !!preferences.largeText);
    html.classList.toggle("reduced-motion", !!preferences.reducedMotion);
    html.classList.toggle("enhanced-focus", !!preferences.enhancedFocus);
    html.classList.toggle("screen-reader-friendly", !!preferences.screenReaderFriendly);
    html.classList.toggle("improved-spacing", !!preferences.improvedTextSpacing);
    // Update motion preference at the CSS level
    if (preferences.reducedMotion) {
        html.style.setProperty("--reduced-motion", "reduce");
    }
    else {
        html.style.removeProperty("--reduced-motion");
    }
    // Update focus styles
    if (preferences.enhancedFocus) {
        html.style.setProperty("--focus-ring-width", "3px");
        html.style.setProperty("--focus-ring-color", "rgba(59, 130, 246, 0.6)");
    }
    else {
        html.style.removeProperty("--focus-ring-width");
        html.style.removeProperty("--focus-ring-color");
    }
    // Update text spacing
    if (preferences.improvedTextSpacing) {
        html.style.setProperty("--line-height-multiplier", "1.5");
        html.style.setProperty("--letter-spacing-multiplier", "0.05em");
    }
    else {
        html.style.removeProperty("--line-height-multiplier");
        html.style.removeProperty("--letter-spacing-multiplier");
    }
}
/**
 * Announce a message to screen readers
 */
export function announceToScreenReader(message, assertive = false) {
    const element = document.getElementById(assertive ? "aria-live-assertive" : "aria-live-polite");
    if (element) {
        element.textContent = "";
        // Use setTimeout to ensure the DOM change is noticed by screen readers
        setTimeout(() => {
            element.textContent = message;
        }, 50);
    }
}
/**
 * Create a keyboard accessible function that activates on Enter and Space
 */
export function makeKeyboardAccessible(callback) {
    return (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            callback();
        }
    };
}
/**
 * Focus an element with proper management for screen readers
 */
export function focusElement(elementId, preventScroll = false) {
    const element = document.getElementById(elementId);
    if (element) {
        // Add tabindex if the element isn't natively focusable
        const needsTabIndex = ![
            "a",
            "button",
            "input",
            "select",
            "textarea",
        ].includes(element.tagName.toLowerCase());
        if (needsTabIndex && element.getAttribute("tabindex") === null) {
            element.setAttribute("tabindex", "-1");
        }
        element.focus({ preventScroll });
        // Clean up temporary tabindex
        if (needsTabIndex && element.getAttribute("tabindex") === "-1") {
            setTimeout(() => {
                element.removeAttribute("tabindex");
            }, 100);
        }
    }
}
