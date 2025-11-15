import type { BlockAppearanceType } from '@/fields/blockAppearance'
import { cn } from '@/utilities/ui'

/**
 * Converts block appearance configuration to Tailwind CSS classes
 *
 * @param appearance - Block appearance configuration from Payload
 * @param additionalClasses - Additional classes to merge
 * @returns Combined class string
 */
export function blockAppearanceToClasses(
  appearance?: BlockAppearanceType['appearance'] | null,
  additionalClasses?: string,
): string {
  if (!appearance) {
    return cn(additionalClasses)
  }

  const classes: string[] = []

  // Background variant
  switch (appearance.backgroundVariant) {
    case 'light':
      classes.push('bg-sh-bg text-sh-text')
      break
    case 'brand':
      classes.push('bg-sh-primary text-sh-text-on-primary')
      break
    case 'dark':
      classes.push('bg-sh-bg-dark text-sh-text-on-dark')
      break
    case 'transparent':
      classes.push('bg-transparent')
      break
    default:
      classes.push('bg-sh-bg text-sh-text')
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
  switch (appearance.paddingTop) {
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
  switch (appearance.paddingBottom) {
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

  return cn(classes, additionalClasses)
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
