/**
 * Utility functions for validating and debugging schema.org structured data
 * This helps ensure our SEO structured data is correctly formatted
 */

/**
 * Basic validation for JSON-LD schema
 * Checks for common errors and issues with structured data
 */
export function validateSchema(data: Record<string, unknown>): { 
  valid: boolean; 
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check if data exists
  if (!data) {
    errors.push('Schema data is empty or undefined');
    return { valid: false, errors };
  }
  
  // Check if it's an object
  if (typeof data !== 'object') {
    errors.push(`Schema data must be an object, received ${typeof data}`);
    return { valid: false, errors };
  }
  
  // Check for required @context
  if (!data['@context']) {
    errors.push('Missing required @context property');
  } else if (data['@context'] !== 'https://schema.org' && data['@context'] !== 'http://schema.org') {
    errors.push(`Invalid @context value: ${data['@context']}. Should be https://schema.org or http://schema.org`);
  }
  
  // Check for required @type
  if (!data['@type']) {
    errors.push('Missing required @type property');
  }
  
  // Perform type-specific validation
  if (data['@type']) {
    switch (data['@type']) {
      case 'WebPage':
      case 'AboutPage':
      case 'ContactPage':
        validateWebPage(data, errors);
        break;
      case 'Product':
        validateProduct(data, errors);
        break;
      case 'Service':
        validateService(data, errors);
        break;
      case 'FAQPage':
        validateFAQPage(data, errors);
        break;
      case 'BlogPosting':
        validateBlogPosting(data, errors);
        break;
      case 'BreadcrumbList':
        validateBreadcrumbList(data, errors);
        break;
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Extracts and validates all JSON-LD schema objects on the current page
 * This is used by the SEO debugger to test schema.org implementations
 */
export async function validateAllSchemaInPage(): Promise<{ 
  valid: boolean; 
  results: Array<{
    valid: boolean;
    data: Record<string, unknown>;
    errors?: string[];
  }>
}> {
  // Make sure we're on the client-side
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('This function can only be called on the client side');
  }

  // Find all script tags with type="application/ld+json"
  const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
  
  if (schemaScripts.length === 0) {
    return {
      valid: false,
      results: [{
        valid: false,
        data: {},
        errors: ['No structured data found on page']
      }]
    };
  }

  // Parse and validate each schema
  const results = Array.from(schemaScripts).map(script => {
    try {
      // Parse the JSON content
      const data = JSON.parse(script.textContent || '{}') as Record<string, unknown>;
      
      // Validate the schema
      const validation = validateSchema(data);
      
      return {
        valid: validation.valid,
        data,
        errors: validation.errors.length > 0 ? validation.errors : undefined
      };
    } catch (error) {
      return {
        valid: false,
        data: {},
        errors: [(error instanceof Error) ? error.message : 'Invalid JSON in schema']
      };
    }
  });

  // Check if all schemas are valid
  const allValid = results.every(result => result.valid);

  return {
    valid: allValid,
    results
  };
}

/**
 * Validate WebPage and its subtypes
 */
function validateWebPage(data: Record<string, unknown>, errors: string[]) {
  // Check for recommended properties
  if (!data.name && !data.headline) {
    errors.push('WebPage should have a name or headline property');
  }
  
  if (!data.description) {
    errors.push('WebPage should have a description property');
  }
  
  if (!data.url) {
    errors.push('WebPage should have a url property');
  }
}

/**
 * Validate Product schema
 */
function validateProduct(data: Record<string, unknown>, errors: string[]) {
  // Check for required properties
  if (!data.name) {
    errors.push('Product must have a name property');
  }
  
  // Check offers if present
  if (data.offers) {
    if (Array.isArray(data.offers)) {
      data.offers.forEach((offer: any, index: number) => {
        validateOffer(offer, `offers[${index}]`, errors);
      });
    } else {
      validateOffer(data.offers, 'offers', errors);
    }
  }
}

/**
 * Validate Service schema
 */
function validateService(data: Record<string, unknown>, errors: string[]) {
  // Check for recommended properties
  if (!data.name) {
    errors.push('Service should have a name property');
  }
  
  if (!data.description) {
    errors.push('Service should have a description property');
  }
  
  // Check for provider
  if (data.provider && typeof data.provider === 'object') {
    const provider = data.provider as Record<string, unknown>;
    if (!provider['@type']) {
      errors.push('Service provider should have an @type property');
    }
  }
}

/**
 * Validate FAQPage schema
 */
function validateFAQPage(data: Record<string, unknown>, errors: string[]) {
  // Check for required mainEntity property
  if (!data.mainEntity) {
    errors.push('FAQPage must have a mainEntity property');
    return;
  }
  
  // Check if mainEntity is an array
  if (!Array.isArray(data.mainEntity)) {
    errors.push('FAQPage mainEntity must be an array');
    return;
  }
  
  // Check each question
  data.mainEntity.forEach((item: unknown, index: number) => {
    const typedItem = item as Record<string, unknown>;
    
    if (!typedItem['@type'] || typedItem['@type'] !== 'Question') {
      errors.push(`FAQPage mainEntity[${index}] must have @type "Question"`);
    }
    
    if (!typedItem.name) {
      errors.push(`FAQPage mainEntity[${index}] must have a name property (question text)`);
    }
    
    if (!typedItem.acceptedAnswer) {
      errors.push(`FAQPage mainEntity[${index}] must have an acceptedAnswer property`);
    } else {
      const answer = typedItem.acceptedAnswer as Record<string, unknown>;
      
      if (!answer['@type'] || answer['@type'] !== 'Answer') {
        errors.push(`FAQPage mainEntity[${index}].acceptedAnswer must have @type "Answer"`);
      } else if (!answer.text) {
        errors.push(`FAQPage mainEntity[${index}].acceptedAnswer must have a text property`);
      }
    }
  });
}

/**
 * Validate BlogPosting schema
 */
function validateBlogPosting(data: Record<string, unknown>, errors: string[]) {
  // Check for recommended properties
  if (!data.headline) {
    errors.push('BlogPosting should have a headline property');
  }
  
  if (!data.datePublished) {
    errors.push('BlogPosting should have a datePublished property');
  }
  
  if (!data.author) {
    errors.push('BlogPosting should have an author property');
  } else if (typeof data.author === 'object') {
    const author = data.author as Record<string, unknown>;
    if (!author.name) {
      errors.push('BlogPosting author should have a name property');
    }
  }
}

/**
 * Validate BreadcrumbList schema
 */
function validateBreadcrumbList(data: Record<string, unknown>, errors: string[]) {
  // Check for required itemListElement property
  if (!data.itemListElement) {
    errors.push('BreadcrumbList must have an itemListElement property');
    return;
  }
  
  // Check if itemListElement is an array
  if (!Array.isArray(data.itemListElement)) {
    errors.push('BreadcrumbList itemListElement must be an array');
    return;
  }
  
  // Check each list item
  data.itemListElement.forEach((item: unknown, index: number) => {
    const typedItem = item as Record<string, unknown>;
    
    if (!typedItem['@type'] || typedItem['@type'] !== 'ListItem') {
      errors.push(`BreadcrumbList itemListElement[${index}] must have @type "ListItem"`);
    }
    
    if (typedItem.position === undefined) {
      errors.push(`BreadcrumbList itemListElement[${index}] must have a position property`);
    }
    
    if (!typedItem.item && !typedItem.name) {
      errors.push(`BreadcrumbList itemListElement[${index}] must have either an item or name property`);
    }
    
    if (typedItem.item && typeof typedItem.item === 'object') {
      const nestedItem = typedItem.item as Record<string, unknown>;
      
      if (!nestedItem.name) {
        errors.push(`BreadcrumbList itemListElement[${index}].item should have a name property`);
      }
      
      if (!nestedItem['@id'] && !nestedItem.url) {
        errors.push(`BreadcrumbList itemListElement[${index}].item should have either an @id or url property`);
      }
    }
  });
}

/**
 * Validate Offer schema
 */
function validateOffer(offer: unknown, path: string, errors: string[]) {
  if (!offer) return;
  
  const offerObj = offer as Record<string, unknown>;
  
  // Check for @type
  if (!offerObj['@type'] || offerObj['@type'] !== 'Offer') {
    errors.push(`${path} should have @type "Offer"`);
  }
  
  // Check for price and priceCurrency
  if (offerObj.price === undefined) {
    errors.push(`${path} should have a price property`);
  }
  
  if (offerObj.priceCurrency === undefined && offerObj.price !== undefined) {
    errors.push(`${path} should have a priceCurrency property when price is specified`);
  }
}