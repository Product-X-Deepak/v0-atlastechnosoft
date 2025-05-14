import { MessageFeedback } from "./types";

/**
 * System for handling chatbot feedback and continuously improving responses
 */

interface FeedbackData extends MessageFeedback {
  messageId: string;
  sessionId: string;
  query: string;
  response: string;
  detectedEntities?: string[];
  confidence?: number;
}

/**
 * Process user feedback on a chatbot response
 * @param feedback The feedback data to process
 */
export async function processFeedback(feedback: FeedbackData): Promise<void> {
  try {
    // Log the feedback
    console.log("Received feedback:", JSON.stringify(feedback));
    
    // Store feedback in database
    await storeFeedback(feedback);
    
    // If negative feedback, flag for review
    if (!feedback.isHelpful) {
      await flagForHumanReview(feedback);
    }
    
    // Update response quality metrics
    await updateMetrics(feedback);
  } catch (error) {
    console.error("Error processing feedback:", error instanceof Error ? error.message : "Unknown error");
    // Non-critical operation so we don't throw the error further
  }
}

/**
 * Store feedback in database for analysis
 */
async function storeFeedback(feedback: FeedbackData): Promise<void> {
  try {
    // In production, this would write to a database
    // For now, just log it
    console.log("Storing feedback in database:", feedback.messageId);
    
    // Example implementation with fetch API
    await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedback),
      signal: AbortController && new AbortController().signal
    }).catch(() => {
      // Silent catch - non-critical operation
    });
  } catch (error) {
    console.error("Error storing feedback:", error);
  }
}

/**
 * Flag problematic responses for human review
 */
async function flagForHumanReview(feedback: FeedbackData): Promise<void> {
  try {
    console.log("Flagging for human review:", feedback.messageId);
    
    // In production, this would create a review ticket in a system
    // For now, just log additional information
    
    console.log("Review needed for response:", {
      messageId: feedback.messageId,
      query: feedback.query,
      response: feedback.response,
      reason: feedback.comment || "Marked as not helpful",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error flagging for review:", error);
  }
}

/**
 * Update response quality metrics
 */
async function updateMetrics(feedback: FeedbackData): Promise<void> {
  try {
    // In production, this would update metrics in a monitoring system
    // For example, tracking response quality by topic, confidence level, etc.
    
    // Extract topic from entities if available
    const topic = feedback.detectedEntities?.join(", ") || "unknown";
    
    console.log("Updating metrics for:", {
      topic,
      isHelpful: feedback.isHelpful,
      confidence: feedback.confidence,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating metrics:", error);
  }
}

/**
 * Get improvement suggestions based on collected feedback
 */
export async function getImprovementSuggestions(): Promise<Array<{topic: string, suggestion: string}>> {
  // In production, this would analyze feedback data and suggest improvements
  // Example of what this function would return after analyzing real data
  return [
    {
      topic: "sap business one",
      suggestion: "Add more specific information about implementation timelines"
    },
    {
      topic: "pricing",
      suggestion: "Provide clearer guidance on when to direct to specialists for pricing questions"
    },
    {
      topic: "automation solutions",
      suggestion: "Include more industry-specific examples of automation benefits"
    }
  ];
}

/**
 * Check if a message should be automatically flagged for review
 * @param message The message to check
 * @param confidence The confidence score of the response
 */
export function shouldAutoFlagForReview(message: string, confidence?: number): boolean {
  // Very low confidence responses
  if (confidence !== undefined && confidence < 0.3) {
    return true;
  }
  
  // Check for non-committal patterns that suggest uncertainty
  const uncertaintyPatterns = [
    "I'm not sure",
    "I don't have enough information",
    "I don't know",
    "I can't provide",
    "unable to answer",
    "don't have specific"
  ];
  
  if (uncertaintyPatterns.some(pattern => message.toLowerCase().includes(pattern.toLowerCase()))) {
    return true;
  }
  
  return false;
} 