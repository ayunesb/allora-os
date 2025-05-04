export declare const registerNavigate: (navigate: (to: string, options?: {
    replace?: boolean;
    state?: any;
}) => void) => void;
export declare const navigate: (to: string, options?: {
    replace?: boolean;
    state?: any;
}) => void;
export declare const normalizeRoute: (route: string) => string;
export declare const trackRouteVisit: (route: string) => void;
export declare const getRecentRoutes: () => string[];
