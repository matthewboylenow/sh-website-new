import type { BlockAppearanceType } from '@/fields/blockAppearance'
import { cn } from '@/utilities/ui'

/**
 * Returns both classes and inline styles for block appearance
 * Use this when you need custom background colors (which require inline styles)
 *
 * @param appearance - Block appearance configuration from Payload
 * @param additionalClasses - Additional classes to merge
 * @returns Object with className and style properties
 */
export function getBlockAppearance(
  appearance?: BlockAppearanceType['appearance'] | null,
  additionalClasses?: string,
): { className: string; style?: React.CSSProperties } {
  const classes: string[] = []
  const style: React.CSSProperties = {}

  if (!appearance) {
    return { className: cn(additionalClasses) }
  }

  // Background variant
  switch (appearance.bgVariant) {
    case 'light':
      classes.push('bg-sh-bg')
      break
    case 'brand':
      classes.push('bg-sh-primary')
      break
    case 'dark':
      classes.push('bg-sh-bg-dark')
      break
    case 'transparent':
      classes.push('bg-transparent')
      break
    case 'custom':
      if (appearance.customBgColor) {
        style.backgroundColor = appearance.customBgColor
      }
      break
    default:
      classes.push('bg-sh-bg')
  }

  // Text color handling...
  const textColorSetting = appearance.textColor || 'auto'

  if (textColorSetting === 'auto') {
    // Auto-determine text color based on background
    switch (appearance.bgVariant) {
      case 'light':
        classes.push('text-sh-text-main')
        break
      case 'brand':
      case 'dark':
        classes.push('text-sh-text-on-dark')
        break
      case 'custom':
        // For custom colors, try to auto-detect if it's light or dark
        // Default to dark text unless explicitly set
        classes.push('text-sh-text-main')
        break
      case 'transparent':
        // Don't add text color for transparent
        break
      default:
        classes.push('text-sh-text-main')
    }
  } else {
    // Explicit text color override
    switch (textColorSetting) {
      case 'light':
        classes.push('text-sh-text-on-dark')
        break
      case 'dark':
        classes.push('text-sh-text-main')
        break
      case 'black':
        classes.push('text-black')
        break
      case 'brand':
        classes.push('text-sh-primary')
        break
    }
  }

  // Alignment
  switch (appearance.alignment) {
    case 'left':
      classes.push('text-left')
      break
    case 'center':
      classes.push('text-center')
      break
    case 'right':
      classes.push('text-right')
      break
  }

  // Padding top
  switch (appearance.pt) {
    case 'none':
      classes.push('pt-0')
      break
    case 'tight':
      classes.push('pt-8 md:pt-12')
      break
    case 'default':
      classes.push('pt-section-mobile md:pt-section-desktop')
      break
    case 'loose':
      classes.push('pt-16 md:pt-24')
      break
  }

  // Padding bottom
  switch (appearance.pb) {
    case 'none':
      classes.push('pb-0')
      break
    case 'tight':
      classes.push('pb-8 md:pb-12')
      break
    case 'default':
      classes.push('pb-section-mobile md:pb-section-desktop')
      break
    case 'loose':
      classes.push('pb-16 md:pb-24')
      break
  }

  return {
    className: cn(classes, additionalClasses),
    ...(Object.keys(style).length > 0 && { style }),
  }
}

/**
 * Converts block appearance configuration to Tailwind CSS classes
 * @deprecated Use getBlockAppearance() for better custom color support
 *
 * @param appearance - Block appearance configuration from Payload
 * @param additionalClasses - Additional classes to merge
 * @returns Combined class string
 */
export function blockAppearanceToClasses(
  appearance?: BlockAppearanceType['appearance'] | null,
  additionalClasses?: string,
): string {
  return getBlockAppearance(appearance, additionalClasses).className
}

/**
 * Returns container classes based on fullWidth setting
 *
 * @param fullWidth - Whether block should be full width
 * @param additionalClasses - Additional classes to merge
 * @returns Container class string
 */
export function getContainerClasses(
  fullWidth?: boolean | null,
  additionalClasses?: string,
): string {
  if (fullWidth) {
    return cn('w-full', additionalClasses)
  }
  return cn('container mx-auto', additionalClasses)
}

/**
 * Complete wrapper classes for a block including both appearance and container
 *
 * @param appearance - Block appearance configuration
 * @param additionalClasses - Additional classes to merge
 * @returns Combined wrapper class string
 */
export function getBlockWrapperClasses(
  appearance?: BlockAppearanceType['appearance'] | null,
  additionalClasses?: string,
): string {
  return blockAppearanceToClasses(appearance, additionalClasses)
}
