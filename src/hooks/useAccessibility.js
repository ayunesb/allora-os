import { useState, useCallback } from 'react';
export function useAccessibility() {
    const [fontSize, setFontSize] = useState(16);
    const [highContrast, setHighContrast] = useState(false);
    const [largeText, setLargeText] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [screenReaderFriendly, setScreenReaderFriendly] = useState(false);
    const [invertColors, setInvertColors] = useState(false);
    // Toggle functions
    const toggleHighContrast = useCallback(() => {
        setHighContrast(prev => !prev);
    }, []);
    const toggleLargeText = useCallback(() => {
        setLargeText(prev => !prev);
        setFontSize(prev => prev === 16 ? 20 : 16);
    }, []);
    const toggleReducedMotion = useCallback(() => {
        setReducedMotion(prev => !prev);
    }, []);
    const toggleScreenReaderFriendly = useCallback(() => {
        setScreenReaderFriendly(prev => !prev);
    }, []);
    const toggleInvertColors = useCallback(() => {
        setInvertColors(prev => !prev);
    }, []);
    return {
        fontSize,
        setFontSize,
        highContrast,
        reducedMotion,
        screenReaderFriendly,
        largeText,
        invertColors,
        toggleHighContrast,
        toggleLargeText,
        toggleReducedMotion,
        toggleScreenReaderFriendly,
        toggleInvertColors
    };
}
