"use client";

import React from 'react';
import { SEODebugger } from '@/components/seo/seo-debugger';
import { Suspense } from "react"

/**
 * Client component wrapper for the SEO Debugger
 * Separated from the main page component to keep server/client concerns separate
 */
function SEODebuggerWrapper() {
  return <SEODebugger />;
}

// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function SEODebuggerWrapperWrapper(props: Record<string, never>) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <SEODebuggerWrapper {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { SEODebuggerWrapperWrapper as SEODebuggerWrapper };