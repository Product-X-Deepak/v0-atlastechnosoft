import { NextRequest, NextResponse } from "next/server"

/**
 * API route for logging client-side errors
 * 
 * In a production environment, you would typically:
 * 1. Validate the error data
 * 2. Store errors in a database
 * 3. Notify developers via email/Slack/etc for critical errors
 * 4. Potentially integrate with services like Sentry, LogRocket, etc.
 */
export async function POST(request: NextRequest) {
  try {
    // Only accept JSON requests
    if (request.headers.get("content-type") !== "application/json") {
      return NextResponse.json(
        { error: "Invalid content type, expected application/json" },
        { status: 415 }
      )
    }

    // Parse the error data
    const errorData = await request.json()

    // Validate the error data has required fields
    if (!errorData.message || !errorData.timestamp) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Add additional metadata
    const enrichedErrorData = {
      ...errorData,
      receivedAt: new Date().toISOString(),
      // Get IP from headers or forwarded headers
      ip: request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown',
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    // Log the error to console in development
    if (process.env.NODE_ENV !== "production") {
      console.error("[API] Error logged:", enrichedErrorData)
    }

    // In production, you would store the error in a database or send to a logging service
    // For example:
    // await db.collection('errors').insertOne(enrichedErrorData)
    // or send to a service like Sentry, LogRocket, etc.

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error logging API failed:", error)
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 