/**
 * Accessibility Utilities
 *
 * Enhanced accessibility utilities for Atlas Technosoft website
 */

/**
 * Check if element is focusable
 *
 * @param element DOM element to check
 * @returns Boolean indicating if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (!element) return false

  // Check for elements that can be disabled
  if (
    element instanceof HTMLButtonElement ||
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  ) {
    return !element.disabled
  }

  // Special handling for anchor elements
  if (element instanceof HTMLAnchorElement) {
    return element.href !== undefined && element.href !== ''
  }

  // Special handling for area elements
  if (element instanceof HTMLAreaElement) {
    return element.href !== undefined && element.href !== ''
  }

  // Check for tabindex attribute
  const tabIndex = element.getAttribute("tabindex")
  if (tabIndex !== null && tabIndex !== undefined) {
    return Number.parseInt(tabIndex) >= 0
  }

  return false
}

/**
 * Get all focusable elements within a container
 *
 * @param container Container element
 * @returns Array of focusable elements
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  if (!container) return []

  const focusableSelectors = [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    'area[href]:not([tabindex="-1"])',
    'iframe:not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
    '[contentEditable=true]:not([tabindex="-1"])',
  ]

  const elements = Array.from(container.querySelectorAll(focusableSelectors.join(","))) as HTMLElement[]
  return elements.filter((element) => {
    // Filter out hidden elements
    return (
      element.offsetWidth > 0 && element.offsetHeight > 0 && window.getComputedStyle(element).visibility !== "hidden"
    )
  })
}

/**
 * Trap focus within a container
 *
 * @param container Container element
 * @returns Cleanup function
 */
export function trapFocus(container: HTMLElement): () => void {
  if (!container || typeof window === "undefined") return () => {}

  const focusableElements = getFocusableElements(container)
  if (focusableElements.length === 0) return () => {}

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  // Focus the first element
  firstElement.focus()

  // Handle keydown events
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return

    // Shift + Tab
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    }
    // Tab
    else {
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  // Add event listener
  document.addEventListener("keydown", handleKeyDown)

  // Return cleanup function
  return () => {
    document.removeEventListener("keydown", handleKeyDown)
  }
}

/**
 * Check if reduced motion is preferred
 *
 * @returns Boolean indicating if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Check if high contrast mode is active
 *
 * @returns Boolean indicating if high contrast mode is active
 */
export function prefersHighContrast(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(forced-colors: active)").matches
}

/**
 * Announce message to screen readers
 *
 * @param message Message to announce
 * @param politeness Politeness level (assertive or polite)
 */
export function announceToScreenReader(message: string, politeness: "assertive" | "polite" = "polite"): void {
  if (typeof window === "undefined") return

  // Create or get existing live region
  let liveRegion = document.getElementById(`sr-live-region-${politeness}`)

  if (!liveRegion) {
    liveRegion = document.createElement("div")
    liveRegion.id = `sr-live-region-${politeness}`
    liveRegion.setAttribute("aria-live", politeness)
    liveRegion.setAttribute("role", "status")
    liveRegion.setAttribute("aria-relevant", "additions")

    // Hide visually but keep available to screen readers
    Object.assign(liveRegion.style, {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      border: "0",
    })

    document.body.appendChild(liveRegion)
  }

  // Update the content to trigger announcement
  liveRegion.textContent = ""

  // Use setTimeout to ensure the DOM update is processed
  setTimeout(() => {
    liveRegion!.textContent = message
  }, 50)
}

/**
 * Check contrast ratio between two colors
 *
 * @param foreground Foreground color (hex)
 * @param background Background color (hex)
 * @returns Contrast ratio
 */
export function getContrastRatio(foreground: string, background: string): number {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex)

    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  // Calculate relative luminance
  const getLuminance = (color: { r: number; g: number; b: number }) => {
    const { r, g, b } = color
    const a = [r, g, b].map((v) => {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  const foregroundRgb = hexToRgb(foreground)
  const backgroundRgb = hexToRgb(background)

  const foregroundLuminance = getLuminance(foregroundRgb)
  const backgroundLuminance = getLuminance(backgroundRgb)

  const ratio =
    foregroundLuminance > backgroundLuminance
      ? (foregroundLuminance + 0.05) / (backgroundLuminance + 0.05)
      : (backgroundLuminance + 0.05) / (foregroundLuminance + 0.05)

  return Number.parseFloat(ratio.toFixed(2))
}

/**
 * Check if contrast ratio meets WCAG standards
 *
 * @param ratio Contrast ratio
 * @param level WCAG level (AA or AAA)
 * @param isLargeText Whether the text is large
 * @returns Boolean indicating if contrast meets standards
 */
export function meetsContrastStandards(ratio: number, level: "AA" | "AAA" = "AA", isLargeText = false): boolean {
  if (level === "AA") {
    return isLargeText ? ratio >= 3 : ratio >= 4.5
  } else {
    return isLargeText ? ratio >= 4.5 : ratio >= 7
  }
}

const accessibilityUtils = {
  isFocusable,
  getFocusableElements,
  trapFocus,
  prefersReducedMotion,
  prefersHighContrast,
  announceToScreenReader,
  getContrastRatio,
  meetsContrastStandards,
};

export default accessibilityUtils;
