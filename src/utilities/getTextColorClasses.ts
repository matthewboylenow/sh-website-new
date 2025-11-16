import type { Page } from '@/payload-types'

type BlockAppearance = NonNullable<Page['layout']>[0]['appearance']

/**
 * Get text color class based on appearance settings
 * Can be used for headings, body text, and other text elements
 */
export function getTextColorClass(appearance?: BlockAppearance): string {
  const textColorSetting = appearance?.textColor || 'auto'

  if (textColorSetting === 'auto') {
    // Auto-determine based on background
    switch (appearance?.backgroundVariant) {
      case 'brand':
      case 'dark':
        return 'text-sh-text-on-dark'
      case 'light':
      default:
        return 'text-sh-text-main'
    }
  } else {
    // Explicit override
    switch (textColorSetting) {
      case 'light':
        return 'text-sh-text-on-dark'
      case 'dark':
        return 'text-sh-text-main'
      case 'brand':
        return 'text-sh-primary'
      default:
        return 'text-sh-text-main'
    }
  }
}

/**
 * Get prose color class for rich text content
 * Returns 'prose-invert' for light text on dark backgrounds
 */
export function getProseColorClass(appearance?: BlockAppearance): string {
  const textColorSetting = appearance?.textColor || 'auto'

  if (textColorSetting === 'auto') {
    // Use prose-invert for dark backgrounds
    return (appearance?.backgroundVariant === 'dark' || appearance?.backgroundVariant === 'brand')
      ? 'prose-invert'
      : ''
  } else {
    // Explicit text color - use prose-invert for light text
    return textColorSetting === 'light' ? 'prose-invert' : ''
  }
}
