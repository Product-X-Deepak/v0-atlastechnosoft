import { NextRequest, NextResponse } from 'next/server'

type ImageErrorPayload = {
  url: string
  timestamp: string
  userAgent?: string
  performance?: {
    duration?: number
    size?: number
  }
}

/**
 * API route to log image loading errors
 * This helps track which images are failing to load in production
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json() as ImageErrorPayload
    
    // Validate required fields
    if (!data.url || !data.timestamp) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }
    
    // Log the error (in production this would typically send to a logging service)
    console.error(
      `[Image Error] ${new Date(data.timestamp).toISOString()} - Failed to load: ${data.url}` +
      (data.userAgent ? ` | ${data.userAgent}` : '') +
      (data.performance?.duration ? ` | Duration: ${data.performance.duration}ms` : '') +
      (data.performance?.size ? ` | Size: ${data.performance.size} bytes` : '')
    )
    
    // In a real production app, you might want to:
    // 1. Send to logging service like Datadog, Sentry, etc.
    // 2. Store errors in a database to analyze patterns
    // 3. Alert if critical images are failing repeatedly
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[Image Error Logging] Failed to process error log:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 