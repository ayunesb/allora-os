
/**
 * Smoothly scrolls an element to the bottom
 */
export function scrollToBottom(element: HTMLElement) {
  element.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

/**
 * Checks if an element is near the bottom
 */
export function isNearBottom(element: HTMLElement, threshold = 50) {
  return element.scrollHeight - element.scrollTop - element.clientHeight < threshold;
}
