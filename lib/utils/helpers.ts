/**
 * Utility functions for the application
 */

/**
 * Creates a throttled function that only invokes the provided function at most once per 
 * specified wait period.
 * 
 * @param func The function to throttle
 * @param wait The number of milliseconds to throttle invocations to
 * @returns The throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastCallTime = 0;
  
  return function(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;
    
    // Store the latest arguments to use for the trailing call
    lastArgs = args;
    
    // If this is the first call or enough time has passed since the last call
    if (timeSinceLastCall >= wait || lastCallTime === 0) {
      lastCallTime = now;
      return func.apply(this, args);
    }
    
    // If we're waiting and no timeout is scheduled yet, schedule one
    if (!timeout) {
      timeout = setTimeout(() => {
        const timeNow = Date.now();
        // Ensure at least 'wait' time has passed since the last call
        if (timeNow - lastCallTime >= wait && lastArgs) {
          lastCallTime = timeNow;
          const result = func.apply(this, lastArgs);
          lastArgs = null;
          timeout = null;
          return result;
        }
      }, wait - timeSinceLastCall);
    }
    
    return undefined;
  };
}

/**
 * Creates a debounced function that delays invoking the provided function until after 
 * the specified wait time has elapsed since the last time the debounced function was invoked.
 * 
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns The debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}

/**
 * Truncates a string to a specified length and adds an ellipsis if needed
 * 
 * @param str The string to truncate
 * @param maxLength The maximum length before truncation
 * @returns The truncated string with ellipsis if needed
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
} 