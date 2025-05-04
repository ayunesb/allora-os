export declare function useLaunchProcess(): {
    isLaunching: boolean;
    launchStep: number;
    isComplete: boolean;
    launchFirstCustomerFlow: () => Promise<boolean>;
};
