/**
 * Error Logging Service
 * 
 * This module provides utilities for logging and tracking errors in the application.
 * It can be configured to send errors to various monitoring services.
 */

import React from 'react';

interface ErrorLoggerConfig {
  environment: 'development' | 'production' | 'test';
  sendToServer: boolean;
  logToConsole: boolean;
  apiEndpoint?: string;
}

interface ErrorDetails {
  message: string;
  stack?: string;
  componentStack?: string;
  url?: string;
  timestamp: number;
  userAgent?: string;
  tags?: Record<string, string>;
}

// Default configuration
const defaultConfig: ErrorLoggerConfig = {
  environment: process.env.NODE_ENV as 'development' | 'production' | 'test',
  sendToServer: process.env.NODE_ENV === 'production',
  logToConsole: process.env.NODE_ENV !== 'production',
  apiEndpoint: '/api/error-logging',
};

// Current config, initialized with defaults
let currentConfig = { ...defaultConfig };

/**
 * Configure the error logger
 * 
 * @param newConfig Configuration options
 */
export function configureErrorLogger(newConfig: Partial<ErrorLoggerConfig>): void {
  currentConfig = {
    ...currentConfig,
    ...newConfig,
  };
}

/**
 * Format error details from an Error object
 * 
 * @param error The error to format
 * @param componentStack Optional React component stack trace
 * @param tags Optional tags to include with the error
 * @returns Formatted error details
 */
function formatErrorDetails(
  error: Error | string,
  componentStack?: string,
  tags?: Record<string, string>
): ErrorDetails {
  const errorObj = typeof error === 'string' ? new Error(error) : error;
  
  return {
    message: errorObj.message,
    stack: errorObj.stack,
    componentStack: componentStack || undefined,
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    timestamp: Date.now(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    tags: {
      ...tags,
      environment: currentConfig.environment,
    },
  };
}

/**
 * Log an error to the console and optionally send to server
 * 
 * @param error Error object or error message
 * @param componentStack Optional React component stack trace
 * @param tags Optional tags to include with the error
 */
export async function logError(
  error: Error | string,
  componentStack?: string,
  tags?: Record<string, string>
): Promise<void> {
  const errorDetails = formatErrorDetails(error, componentStack, tags);
  
  // Log to console if enabled
  if (currentConfig.logToConsole) {
    console.error('Error logged:', errorDetails);
  }
  
  // Send to server if enabled
  if (currentConfig.sendToServer && currentConfig.apiEndpoint) {
    try {
      await fetch(currentConfig.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorDetails),
      });
    } catch (sendError) {
      // Don't throw, just log to console
      if (currentConfig.logToConsole) {
        console.error('Failed to send error to server:', sendError);
      }
    }
  }
}

/**
 * Create an error boundary error handler
 * This is used with the ErrorBoundary component
 * 
 * @param componentName Name of the component where the error occurred
 * @param tags Optional tags to include with the error
 */
export function createErrorBoundaryHandler(
  componentName: string,
  tags?: Record<string, string>
): (error: Error, errorInfo: React.ErrorInfo) => void {
  return (error: Error, errorInfo: React.ErrorInfo) => {
    logError(
      error,
      errorInfo.componentStack || undefined,
      {
        ...tags,
        componentName,
        errorSource: 'ErrorBoundary',
      }
    );
  };
}

/**
 * Set up global error handlers for uncaught exceptions
 * This should be called at the app entry point
 */
export function setupGlobalErrorHandlers(): void {
  if (typeof window !== 'undefined') {
    // Handle uncaught exceptions
    window.addEventListener('error', (event) => {
      logError(event.error || new Error(event.message), undefined, {
        errorSource: 'UncaughtException',
        fileName: event.filename,
        lineNumber: String(event.lineno),
        columnNumber: String(event.colno),
      });
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));
      
      logError(error, undefined, {
        errorSource: 'UnhandledPromiseRejection',
      });
    });
  }
}

// Create a named logger object
const errorLogger = {
  log: logError,
  configure: configureErrorLogger,
  setupGlobalHandlers: setupGlobalErrorHandlers,
  createBoundaryHandler: createErrorBoundaryHandler,
};

// Export the named logger as default
export default errorLogger; 