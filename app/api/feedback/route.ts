import { NextRequest, NextResponse } from "next/server";

/**
 * API route for submitting user feedback on chatbot responses
 * Collects feedback to improve responses over time
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { messageId, isHelpful, sessionId, timestamp, comment } = body;
    
    // Validate required fields
    if (!messageId || typeof isHelpful !== 'boolean' || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Log the feedback to database or analytics service
    await logFeedback({
      messageId,
      isHelpful,
      sessionId,
      timestamp: timestamp || new Date().toISOString(),
      comment: comment || ''
    });
    
    return NextResponse.json({
      success: true,
      message: "Feedback received successfully"
    });
  } catch (error) {
    console.error("Error processing feedback:", error);
    
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to process feedback" 
      },
      { status: 500 }
    );
  }
}

/**
 * Logs feedback to the appropriate storage service
 * This could be expanded to write to a database, logging service, etc.
 */
async function logFeedback(feedbackData: {
  messageId: string;
  isHelpful: boolean;
  sessionId: string;
  timestamp: string;
  comment: string;
}) {
  // Log to console for development
  console.log('Chatbot feedback received:', feedbackData);
  
  // Here you would typically:
  // 1. Store in a database (MongoDB, PostgreSQL, etc.)
  // 2. Send to an analytics service
  // 3. Add to a feedback training dataset
  
  // For example with a database:
  // await db.collection('chatbot_feedback').insertOne(feedbackData);
  
  // For now, we're just logging to console as a placeholder
  // This allows for future implementation without changing the API contract
  
  // Return true to indicate successful logging
  return true;
} 