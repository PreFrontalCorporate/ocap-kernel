import { delay } from '@metamask/kernel-utils';

/**
 * Try to get a GC function for the current environment
 *
 * @returns A function that triggers GC and finalization when possible
 */
async function getGCFunction(): Promise<GCFunction | undefined> {
  if (typeof globalThis.gc === 'function') {
    return globalThis.gc;
  }

  // Check if we're in Node.js
  if (
    typeof globalThis === 'object' &&
    Object.prototype.toString.call(globalThis.process) === '[object process]'
  ) {
    try {
      // Dynamic import of Node.js specific module so it's not included in browser builds
      const { engineGC } = await import('./gc-engine.ts');
      return engineGC;
    } catch (error) {
      console.debug('Failed to load Node.js GC implementation:', error);
    }
  }

  return undefined;
}

/**
 * Utility to create a function that performs garbage collection and finalization
 * in a cross-environment compatible way.
 *
 * @returns A function that triggers GC and finalization when possible
 */
export function makeGCAndFinalize(): () => Promise<void> {
  // Cache the GC function promise
  const gcFunctionPromise = getGCFunction();

  /**
   * Function to trigger garbage collection and finalization
   */
  return async function gcAndFinalize(): Promise<void> {
    try {
      const gcFunction = await gcFunctionPromise;

      if (gcFunction) {
        // First GC pass
        gcFunction();
        // Allow finalization callbacks to run
        await delay(0);
        // Second GC pass to clean up objects that might have become
        // unreachable during finalization
        gcFunction();
        // Another tick to ensure finalization completes
        await delay(0);
      } else {
        // No GC function available, log warning and cycle the event loop
        console.warn('Deterministic GC not available in this environment');
        await delay(0);
      }
    } catch (error) {
      console.warn('GC operation failed:', error);
    }
  };
}
