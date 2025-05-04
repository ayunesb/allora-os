/**
 * Smoothly scrolls an element to the bottom
 */
export function scrollToBottom(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
}
/**
 * Checks if an element is near the bottom
 */
export function isNearBottom(element, threshold = 50) {
    return element.scrollHeight - element.scrollTop - element.clientHeight < threshold;
}
/**
 * Force toggles production mode in the local environment
 * This is used for testing and development purposes only
 */
export function toggleProductionMode(force = true) {
    if (force) {
        localStorage.setItem('allora_force_production_mode', 'true');
        // Reload the page to apply changes
        window.location.reload();
    }
    else {
        localStorage.removeItem('allora_force_production_mode');
        // Reload the page to apply changes
        window.location.reload();
    }
}
