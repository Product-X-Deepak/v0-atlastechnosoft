import { NextRequest as _NextRequest, NextResponse } from "next/server";
import { getResponseFromKnowledgeBase as _getResponseFromKnowledgeBase } from "@/lib/chatbot/response-engine";
import { ChatbotQuery as _ChatbotQuery, ChatbotResponse } from "@/lib/chatbot/types";
import { knowledgeBase } from "@/lib/chatbot/knowledge-base";
import { processWithRules as executeRules } from "@/lib/chatbot/rule-engine";
import { ChatbotConfig } from "@/lib/chatbot/config";

// Defined but not currently used; kept for future implementation of response time limiting
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const _FAQ_TIMEOUT = 2000; // 2 seconds timeout for faster FAQ responses

/**
 * FAQ API endpoint for quick answers to common questions
 * This is a specialized endpoint for high-performance responses to FAQs
 * without using the full AI pipeline for simple questions
 */
export async function POST(request: Request) {
  try {
    // Parse the request
    const { query, context } = await request.json();
    
    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Invalid request. Query must be a string." },
        { status: 400 }
      );
    }
    
    const normalizedQuery = query.trim().toLowerCase();
    
    // Check if this is a simple FAQ that we can answer directly
    const faqResponse = findExactFaqMatch(normalizedQuery);
    
    if (faqResponse) {
      // Track the FAQ usage
      try {
        await logFaqUsage(normalizedQuery, faqResponse.message);
      } catch (logError) {
        console.error("Error logging FAQ usage:", logError);
        // Non-critical, continue with response
      }
      
      return NextResponse.json(faqResponse);
    }
    
    // Try rule-based processing for slightly more complex but still structured questions
    const ruleResponse = executeRules(normalizedQuery, context);
    
    if (ruleResponse) {
      return NextResponse.json(ruleResponse);
    }
    
    // If we can't provide a direct answer, return a response directing to the main chatbot
    return NextResponse.json({
      message: "I'll need to think about this question a bit more deeply. Let me get you a comprehensive answer.",
      needsFullProcessing: true,
      confidence: 0.4,
      suggestedQuestions: getRelatedFaqs(normalizedQuery),
    });
    
  } catch (error) {
    console.error("Error in FAQ API:", error);
    return NextResponse.json(
      { 
        error: "An error occurred while processing your request.",
        message: "I'm having trouble processing your question right now. Please try again or ask something else."
      },
      { status: 500 }
    );
  }
}

/**
 * Checks for exact matches in FAQ database for ultra-fast responses
 */
function findExactFaqMatch(query: string): ChatbotResponse | null {
  // First, try exact pattern matching for very common questions
  const exactMatches: Record<string, string> = {
    "hi": ChatbotConfig.welcomeMessage,
    "hello": ChatbotConfig.welcomeMessage,
    "hey": ChatbotConfig.welcomeMessage,
    "contact": "You can reach us at contact@atlastechnosoft.com or call us at +1 (555) 123-4567. Would you like me to connect you with a representative?",
    "help": "I'm here to help! You can ask me about our SAP solutions, automation services, or any other services Atlas Technosoft offers. What would you like to know about?",
    "pricing": "Our pricing varies based on your specific needs and project requirements. I'd be happy to connect you with our sales team for a customized quote. Would you like me to arrange that for you?",
  };
  
  if (exactMatches[query]) {
    return {
      message: exactMatches[query],
      confidence: 0.99,
      isFaq: true,
      suggestedQuestions: [
        "What SAP solutions do you offer?",
        "Tell me about your automation solutions",
        "How can Atlas help my business?"
      ]
    };
  }
  
  // Then check against knowledge base for close matches
  for (const entry of knowledgeBase) {
    // Check for exact trigger matches
    if (entry.triggers.some(trigger => query === trigger.toLowerCase())) {
      return {
        message: entry.response,
        confidence: 0.96,
        isFaq: true,
        source: entry.source,
        suggestedQuestions: generateRelatedQuestions(entry.keywords)
      };
    }
    
    // Check for complete phrase inclusion
    if (entry.triggers.some(trigger => query.includes(trigger.toLowerCase()))) {
      return {
        message: entry.response,
        confidence: 0.92,
        isFaq: true,
        source: entry.source,
        suggestedQuestions: generateRelatedQuestions(entry.keywords)
      };
    }
  }
  
  return null;
}

/**
 * Generate related questions based on keywords
 */
function generateRelatedQuestions(keywords: string[]): string[] {
  const questionTemplates = [
    (keyword: string) => `Tell me more about ${keyword}`,
    (keyword: string) => `What are the benefits of ${keyword}?`,
    (keyword: string) => `How does ${keyword} work?`
  ];
  
  const questions: string[] = [];
  
  // First, try to use important keywords
  const priorityKeywords = keywords.filter(k => 
    ["sap", "business one", "automation", "rpa", "implementation", "cloud"].includes(k)
  );
  
  const keywordsToUse = priorityKeywords.length > 0 ? priorityKeywords : keywords;
  
  // Generate up to 3 questions
  for (let i = 0; i < Math.min(3, keywordsToUse.length); i++) {
    const template = questionTemplates[i % questionTemplates.length];
    questions.push(template(keywordsToUse[i]));
  }
  
  // If we didn't generate enough questions, add some default ones
  if (questions.length < 3) {
    const defaults = [
      "What services does Atlas Technosoft offer?",
      "How can I contact your team?",
      "What industries do you specialize in?"
    ];
    
    for (let i = questions.length; i < 3; i++) {
      questions.push(defaults[i]);
    }
  }
  
  return questions;
}

/**
 * Find related FAQs for a given query
 */
function getRelatedFaqs(query: string): string[] {
  // Split query into words and find matching entries with similar keywords
  const queryWords = new Set(query.split(/\s+/).filter(w => w.length > 3));
  
  // Score each knowledge base entry by keyword overlap
  const scoredEntries = knowledgeBase
    .map(entry => {
      let score = 0;
      
      // Count matching keywords
      entry.keywords.forEach(keyword => {
        if (queryWords.has(keyword.toLowerCase())) {
          score += 2;
        }
      });
      
      // Check if any trigger contains query words
      entry.triggers.forEach(trigger => {
        queryWords.forEach(word => {
          if (trigger.toLowerCase().includes(word)) {
            score += 1;
          }
        });
      });
      
      return { entry, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
  
  // Convert top entries to questions
  return scoredEntries
    .slice(0, 3)
    .map(item => item.entry.triggers[0]);
}

/**
 * Log FAQ usage for analytics and improvement
 */
async function logFaqUsage(query: string, response: string): Promise<void> {
  // In a production environment, this would log to a database or analytics service
  console.log(`FAQ Usage - Query: "${query}", Response: "${response.substring(0, 50)}..."`);
  
  // Example of how you might log to an analytics endpoint
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true") {
    try {
      await fetch("/api/analytics/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "faq_usage",
          query,
          responsePreview: response.substring(0, 100),
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      // Non-critical, just log the error
      console.error("Failed to log to analytics:", error);
    }
  }
} 