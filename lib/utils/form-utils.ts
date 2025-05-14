"use client"

import type React from "react"

/**
 * Form Utilities
 *
 * Enhanced form utilities for Atlas Technosoft website
 */

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { isValidEmail, isValidPhone } from "./security-utils"

/**
 * Form field validation rules
 */
export type ValidationRule = {
  validate: (value: unknown, allValues?: Record<string, unknown>) => boolean
  message: string
}

export type ValidationRules = Record<string, ValidationRule[]>

/**
 * Form field validation result
 */
export type ValidationResult = {
  isValid: boolean
  errors: Record<string, string[]>
}

/**
 * Validate form fields against rules
 *
 * @param values Form field values
 * @param rules Validation rules
 * @returns Validation result
 */
export function validateForm(values: Record<string, unknown>, rules: ValidationRules): ValidationResult {
  const errors: Record<string, string[]> = {}
  let isValid = true

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = values[field]
    const fieldErrors: string[] = []

    fieldRules.forEach((rule) => {
      if (!rule.validate(value, values)) {
        fieldErrors.push(rule.message)
        isValid = false
      }
    })

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors
    }
  })

  return { isValid, errors }
}

/**
 * Common validation rules
 */
export const validationRules = {
  required: (message = "This field is required"): ValidationRule => ({
    validate: (value) => {
      if (value === undefined || value === null) return false
      if (typeof value === "string") return value.trim() !== ""
      if (Array.isArray(value)) return value.length > 0
      return true
    },
    message,
  }),

  email: (message = "Please enter a valid email address"): ValidationRule => ({
    validate: (value) => {
      if (!value) return true // Skip if empty (use required rule for this)
      return isValidEmail(String(value))
    },
    message,
  }),

  phone: (message = "Please enter a valid phone number"): ValidationRule => ({
    validate: (value) => {
      if (!value) return true // Skip if empty (use required rule for this)
      return isValidPhone(String(value))
    },
    message,
  }),

  minLength: (length: number, message = `Must be at least ${length} characters`): ValidationRule => ({
    validate: (value) => {
      if (!value) return true // Skip if empty (use required rule for this)
      return String(value).length >= length
    },
    message,
  }),

  maxLength: (length: number, message = `Must be no more than ${length} characters`): ValidationRule => ({
    validate: (value) => {
      if (!value) return true // Skip if empty
      return String(value).length <= length
    },
    message,
  }),

  pattern: (regex: RegExp, message = "Invalid format"): ValidationRule => ({
    validate: (value) => {
      if (!value) return true // Skip if empty
      return regex.test(String(value))
    },
    message,
  }),

  match: (fieldToMatch: string, message = "Fields do not match"): ValidationRule => ({
    validate: (value, allValues) => {
      if (!value) return true // Skip if empty
      return value === allValues?.[fieldToMatch]
    },
    message,
  }),

  number: (message = "Must be a number"): ValidationRule => ({
    validate: (value) => {
      if (!value && value !== 0) return true // Skip if empty
      return !isNaN(Number(value))
    },
    message,
  }),

  min: (min: number, message = `Must be at least ${min}`): ValidationRule => ({
    validate: (value) => {
      if (!value && value !== 0) return true // Skip if empty
      return Number(value) >= min
    },
    message,
  }),

  max: (max: number, message = `Must be no more than ${max}`): ValidationRule => ({
    validate: (value) => {
      if (!value && value !== 0) return true // Skip if empty
      return Number(value) <= max
    },
    message,
  }),
}

/**
 * Custom hook for form handling
 *
 * @param initialValues Initial form values
 * @param validationRules Validation rules
 * @param onSubmit Submit handler
 * @returns Form handling utilities
 */
export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validationRules: ValidationRules = {},
  onSubmit?: (values: T, isValid: boolean) => void,
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Reset form when initialValues change
  useEffect(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitted(false)
  }, [initialValues])

  // Validate field
  const validateField = (name: string, value: unknown) => {
    if (!validationRules[name]) return

    const fieldErrors: string[] = []
    validationRules[name].forEach((rule) => {
      if (!rule.validate(value, values)) {
        fieldErrors.push(rule.message)
      }
    })

    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors,
    }))

    return fieldErrors.length === 0
  }

  // Handle field change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value

    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }))

    if (touched[name]) {
      validateField(name, newValue)
    }
  }

  // Handle field blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    validateField(name, value)
  }

  // Set field value programmatically
  const setFieldValue = (name: string, value: unknown) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (touched[name]) {
      validateField(name, value)
    }
  }

  // Set field touched state programmatically
  const setFieldTouched = (name: string, isTouched = true) => {
    setTouched((prev) => ({
      ...prev,
      [name]: isTouched,
    }))

    if (isTouched) {
      validateField(name, values[name])
    }
  }

  // Validate all fields
  const validateAllFields = () => {
    const result = validateForm(values, validationRules)
    setErrors(result.errors)

    // Mark all fields as touched
    const newTouched: Record<string, boolean> = {}
    Object.keys(validationRules).forEach((key) => {
      newTouched[key] = true
    })
    setTouched(newTouched)

    return result.isValid
  }

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSubmitted(true)

    const isValid = validateAllFields()

    if (onSubmit) {
      onSubmit(values, isValid)
    }

    setIsSubmitting(false)
    return isValid
  }

  // Reset form
  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitted(false)
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
    validateField,
    validateAllFields,
  }
}

/**
 * Format form data for API submission
 */
export function formatFormData(formData: Record<string, unknown>): FormData {
  const data = new FormData()
  
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          data.append(`${key}[]`, String(item))
        })
      } else if (value instanceof File) {
        data.append(key, value)
      } else {
        data.append(key, String(value))
      }
    }
  })
  
  return data
}

/**
 * Serialize form data as URL-encoded string
 */
export function serializeFormData(formData: Record<string, unknown>): string {
  return Object.entries(formData)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${encodeURIComponent(key)}[]=${encodeURIComponent(String(item))}`).join('&')
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    })
    .join('&')
}

const formUtils = {
  validateForm,
  useForm,
  formatFormData,
  serializeFormData,
};

export default formUtils;
