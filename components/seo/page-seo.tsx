import { StructuredData } from "@/components/seo/structured-data"
import { generateBreadcrumbSchema } from "@/lib/seo"
import { Fragment } from "react"

// Schema.org types for different page types
type SchemaType = 
  | "WebPage" 
  | "AboutPage"
  | "ContactPage" 
  | "FAQPage" 
  | "BlogPosting" 
  | "Product" 
  | "Service" 
  | "ItemPage"
  | "CollectionPage";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface PageSEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  type?: SchemaType;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  breadcrumbs?: BreadcrumbItem[];
  schema?: Record<string, unknown>;
  keywords?: string[];
}

/**
 * Component that enhances page SEO with JSON-LD structured data and semantic HTML
 */
export function PageSEO({
  title: _title,
  description: _description,
  canonicalUrl,
  type = "WebPage",
  image = "/images/og-image.jpg",
  publishedTime,
  modifiedTime,
  breadcrumbs,
  schema,
  keywords,
}: PageSEOProps) {
  // Generate breadcrumb schema if breadcrumbs are provided
  const breadcrumbSchema = breadcrumbs ? generateBreadcrumbSchema(breadcrumbs) : null;
  
  // Create custom WebPage schema
  const webPageSchema = schema || {
    "@context": "https://schema.org",
    "@type": type,
    "headline": _title,
    "description": _description,
    "image": `https://www.atlastechnosoft.com${image}`,
    "url": `https://www.atlastechnosoft.com${canonicalUrl}`,
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "publisher": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.atlastechnosoft.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.atlastechnosoft.com${canonicalUrl}`
    }
  };

  return (
    <Fragment>
      {/* Canonical URL */}
      <link rel="canonical" href={`https://www.atlastechnosoft.com${canonicalUrl}`} />
      
      {/* Meta keywords */}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Core schema.org JSON-LD */}
      <StructuredData data={webPageSchema} />
      
      {/* Breadcrumb schema if available */}
      {breadcrumbSchema && <StructuredData data={breadcrumbSchema} />}
    </Fragment>
  );
}

/**
 * Specialized PageSEO component for blog posts
 */
export function BlogPostSEO({
  title,
  description,
  canonicalUrl,
  image,
  publishedTime,
  modifiedTime,
  author,
  tags,
  section = "Blog",
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  image: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags?: string[];
  section?: string;
}) {
  // Create Blog Post schema
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": `https://www.atlastechnosoft.com${image}`,
    "url": `https://www.atlastechnosoft.com${canonicalUrl}`,
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "author": {
      "@type": "Person",
      "name": author
    },
    "keywords": tags ? tags.join(', ') : undefined,
    "publisher": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.atlastechnosoft.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.atlastechnosoft.com${canonicalUrl}`
    },
    "articleSection": section
  };

  // Generate breadcrumbs for blog post
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: title, url: canonicalUrl },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <Fragment>
      {/* Canonical URL */}
      <link rel="canonical" href={`https://www.atlastechnosoft.com${canonicalUrl}`} />
      
      {/* Article metadata */}
      <meta property="article:published_time" content={publishedTime} />
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      <meta property="article:author" content={author} />
      {section && <meta property="article:section" content={section} />}
      
      {/* Tags */}
      {tags && tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* JSON-LD structured data */}
      <StructuredData data={blogPostSchema} />
      <StructuredData data={breadcrumbSchema} />
    </Fragment>
  );
}

/**
 * Specialized PageSEO component for product pages
 */
export function ProductSEO({
  title,
  description,
  canonicalUrl,
  image,
  price,
  currency = "INR",
  sku,
  brand = "Atlas Technosoft",
  availability = "https://schema.org/InStock",
  categoryBreadcrumbs,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  image: string;
  price?: string;
  currency?: string;
  sku?: string;
  brand?: string;
  availability?: string;
  categoryBreadcrumbs: BreadcrumbItem[];
}) {
  // Create Product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "image": `https://www.atlastechnosoft.com${image}`,
    "sku": sku,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    ...(price ? {
      "offers": {
        "@type": "Offer",
        "url": `https://www.atlastechnosoft.com${canonicalUrl}`,
        "priceCurrency": currency,
        "price": price,
        "availability": availability,
        "seller": {
          "@type": "Organization",
          "name": "Atlas Technosoft"
        }
      }
    } : {}),
  };

  // Combine with home page for complete breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "/" },
    ...categoryBreadcrumbs,
    { name: title, url: canonicalUrl },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <Fragment>
      {/* Canonical URL */}
      <link rel="canonical" href={`https://www.atlastechnosoft.com${canonicalUrl}`} />
      
      {/* Product metadata */}
      {price && (
        <>
          <meta property="product:price:amount" content={price} />
          <meta property="product:price:currency" content={currency} />
        </>
      )}
      
      {/* JSON-LD structured data */}
      <StructuredData data={productSchema} />
      <StructuredData data={breadcrumbSchema} />
    </Fragment>
  );
}

/**
 * Specialized PageSEO component for FAQ pages
 */
export function FaqSEO({
  title: _title,
  description: _description,
  canonicalUrl,
  faqs,
  breadcrumbs,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  faqs: Array<{ question: string; answer: string }>;
  breadcrumbs: BreadcrumbItem[];
}) {
  // Create FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Combine with home page for complete breadcrumbs
  const completeBreadcrumbs = [
    { name: "Home", url: "/" },
    ...breadcrumbs,
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(completeBreadcrumbs);

  return (
    <Fragment>
      {/* Canonical URL */}
      <link rel="canonical" href={`https://www.atlastechnosoft.com${canonicalUrl}`} />
      
      {/* JSON-LD structured data */}
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
    </Fragment>
  );
} 