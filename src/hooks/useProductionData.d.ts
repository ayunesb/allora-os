interface ProductionDataReturn {
    isProductionMode: boolean;
    isProductionReady: boolean;
    isProduction: boolean;
    isValidating?: boolean;
    forceProductionMode: (value: boolean) => void;
    validateProductionData: () => Promise<boolean>;
}
export declare function useProductionData(): ProductionDataReturn;
export {};
