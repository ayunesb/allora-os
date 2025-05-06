/**
 * Check if the current tenant is the demo tenant
 * @param tenantId The tenant ID to check
 */
export declare function isDemoTenant(
  tenantId?: string | null,
): Promise<boolean>;
/**
 * Reset the demo tenant to its initial state
 * @param tenantId The tenant ID to reset
 */
export declare function resetDemoTenant(
  tenantId?: string | null,
): Promise<boolean>;
