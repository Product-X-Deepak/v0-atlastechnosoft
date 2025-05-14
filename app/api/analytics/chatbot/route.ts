import { NextRequest, NextResponse } from "next/server";
import { ConversationAnalytics } from "@/lib/chatbot/types";

// Rate limiting controls
const MAX_REQUESTS_PER_MINUTE = 30;
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }
    
    // Parse the request body with validation
    const body = await request.json();
    
    // Validate required fields
    if (!body.messageId || !body.sessionId || !body.userMessage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    const analytics: ConversationAnalytics = {
      messageId: body.messageId,
      sessionId: body.sessionId,
      userMessage: body.userMessage,
      botResponse: body.botResponse || "",
      timestamp: body.timestamp || new Date().toISOString(),
      responseTiming: body.responseTiming,
      isHelpful: body.isHelpful,
      metadata: body.metadata || {}
    };
    
    // Log the analytics data (in a real implementation, this would send to a database)
    console.log("Chatbot analytics:", JSON.stringify(analytics));
    
    // TODO: In production, implement actual analytics storage
    // Example: await saveAnalyticsToDatabase(analytics);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing analytics:", error);
    return NextResponse.json(
      { error: "Failed to process analytics" },
      { status: 500 }
    );
  }
}

/**
 * Check if the request exceeds rate limits
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  
  // If no record exists or reset time has passed, create a new record
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, {
      count: 1,
      resetTime: now + 60000 // Reset after 1 minute
    });
    return false;
  }
  
  // If under limit, increment count
  if (record.count < MAX_REQUESTS_PER_MINUTE) {
    record.count++;
    return false;
  }
  
  // Rate limit exceeded
  return true;
} 