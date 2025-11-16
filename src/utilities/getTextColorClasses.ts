import type { BlockAppearanceType } from '@/fields/blockAppearance'

type BlockAppearance = BlockAppearanceType['appearance']

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
      case 'black':
        return 'text-black'
      case 'brand':
        return 'text-sh-primary'
      default:
        return 'text-sh-text-main'
    }
  }
}

/**
 * Determines if the background is dark based on appearance settings
 * Returns true for dark or brand backgrounds
 */
export function isDarkBackground(appearance?: BlockAppearance): boolean {
  const textColorSetting = appearance?.textColor || 'auto'

  if (textColorSetting === 'auto') {
    // Auto-determine based on background variant
    return appearance?.backgroundVariant === 'dark' || appearance?.backgroundVariant === 'brand'
  } else {
    // If text color is explicitly set to light, background is considered dark
    return textColorSetting === 'light'
  }
}

/**
 * Get prose color class for rich text content
 * Returns 'prose-invert' for light text on dark backgrounds
 */
export function getProseColorClass(appearance?: BlockAppearance): string {
  return isDarkBackground(appearance) ? 'prose-invert' : ''
}
