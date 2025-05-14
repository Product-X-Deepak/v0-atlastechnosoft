/**
 * API client configuration
 */

import { ApiResponse } from "@/types/api";

// API endpoint configuration
const API_BASE_URL = 'https://api.atlastechnosoft.com';
const API_TIMEOUT = 10000; // 10 seconds

/**
 * Generic fetch with error handling and timeout
 */
export async function fetchWithTimeout(
  url: string, 
  options: RequestInit = {}, 
  timeout = API_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const { signal } = controller;

  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { ...options, signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Base API client
 */
export const apiClient = {
  /**
   * Make a GET request
   */
  async get<T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = new URL(`${API_BASE_URL}${path}`);
    
    // Add query params if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    const response = await fetchWithTimeout(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      return {
        success: false,
        error: `Error ${response.status}: ${response.statusText}`,
      };
    }
    
    return await response.json();
  },
  
  /**
   * Make a POST request
   */
  async post<T, TData extends Record<string, unknown>>(path: string, data: TData): Promise<ApiResponse<T>> {
    const response = await fetchWithTimeout(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      return {
        success: false,
        error: `Error ${response.status}: ${response.statusText}`,
      };
    }
    
    return await response.json();
  },
  
  /**
   * Make a PUT request
   */
  async put<T, TData extends Record<string, unknown>>(path: string, data: TData): Promise<ApiResponse<T>> {
    const response = await fetchWithTimeout(`${API_BASE_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      return {
        success: false,
        error: `Error ${response.status}: ${response.statusText}`,
      };
    }
    
    return await response.json();
  },
  
  /**
   * Make a DELETE request
   */
  async delete<T>(path: string): Promise<ApiResponse<T>> {
    const response = await fetchWithTimeout(`${API_BASE_URL}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      return {
        success: false,
        error: `Error ${response.status}: ${response.statusText}`,
      };
    }
    
    return await response.json();
  },
}; 