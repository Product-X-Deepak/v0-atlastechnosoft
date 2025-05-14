import { StructuredData } from "@/components/seo/structured-data"
import {  generateArticleSchema as _generateArticleSchema } from "@/lib/seo"

interface ArticleSchemaProps {
  title: string
  description: string
  slug: string
  imageUrl: string
  datePublished: string
  dateModified: string
  authorName: string
  authorUrl?: string
  category?: string
  tags?: string[]
}

export function ArticleSchema({
  title,
  description,
  slug,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  category,
  tags = [],
}: ArticleSchemaProps) {
  // Generate the full URL for the article
  const articleUrl = `/blog/${slug}`

  // Generate breadcrumb items for article
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]

  // Add category if provided
  if (category) {
    breadcrumbItems.push({ name: category, url: `/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}` })
  }

  // Add the current article
  breadcrumbItems.push({ name: title, url: articleUrl })

  // Create the article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": `https://www.atlastechnosoft.com${imageUrl}`,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": authorUrl ? `https://www.atlastechnosoft.com${authorUrl}` : undefined
    },
    "publisher": {
      "@type": "Organization",
      "name": "Atlas Technosoft",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.atlastechnosoft.com/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.atlastechnosoft.com${articleUrl}`
    },
    "keywords": tags.join(", ")
  }

  // Create breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.atlastechnosoft.com${item.url}`
    }))
  }

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
    </>
  )
} 