/**
 * General validation utilities
 */

import { nanoid } from 'nanoid';

/**
 * Generate a unique request ID for tracking
 */
export function generateRequestId(): string {
  return nanoid(12);
}

// Re-export form validation utilities
export * from './form'; 