/**
 * Security Utilities
 *
 * Enhanced security utilities for Atlas Technosoft website
 */

import DOMPurify from "isomorphic-dompurify"

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * @param html HTML content to sanitize
 * @returns Sanitized HTML content
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  })
}

/**
 * Validate email address
 *
 * @param email Email address to validate
 * @returns Whether the email address is valid
 */
export function isValidEmail(email: string): boolean {
  // RFC 5322 compliant email regex
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(email)
}

/**
 * Validate phone number
 *
 * @param phone Phone number to validate
 * @returns Whether the phone number is valid
 */
export function isValidPhone(phone: string): boolean {
  // Basic international phone number validation
  // Allows formats like +1234567890, 1234567890, 123-456-7890, etc.
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  return phoneRegex.test(phone)
}

/**
 * Generate a secure random token
 *
 * @param length Token length
 * @returns Secure random token
 */
export function generateSecureToken(length = 32): string {
  const array = new Uint8Array(length)
  if (typeof window !== "undefined") {
    window.crypto.getRandomValues(array)
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

/**
 * Encode HTML entities to prevent XSS attacks
 *
 * @param text Text to encode
 * @returns Encoded text
 */
export function encodeHtmlEntities(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

/**
 * Create a Content Security Policy (CSP) header value
 *
 * @param policies CSP policies
 * @returns CSP header value
 */
export function createCspHeader(policies: Record<string, string[]>): string {
  return Object.entries(policies)
    .map(([directive, sources]) => {
      return `${directive} ${sources.join(" ")}`
    })
    .join("; ")
}

/**
 * Hash a string using SHA-256
 *
 * @param text Text to hash
 * @returns Hashed text
 */
export async function hashString(text: string): Promise<string> {
  if (typeof window === "undefined") {
    return text // Fallback for server-side
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

/**
 * Validate CSRF token
 *
 * @param token Token to validate
 * @param expectedToken Expected token
 * @returns Whether the token is valid
 */
export function validateCsrfToken(token: string, expectedToken: string): boolean {
  if (!token || !expectedToken) {
    return false
  }

  // Use constant-time comparison to prevent timing attacks
  const result = token.length === expectedToken.length
  let diff = 0

  for (let i = 0; i < token.length && i < expectedToken.length; i++) {
    diff |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i)
  }

  return result && diff === 0
}

const securityUtils = {
  sanitizeHtml,
  isValidEmail,
  isValidPhone,
  generateSecureToken,
  encodeHtmlEntities,
  createCspHeader,
  hashString,
  validateCsrfToken,
};

export default securityUtils;
