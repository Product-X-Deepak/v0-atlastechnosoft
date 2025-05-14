/**
 * API-related type definitions
 */

// Contact form data type
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  acceptTerms: boolean;
}

// API response type
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Pagination parameters
export interface PaginationParams {
  page: number;
  limit: number;
  totalPages?: number;
  totalItems?: number;
}

// API error
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Authentication types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
} 