/**
 * Feature Flags for USRad Platform
 * Phase 0.5: New Engine Shadow-Mode Integration
 */

/**
 * When true, the New Procedure Engine is used as the primary search/resolution system.
 * When false, the Legacy Engine remains the sole driver of all UI and booking flows.
 * 
 * Phase 0.5 default: false (Legacy Engine is active)
 */
export const USE_NEW_PROCEDURE_ENGINE = true;

/**
 * When true, enables console logging for New Engine operations in shadow mode.
 * This includes comparison outputs between Legacy and New Engine results.
 * 
 * Only takes effect when USE_NEW_PROCEDURE_ENGINE is true.
 * Phase 0.5 default: false
 */
export const ENABLE_DEBUG_NEW_ENGINE = true;