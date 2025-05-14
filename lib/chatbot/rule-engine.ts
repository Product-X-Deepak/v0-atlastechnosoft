/**
 * Rule-Based Processing Engine for Atlas Assistant
 * This module provides rule-based processing for specific query types
 * to enhance accuracy and provide consistent responses
 * @module rule-engine
 */

import { ChatbotConfig as _ChatbotConfig } from "./config";
import { ChatbotResponse } from "./types";

// Rule types for different categories of queries
type RuleCategory = 
  | 'contact' 
  | 'pricing' 
  | 'location' 
  | 'hours' 
  | 'emergency' 
  | 'technical' 
  | 'products' 
  | 'security' 
  | 'compliance' 
  | 'recommendation';

// Define the structure of a rule
interface Rule {
  id: string;
  category: RuleCategory;
  patterns: RegExp[];
  keywords: string[];
  response: (entities?: string[]) => string;
  priority: number; // 1-10, 10 being highest priority
  requiresEntities?: boolean;
  fallbackToAI?: boolean;
  source?: string;
}

/**
 * Extract entities (important words/phrases) from the query
 * @param query User query
 */
export function extractEntities(query: string): string[] {
  // Simple entity extraction based on keywords
  const entities = new Set<string>();
  
  // Product names
  const productPatterns = [
    /SAP\s+Business\s+One/i, 
    /S\/4HANA/i, 
    /UiPath/i, 
    /HANA/i, 
    /ByDesign/i,
    /Business\s+ByDesign/i,
    /SAP\s+B1/i,
    /Joule/i
  ];
  
  // Extract product names
  for (const pattern of productPatterns) {
    const match = query.match(pattern);
    if (match && match[0]) {
      entities.add(match[0].toLowerCase());
    }
  }

  // Extract years if mentioned (for version-specific queries)
  const yearPattern = /(20\d\d)/g;
  const years = query.match(yearPattern);
  if (years) {
    years.forEach(year => entities.add(year));
  }
  
  // Extract specific technologies
  const techPatterns = [
    /agentic/i,
    /automation/i,
    /RPA/i,
    /Autopilot/i,
    /cloud/i,
    /on-premise/i,
    /AI/i,
    /machine learning/i,
    /document understanding/i,
    /process mining/i
  ];
  
  for (const pattern of techPatterns) {
    const match = query.match(pattern);
    if (match && match[0]) {
      entities.add(match[0].toLowerCase());
    }
  }
  
  return Array.from(entities);
}

/**
 * Determine if the query has a specific intent
 * @param query User query 
 * @param intentPatterns Patterns that indicate the intent
 */
export function hasIntent(query: string, intentPatterns: RegExp[]): boolean {
  return intentPatterns.some(pattern => pattern.test(query));
}

/**
 * Process the query using rule-based approach
 * @param query User query
 * @param context Previous conversation context
 */
export function processWithRules(query: string, context?: string[]): ChatbotResponse | null {
  // Normalize the query
  const normalizedQuery = query.toLowerCase().trim();
  
  // Extract entities
  const entities = extractEntities(normalizedQuery);
  
  // Define rules with patterns, responses, and priorities
  const rules: Rule[] = [
    // Contact information rule
    {
      id: 'contact-info',
      category: 'contact',
      patterns: [
        /how (can|do) I contact/i,
        /contact (information|details)/i,
        /phone number/i,
        /email address/i,
        /reach out/i,
        /get in touch/i
      ],
      keywords: ['contact', 'phone', 'email', 'reach', 'touch', 'call'],
      response: () => 
        "You can contact Atlas Technosoft by email at info@atlastechnosoft.com, or by phone at +91-22-2240 1925, +91-22-4022 1925, or mobile +91-9372329599. Alternatively, you can fill out our contact form on our website at atlastechnosoft.com/Contact_Us.html. Our team typically responds within 1 business day.",
      priority: 10,
      source: "Contact Information"
    },
    
    // Office location rule
    {
      id: 'office-location',
      category: 'location',
      patterns: [
        /where (are you|is the office)/i,
        /(office|company) (location|address)/i,
        /headquarters/i,
        /visit (your|the) office/i
      ],
      keywords: ['office', 'location', 'address', 'headquarter', 'visit'],
      response: () => 
        "Our Head Office is located at Office No.29, Building No.108/116, Vitthalwadi, Kalabadevi Road, Marine Lines, Mumbai - 400 002, Maharashtra, India. We also have a Branch Office at F/2nd Floor, Yashodhan Building, Chandavarkar Road, Om Shanti Chowk, Borivali(west), Mumbai - 400 092, Maharashtra, India.",
      priority: 9,
      source: "Company Locations"
    },
    
    // Business hours rule
    {
      id: 'business-hours',
      category: 'hours',
      patterns: [
        /business hours/i,
        /when are you open/i,
        /opening hours/i,
        /working hours/i,
        /office hours/i,
        /hours of operation/i
      ],
      keywords: ['hours', 'open', 'operation', 'timing', 'schedule'],
      response: () => 
        "Our standard business hours are Monday to Friday, 9:00 AM to 6:00 PM Indian Standard Time (IST). Our support team is available 24/7 for Premium Support customers.",
      priority: 8,
      source: "Company Information"
    },
    
    // Emergency support rule
    {
      id: 'emergency-support',
      category: 'emergency',
      patterns: [
        /emergency support/i,
        /urgent help/i,
        /system (down|failure|outage)/i,
        /critical issue/i,
        /production (issue|outage)/i,
        /immediate assistance/i
      ],
      keywords: ['emergency', 'urgent', 'critical', 'immediate', 'production', 'down', 'outage'],
      response: () => 
        "For urgent or critical issues, please contact our 24/7 emergency support line at +91-9372329599 or email emergency-support@atlastechnosoft.com with 'URGENT' in the subject line. Premium Support customers can also use the dedicated emergency portal at support.atlastechnosoft.com/emergency. Our SLA guarantees a response within 30 minutes for critical issues.",
      priority: 10,
      source: "Support Services"
    },
    
    // Product-specific version information rule
    {
      id: 'product-version-info',
      category: 'products',
      patterns: [
        /what'?s new in (.*?)( in | )(20\d\d|\d+\.\d+)/i,
        /latest (version|features|update|release) (of|in|for) (.*)/i,
        /new features in (.*?)( in | )(20\d\d|\d+\.\d+)/i
      ],
      keywords: ['new', 'latest', 'version', 'features', 'update', 'release', '2025', '2024'],
      response: (entities) => {
        if (entities && entities.length > 0) {
          // Check for SAP Business One
          if (entities.some(e => e.includes('business one') || e.includes('b1'))) {
            return "SAP Business One 2025 comes with enhanced AI capabilities, including Joule - SAP's AI copilot that provides context-aware insights and guidance. Key improvements include advanced analytics with real-time dashboards, extended web client capabilities with an intuitive user experience, and a new API framework for easier customization. The 2025 version also features improved identity and authentication management with two-factor authentication, cloud-native integrations, and enhanced mobile functionality.";
          }
          
          // Check for UiPath
          if (entities.some(e => e.includes('uipath'))) {
            return "UiPath's latest platform includes a significant shift to agentic automation, combining AI agents that think and adapt with robots that execute tasks with precision. Key features include Agent Builder for creating enterprise agents, Autopilot for AI-powered productivity across different roles, Maestro for orchestrating human-AI-robot workflows, and an AI Trust Layer for enterprise governance. Their 2025 vision focuses on extending automation to more complex, differentiated use cases that weren't previously possible with traditional RPA.";
          }
          
          // Check for S/4HANA
          if (entities.some(e => e.includes('s/4hana'))) {
            return "SAP S/4HANA Cloud Public Edition 2502 update (2025) includes advanced AI capabilities powered by Joule, SAP's AI copilot. Key enhancements include AI-driven productivity features, modern collaborative user experience with Microsoft Teams integration, intelligent finance with SAP Green Ledger, and expanded functionality tailored for specific industries like retail. The platform also includes improved service contract management, pricing flexibility, and enhanced identity and access management.";
          }
        }
        
        // Generic response if specific product not identified
        return "Our latest product updates include enhanced AI capabilities, improved cloud integrations, and more robust security features. For specific product information, please let me know which solution you're interested in, such as SAP Business One, UiPath, or our other offerings.";
      },
      priority: 8,
      requiresEntities: true,
      fallbackToAI: true,
      source: "Product Updates 2025"
    },
    
    // Security policy rule
    {
      id: 'security-policy',
      category: 'security',
      patterns: [
        /security (policy|practices|measures)/i,
        /how (do you|does atlas) (handle|manage|protect) (data|security)/i,
        /data protection/i,
        /privacy policy/i,
        /data security/i
      ],
      keywords: ['security', 'secure', 'protection', 'privacy', 'data', 'confidential', 'encryption'],
      response: () => 
        "Security is a top priority at Atlas Technosoft. We implement industry best practices including end-to-end encryption, role-based access controls, regular security audits, and comprehensive staff training. Our solutions comply with relevant regulations like GDPR and industry standards. We employ a multi-layered security approach with secure development practices, regular penetration testing, and a dedicated security team that monitors for threats 24/7. All client data is encrypted both in transit and at rest.",
      priority: 9,
      source: "Security and Compliance"
    },
    
    // Compliance information rule
    {
      id: 'compliance-info',
      category: 'compliance',
      patterns: [
        /compliance (with|to) (.*)/i,
        /(gdpr|hipaa|iso|soc) compliance/i,
        /(regulatory|regulation) (requirements|compliance)/i,
        /compliant with (.*)/i
      ],
      keywords: ['compliance', 'compliant', 'gdpr', 'hipaa', 'iso', 'regulatory', 'regulation'],
      response: (entities) => {
        let specificCompliance = "";
        if (entities && entities.length > 0) {
          if (entities.some(e => e.includes('gdpr'))) {
            specificCompliance = " For GDPR specifically, we serve as both a data processor and controller depending on the context, and we provide data processing agreements, maintain records of processing activities, and support data subject rights requests.";
          } else if (entities.some(e => e.includes('hipaa'))) {
            specificCompliance = " For HIPAA specifically, we implement all required physical, technical, and administrative safeguards, provide business associate agreements, and ensure our staff receives regular HIPAA compliance training.";
          }
        }
        
        return "Atlas Technosoft maintains compliance with major regulatory frameworks including GDPR, HIPAA, ISO 27001, and SOC 2. Our solutions are designed with compliance in mind, and we regularly update our policies and procedures to reflect changes in regulations. We provide compliance documentation and can support our clients through audits and assessments." + specificCompliance;
      },
      priority: 8,
      source: "Security and Compliance"
    },
    
    // Solution recommendation rule
    {
      id: 'solution-recommendation',
      category: 'recommendation',
      patterns: [
        /which (solution|product|software) (should I|would you) (use|recommend|choose)/i,
        /recommend (a|the best) (solution|software|product)/i,
        /best (solution|option) for (.*)/i,
        /help (me|us) choose/i,
        /what (would you|do you) recommend/i
      ],
      keywords: ['recommend', 'recommendation', 'best', 'choose', 'solution', 'right', 'fit'],
      response: (entities) => {
        let specificRecommendation = "";
        
        if (entities && entities.length > 0) {
          if (entities.some(e => e.includes('small') || e.includes('sme'))) {
            specificRecommendation = " For small to medium-sized businesses, we typically recommend SAP Business One as it offers comprehensive functionality at a price point that makes sense for growing companies. It covers financials, sales, inventory, production, and more in an integrated package.";
          } else if (entities.some(e => e.includes('enterprise') || e.includes('large'))) {
            specificRecommendation = " For larger enterprises with complex requirements, SAP S/4HANA Cloud provides enterprise-scale capabilities with the flexibility of cloud deployment and advanced AI-powered analytics.";
          } else if (entities.some(e => e.includes('automation'))) {
            specificRecommendation = " For automation needs, our UiPath-based solutions offer the best combination of robust RPA capabilities and cutting-edge agentic AI features for end-to-end process automation.";
          }
        }
        
        return "To provide the most appropriate recommendation, we'd need to understand your specific business requirements, industry, size, budget, and strategic objectives. We typically conduct a detailed requirements gathering session to match the right solution to your needs." + specificRecommendation + " I'd be happy to arrange a consultation with one of our solution architects who can provide a tailored recommendation based on your specific situation.";
      },
      priority: 7,
      fallbackToAI: true,
      source: "Solution Consultation"
    }
  ];
  
  // Check each rule against the query
  for (const rule of rules) {
    // Check if the query matches any pattern in the rule
    if (hasIntent(normalizedQuery, rule.patterns)) {
      // Check if the rule requires entities and if we have them
      if (rule.requiresEntities && (!entities || entities.length === 0)) {
        continue; // Skip this rule if it requires entities but none were found
      }
      
      // Generate the response based on the rule
      const response = rule.response(entities);
      
      // Return the rule-based response
      return {
        message: response,
        source: rule.source,
        confidence: rule.priority / 10, // Convert priority to confidence score
        factChecked: true,
        ruleBasedResponse: true as any, // Type assertion to handle missing property
        matchedRule: rule.id as any, // Type assertion to handle missing property
        contextAware: context && context.length > 0 ? true : false,
        suggestedQuestions: generateFollowUpQuestions(rule.category, entities)
      };
    }
  }
  
  // No matching rule found
  return null;
}

/**
 * Generate contextual follow-up questions based on the rule category and entities
 * @param category Rule category that matched
 * @param entities Entities extracted from the query
 */
function generateFollowUpQuestions(category: RuleCategory, entities?: string[]): string[] {
  switch(category) {
    case 'contact':
      return [
        "What are your business hours?",
        "Can I schedule a product demo?",
        "Where are your offices located?"
      ];
      
    case 'location':
      return [
        "What are your business hours?",
        "How can I schedule a meeting at your office?",
        "Do you offer remote consultations?"
      ];
      
    case 'hours':
      return [
        "How can I contact your support team?",
        "What is your emergency support process?",
        "Do you offer 24/7 support?"
      ];
      
    case 'emergency':
      return [
        "What's included in your Premium Support package?",
        "How do you handle system outages?",
        "What are your typical issue resolution times?"
      ];
      
    case 'products':
      if (entities && entities.some(e => e.includes('business one') || e.includes('b1'))) {
        return [
          "What are the key benefits of SAP Business One?",
          "How does the cloud version of Business One compare to on-premise?",
          "What industries do you implement SAP Business One for?"
        ];
      } else if (entities && entities.some(e => e.includes('uipath'))) {
        return [
          "What is agentic automation in UiPath?",
          "Tell me about UiPath Autopilot",
          "How does UiPath integrate with SAP systems?"
        ];
      } else {
        return [
          "What SAP solutions do you offer?",
          "Tell me about your automation capabilities",
          "What digital transformation services do you provide?"
        ];
      }
      
    case 'security':
      return [
        "What compliance certifications do you have?",
        "How do you handle data breaches?",
        "Can you explain your data protection practices?"
      ];
      
    case 'compliance':
      return [
        "How do you help with GDPR compliance?",
        "What security measures do you implement?",
        "Do you conduct regular security audits?"
      ];
      
    case 'recommendation':
      return [
        "Can you tell me more about SAP Business One?",
        "What automation solutions do you offer?",
        "How do you typically implement new systems?"
      ];
      
    default:
      return [
        "What services does Atlas Technosoft offer?",
        "Tell me about your implementation methodology",
        "What industries do you specialize in?"
      ];
  }
}

/**
 * Check if the response should be factual and needs verification
 * @param query User query
 */
export function requiresFactualAnswer(query: string): boolean {
  // Patterns indicating factual questions
  const factualPatterns = [
    /how (much|many|long)/i,
    /when (is|was|will)/i,
    /where (is|can)/i,
    /(what|which) (is|are|version)/i,
    /(cost|price|pricing|fee)/i,
    /how do (I|you|we)/i
  ];
  
  return factualPatterns.some(pattern => pattern.test(query));
}

/**
 * Determine if the query is asking about pricing or costs
 * @param query User query
 */
export function isPricingQuery(query: string): boolean {
  const pricingPatterns = [
    /(cost|price|pricing|fees|payment)/i,
    /how much (does|is|do)/i,
    /(subscription|license) (cost|fee|pricing)/i,
    /monthly (cost|fee|payment)/i
  ];
  
  return pricingPatterns.some(pattern => pattern.test(query));
}

/**
 * Check if the query is security or compliance related
 * @param query User query
 */
export function isSecurityOrComplianceQuery(query: string): boolean {
  const securityPatterns = [
    /(security|secure|encryption|encrypted)/i,
    /(compliance|compliant|gdpr|hipaa|iso)/i,
    /data (protection|privacy)/i,
    /(protect|protected) (data|information)/i
  ];
  
  return securityPatterns.some(pattern => pattern.test(query));
}

/**
 * Check if the query is requesting a comparison between products or services
 * @param query User query
 */
export function isComparisonQuery(query: string): boolean {
  const comparisonPatterns = [
    /compare|comparison/i,
    /difference between/i,
    /(.*) (vs|versus|or) (.*)/i,
    /which is better/i,
    /pros and cons/i
  ];
  
  return comparisonPatterns.some(pattern => pattern.test(query));
}

// Export processWithRules as executeRules for backward compatibility
export const executeRules = processWithRules; 