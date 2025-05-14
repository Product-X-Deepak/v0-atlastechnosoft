"use client";

import { lazy, Suspense, ComponentType, Component } from 'react';
import { useState, useEffect } from 'react';

// Simple error boundary component
class ErrorBoundary extends Component<{
  children: React.ReactNode;
  fallback: React.ReactNode;
  retry?: boolean;
}> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: unknown, errorInfo: unknown) {
    // Log error to monitoring service
    console.error('Component error:', error, errorInfo);
  }
  
  retry = () => {
    this.setState({ hasError: false, error: null });
  };
  
  render() {
    if (this.state.hasError) {
      if (this.props.retry) {
        return (
          <div className="flex flex-col items-center justify-center p-4 space-y-4">
            {this.props.fallback}
            <button 
              onClick={this.retry}
              className="px-4 py-2 text-white bg-primary rounded hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        );
      }
      
      return this.props.fallback;
    }
    
    return this.props.children;
  }
}

type LazyComponentProps = {
  component: () => Promise<{ default: ComponentType<unknown> }>;
  fallback?: React.ReactNode;
  onError?: React.ReactNode;
  loadingDelay?: number; // Delay in ms before showing loading state
  errorRetry?: boolean; // Whether to enable error retries
} & Record<string, unknown>;

// Extract the fallback component to avoid hooks inside callbacks
function DelayedFallback({ 
  fallback, 
  delay 
}: { 
  fallback: React.ReactNode; 
  delay: number;
}) {
  const [showFallback, setShowFallback] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return showFallback ? <>{fallback}</> : null;
}

/**
 * LazyComponent - A utility for easy lazy loading of components with fallbacks
 * 
 * Usage:
 * <LazyComponent 
 *   component={() => import('../path/to/heavy-component')} 
 *   fallback={<Skeleton />} 
 *   {...props} 
 * />
 */
export default function LazyComponent({
  component,
  fallback = <div className="animate-pulse h-32 bg-muted rounded-md" />,
  onError = <div className="text-destructive p-4 border border-destructive/50 rounded-md">Failed to load component</div>,
  loadingDelay = 0,
  errorRetry = true,
  ...props
}: LazyComponentProps) {
  // Use dynamic import with lazy loading
  const LazyLoadedComponent = lazy(component);
  
  // For components that might show loading state immediately, this
  // prevents layout shifts by delaying the loading indicator
  const fallbackComponent = loadingDelay > 0 
    ? <DelayedFallback fallback={fallback} delay={loadingDelay} />
    : <>{fallback}</>;
  
  return (
    <Suspense fallback={fallbackComponent}>
      <ErrorBoundary fallback={onError} retry={errorRetry}>
        <LazyLoadedComponent {...props} />
      </ErrorBoundary>
    </Suspense>
  );
} 