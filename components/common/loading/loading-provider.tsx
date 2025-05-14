"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { PremiumLoading } from './premium-loading'

// Define the shape of the loading context
interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

// Create the context with a default value
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  loadingMessage: '',
  startLoading: () => {},
  stopLoading: () => {},
})

// Custom hook for accessing the loading context
const useLoading = () => useContext(LoadingContext)

interface LoadingProviderProps {
  children: ReactNode;
  defaultMessage?: string;
}

/**
 * Provider component for managing global loading state
 * This allows any component in the app to trigger a loading state
 */
export function LoadingProvider({
  children,
  defaultMessage = 'Loading...',
}: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(defaultMessage)

  // Start loading with an optional custom message
  const startLoading = useCallback((message?: string) => {
    setIsLoading(true)
    if (message) {
      setLoadingMessage(message)
    }
  }, [])

  // Stop loading and reset message to default
  const stopLoading = useCallback(() => {
    setIsLoading(false)
    setLoadingMessage(defaultMessage)
  }, [defaultMessage])

  // Create the context value object
  const contextValue = {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      {isLoading && <LoadingOverlay message={loadingMessage} />}
    </LoadingContext.Provider>
  )
}

interface LoadingOverlayProps {
  message: string;
}

/**
 * Loading overlay component that displays when loading is active
 */
function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <PremiumLoading 
      message={message}
      overlay={true}
      fullscreen={true}
    />
  )
}

/**
 * Higher-order component that wraps a component with loading functionality
 */
export function withLoading<P extends object>(Component: React.ComponentType<P>): React.FC<P> {
  const WithLoading = (props: P) => {
    return (
      <LoadingProvider>
        <Component {...props} />
      </LoadingProvider>
    )
  }

  // Set display name for debugging
  const displayName = Component.displayName || Component.name || 'Component'
  WithLoading.displayName = `WithLoading(${displayName})`

  return WithLoading
}

// Export the useLoading hook directly
export { useLoading };