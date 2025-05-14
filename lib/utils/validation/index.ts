/**
 * General validation utilities
 */

import { nanoid } from 'nanoid';

/**
 * Validate user input for chatbot
 * Throws an error if input is invalid or potentially harmful
 */
export function validateUserInput(input: string): void {
  // Check for empty input
  if (!input || input.trim() === '') {
    throw new Error('Input cannot be empty');
  }
  
  // Check for excessive length (prevent abuse)
  if (input.length > 1000) {
    throw new Error('Input exceeds maximum allowed length');
  }
  
  // Check for dangerous patterns (SQL injection, etc.)
  const dangerousPatterns = [
    /\/etc\/passwd/i,
    /\/bin\/bash/i,
    /SELECT.*FROM/i,
    /DROP TABLE/i,
    /INSERT INTO/i,
    /DELETE FROM/i,
    /<script>/i
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(input)) {
      throw new Error('Potentially harmful input detected');
    }
  }
}

/**
 * Generate a unique request ID for tracking
 */
export function generateRequestId(): string {
  return nanoid(12);
}

// Re-export form validation utilities
export * from './form'; 