/**
 * Common type definitions used throughout the application
 */

import type { ReactNode } from 'react';

// React children type
export type ReactChildren = ReactNode;

// Common props for all components
export interface BaseComponentProps {
  className?: string;
  id?: string;
}

// Navigation item type
export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  external?: boolean;
  children?: NavigationItem[];
}

// SEO metadata type
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// Form field type
export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: string }[];
  validation?: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  };
} 