"use client"

import React from 'react'
import { ErrorBoundary } from './error-boundary'
import { createErrorBoundaryHandler } from '@/lib/error-logging'
import { Suspense } from "react"

interface ErrorBoundarySectionProps {
  name: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  resetOnChange?: React.DependencyList;
}

/**
 * A convenience component to wrap sections of the application with error boundaries
 * This provides a consistent error handling mechanism throughout the app
 */
export function ErrorBoundarySection({
  name,
  children,
  fallback,
  className,
  resetOnChange = []
}: ErrorBoundarySectionProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <ErrorBoundarySectionContent 
        name={name}
        fallback={fallback}
        className={className}
        resetOnChange={resetOnChange}
      >
        {children}
      </ErrorBoundarySectionContent>
    </Suspense>
  );
}

function ErrorBoundarySectionContent({
  name,
  children,
  fallback,
  className,
  resetOnChange = []
}: ErrorBoundarySectionProps) {
  const [key, setKey] = React.useState(0)
  
  // Reset the error boundary when specified dependencies change
  React.useEffect(() => {
    setKey(prev => prev + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, resetOnChange)
  
  return (
    <div className={className}>
      <ErrorBoundary
        key={key}
        fallback={fallback}
        onError={createErrorBoundaryHandler(name)}
      >
        {children}
      </ErrorBoundary>
    </div>
  )
}

/**
 * Create a higher-order component for wrapping a section with an error boundary
 */
export function withErrorBoundarySection<P extends object>(
  Component: React.ComponentType<P>,
  name: string,
  fallback?: React.ReactNode,
) {
  const WithErrorBoundarySection = (props: P) => (
    <ErrorBoundarySection name={name} fallback={fallback}>
      <Component {...props} />
    </ErrorBoundarySection>
  )
  
  // Set a display name for debugging
  const displayName = Component.displayName || Component.name || 'Component'
  WithErrorBoundarySection.displayName = `WithErrorBoundarySection(${displayName})`
  
  return WithErrorBoundarySection
}
