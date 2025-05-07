import { useState, useEffect } from "react";
/**
 * Custom hook for responsive design
 * @param query - CSS media query string
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);
        const handler = (event) => {
            setMatches(event.matches);
        };
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handler);
        }
        else {
            // For older browsers
            mediaQuery.addListener(handler);
        }
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", handler);
            }
            else {
                // For older browsers
                mediaQuery.removeListener(handler);
            }
        };
    }, [query]);
    return matches;
}
export default useMediaQuery;
