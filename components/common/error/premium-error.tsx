"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug, 
  Wifi, 
  Server, 
  ShieldAlert, 
  Lock,
  FileCog,
  ArrowLeft 
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from "react"

type ErrorType = 
  | 'generic' 
  | 'network' 
  | 'server' 
  | 'permission' 
  | 'authentication' 
  | 'validation' 
  | 'not-found'
  | 'resource'

interface PremiumErrorProps {
  title?: string
  message?: string
  error?: Error
  errorType?: ErrorType
  showRefresh?: boolean
  showHomeButton?: boolean
  showBackButton?: boolean
  onReset?: () => void
  className?: string
  fullscreen?: boolean
}

/**
 * Premium error component with animations and icons tailored to different error types
 */
function PremiumError({
  title,
  message,
  error,
  errorType = 'generic',
  showRefresh = true,
  showHomeButton = true,
  showBackButton = false,
  onReset,
  className = '',
  fullscreen = false
}: PremiumErrorProps) {
  // Default error messages based on error type
  const errorMeta = getErrorMeta(errorType, error)
  
  // Handle the refresh action
  const handleReset = () => {
    if (onReset) {
      onReset()
    } else {
      // If no custom handler is provided, try to reload the page
      window.location.reload()
    }
  }
  
  // Handle the back action
  const handleBack = () => {
    window.history.back()
  }

  const ContainerComponent = fullscreen ? 'div' : motion.div
  
  return (
    <div className={`
      ${fullscreen ? 'min-h-screen' : 'min-h-[400px]'} 
      flex flex-col items-center justify-center relative px-4 md:px-8 py-12
      ${className}
    `}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 h-[250px] w-[250px] rounded-full bg-secondary/5 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Error content */}
      <div className="relative w-full max-w-xl mx-auto">
        <ContainerComponent
          initial={fullscreen ? undefined : { opacity: 0, y: 20 }}
          animate={fullscreen ? undefined : { opacity: 1, y: 0 }}
          transition={fullscreen ? undefined : { duration: 0.6 }}
          className="bg-background/70 backdrop-blur-md shadow-lg border border-border/60 rounded-2xl p-8 md:p-10"
        >
          <div className="text-center">
            {/* Error icon */}
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20 
              }}
            >
              <div className={`
                rounded-full p-4
                ${errorMeta.iconBgColor}
              `}>
                {errorMeta.icon}
              </div>
            </motion.div>
            
            {/* Error badge */}
            <motion.div 
              className="inline-block mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.1 
              }}
            >
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {errorMeta.badge}
              </div>
            </motion.div>
            
            {/* Title with gradient */}
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4 leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title || errorMeta.title}
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-muted-foreground mb-8 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {message || errorMeta.message}
            </motion.p>
            
            {/* Action buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {showRefresh && (
                <Button 
                  onClick={handleReset}
                  size="lg" 
                  className="space-x-2 touch-target shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-shadow"
                >
                  <RefreshCw className="h-4 w-4 mr-1.5" />
                  <span>Try Again</span>
                </Button>
              )}
              
              {showHomeButton && (
                <Button 
                  asChild 
                  variant={showRefresh ? "outline" : "default"}
                  size="lg"
                  className="space-x-2 touch-target"
                >
                  <Link href="/">
                    <Home className="h-4 w-4 mr-1.5" />
                    <span>Go to Home</span>
                  </Link>
                </Button>
              )}
              
              {showBackButton && (
                <Button 
                  onClick={handleBack}
                  variant="outline" 
                  size="lg"
                  className="space-x-2 touch-target"
                >
                  <ArrowLeft className="h-4 w-4 mr-1.5" />
                  <span>Go Back</span>
                </Button>
              )}
            </motion.div>
            
            {/* Error details (for developers) */}
            {error && process.env.NODE_ENV === 'development' && (
              <motion.div 
                className="mt-10 pt-6 border-t border-border/50 text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Error Details (Development Mode Only):
                </p>
                <div className="bg-black/10 dark:bg-white/5 p-4 rounded-lg overflow-auto max-h-[200px] text-xs font-mono">
                  <p className="font-semibold">{error.name}: {error.message}</p>
                  {error.stack && (
                    <pre className="mt-2 text-muted-foreground whitespace-pre-wrap break-words">
                      {error.stack}
                    </pre>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </ContainerComponent>
      </div>
    </div>
  )
}

/**
 * Helper function to get error metadata based on the error type
 */
function getErrorMeta(errorType: ErrorType, error?: Error) {
  // Default values for generic error
  let icon = <AlertTriangle className="h-10 w-10 text-yellow-500" />
  let iconBgColor = 'bg-yellow-500/10'
  let badge = 'Error'
  let title = 'Something Went Wrong'
  let message = 'We encountered an unexpected error. Please try again or contact support if the issue persists.'

  // Customize based on error type
  switch (errorType) {
    case 'network':
      icon = <Wifi className="h-10 w-10 text-blue-500" />
      iconBgColor = 'bg-blue-500/10'
      badge = 'Network Error'
      title = 'Connection Issue'
      message = 'There seems to be a problem with your internet connection. Please check your network and try again.'
      break
      
    case 'server':
      icon = <Server className="h-10 w-10 text-red-500" />
      iconBgColor = 'bg-red-500/10'
      badge = 'Server Error'
      title = 'Server Problem'
      message = 'Our servers are currently experiencing issues. We\'re working on a fix. Please try again later.'
      break
      
    case 'permission':
      icon = <ShieldAlert className="h-10 w-10 text-orange-500" />
      iconBgColor = 'bg-orange-500/10'
      badge = 'Permission Denied'
      title = 'Access Restricted'
      message = 'You don\'t have permission to access this resource. Please contact your administrator.'
      break
      
    case 'authentication':
      icon = <Lock className="h-10 w-10 text-purple-500" />
      iconBgColor = 'bg-purple-500/10'
      badge = 'Authentication Error'
      title = 'Authentication Required'
      message = 'Please log in to access this content. Your session may have expired.'
      break
      
    case 'validation':
      icon = <FileCog className="h-10 w-10 text-yellow-500" />
      iconBgColor = 'bg-yellow-500/10'
      badge = 'Validation Error'
      title = 'Invalid Input'
      message = 'There was an issue with the data provided. Please check your input and try again.'
      break
      
    case 'not-found':
      icon = <AlertTriangle className="h-10 w-10 text-blue-500" />
      iconBgColor = 'bg-blue-500/10'
      badge = '404 Error'
      title = 'Not Found'
      message = 'The resource you are looking for doesn\'t exist or has been moved.'
      break
      
    case 'resource':
      icon = <Bug className="h-10 w-10 text-green-500" />
      iconBgColor = 'bg-green-500/10'
      badge = 'Resource Error'
      title = 'Resource Unavailable'
      message = 'The requested resource is currently unavailable. Please try again later.'
      break
  }
  
  // If we have an actual error, try to extract a better message
  if (error && error.message) {
    // Avoid exposing sensitive info in production
    if (process.env.NODE_ENV === 'development') {
      message = error.message
    }
  }
  
  return { icon, iconBgColor, badge, title, message }
} 
// Wrapper component to ensure proper Suspense boundaries for useSearchParams
function PremiumErrorWrapper(props: PremiumErrorProps) {
  return (
    <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20 rounded-lg" />}>
      <PremiumError {...props} />
    </Suspense>
  );
}

// Modify the export to use the wrapped version
export { PremiumErrorWrapper as PremiumError };