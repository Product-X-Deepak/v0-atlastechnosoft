import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Results | Atlas Technosoft",
  description: "Search results for your query on Atlas Technosoft website",
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 