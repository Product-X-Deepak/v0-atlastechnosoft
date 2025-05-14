import { knowledgeBase, KnowledgeBaseEntry as _KnowledgeBaseEntry } from "./knowledge-base";

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

/**
 * Extracts frequently asked questions from the knowledge base
 * @returns An array of FAQ objects
 */
export function extractFAQs(): FAQ[] {
  const faqs: FAQ[] = [];
  
  // Categories for organization
  const categories = {
    company: "About Atlas Technosoft",
    sap: "SAP Solutions",
    automation: "Automation Solutions",
    industry: "Industry Solutions",
    services: "Services",
    technology: "Technology & Integration",
    pricing: "Pricing & Timeline",
    contact: "Contact & Support",
  };
  
  // Map to assign categories based on keywords
  const categoryMapping: Record<string, string> = {
    // Company information
    "about": categories.company,
    "atlas": categories.company,
    "company": categories.company,
    "founded": categories.company,
    "located": categories.company,
    
    // SAP Solutions
    "sap": categories.sap,
    "business one": categories.sap,
    "b1": categories.sap,
    "hana": categories.sap,
    "cloud": categories.sap,
    "erp": categories.sap,
    
    // Automation Solutions
    "automation": categories.automation,
    "rpa": categories.automation,
    "robot": categories.automation,
    "uipath": categories.automation,
    "boyum": categories.automation,
    "workflow": categories.automation,
    
    // Industry Solutions
    "industry": categories.industry,
    "manufacturing": categories.industry,
    "distribution": categories.industry,
    "retail": categories.industry,
    "professional services": categories.industry,
    
    // Services
    "services": categories.services,
    "implementation": categories.services,
    "consulting": categories.services,
    "support": categories.services,
    "training": categories.services,
    
    // Technology
    "integration": categories.technology,
    "cloud solutions": categories.technology,
    "ai": categories.technology,
    "mobile": categories.technology,
    
    // Pricing
    "pricing": categories.pricing,
    "cost": categories.pricing,
    "timeline": categories.pricing,
    "duration": categories.pricing,
    
    // Contact
    "contact": categories.contact,
    "demo": categories.contact,
    "quote": categories.contact,
    "technical support": categories.contact,
  };
  
  // Extract first trigger from each knowledge base entry as a question
  knowledgeBase.forEach((entry) => {
    if (entry.triggers.length > 0) {
      // Format the question (capitalize first letter, add question mark if needed)
      let question = entry.triggers[0];
      question = question.charAt(0).toUpperCase() + question.slice(1);
      if (!question.endsWith("?")) {
        question += "?";
      }
      
      // Determine category based on keywords
      let category = categories.company; // default
      
      for (const keyword of entry.keywords) {
        if (categoryMapping[keyword.toLowerCase()]) {
          category = categoryMapping[keyword.toLowerCase()];
          break;
        }
      }
      
      faqs.push({
        question,
        answer: entry.response,
        category,
      });
    }
  });
  
  return faqs;
}

/**
 * Gets frequently asked questions by category
 * @param category The category to filter by (optional)
 * @returns FAQs filtered by category, or all FAQs if no category is provided
 */
export function getFAQsByCategory(category?: string): FAQ[] {
  const allFAQs = extractFAQs();
  
  if (!category) {
    return allFAQs;
  }
  
  return allFAQs.filter((faq) => faq.category === category);
} 