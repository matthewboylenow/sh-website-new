import type { VisibilitySettingsType, VisibilityAudience } from '@/fields/visibilitySettings'

/**
 * Context for determining block visibility
 */
export interface VisibilityContext {
  /** Current user audience type - defaults to 'visitor' until auth is implemented */
  audience?: 'visitor' | 'parishioner'
  /** Current date for seasonal display checks */
  now?: Date
}

/**
 * Determines if a block should be rendered based on visibility settings
 *
 * Note: Device visibility is handled separately via CSS classes (getDeviceVisibilityClasses)
 * because SSR cannot reliably detect device type. This function handles:
 * - Audience targeting (visitor vs parishioner)
 * - Seasonal/date-based display
 *
 * @param visibility - The block's visibility settings from CMS
 * @param context - Runtime context (audience, current date)
 * @returns true if the block should be rendered, false if it should be hidden
 *
 * @example
 * ```tsx
 * if (!shouldRenderBlock(block.visibility, { audience: 'visitor', now: new Date() })) {
 *   return null
 * }
 * ```
 */
export function shouldRenderBlock(
  visibility: VisibilitySettingsType['visibility'] | null | undefined,
  context: VisibilityContext = {},
): boolean {
  // If no visibility settings, always show
  if (!visibility) {
    return true
  }

  const { audience: currentAudience = 'visitor', now = new Date() } = context

  // Check audience targeting
  const targetAudience = visibility.audience as VisibilityAudience | null | undefined
  if (targetAudience && targetAudience !== 'all') {
    if (targetAudience === 'visitors' && currentAudience === 'parishioner') {
      return false
    }
    if (targetAudience === 'parishioners' && currentAudience === 'visitor') {
      return false
    }
  }

  // Check seasonal display (date range)
  const startDate = visibility.startDate
  const endDate = visibility.endDate

  if (startDate) {
    const start = new Date(startDate)
    if (now < start) {
      return false
    }
  }

  if (endDate) {
    const end = new Date(endDate)
    // Set end date to end of day
    end.setHours(23, 59, 59, 999)
    if (now > end) {
      return false
    }
  }

  return true
}

/**
 * Returns CSS classes for device-based visibility
 *
 * Since SSR cannot detect device type, we use CSS media query classes
 * to show/hide blocks based on viewport width.
 *
 * Tailwind breakpoints:
 * - Mobile: < 768px (md breakpoint)
 * - Tablet: 768px - 1024px (md to lg)
 * - Desktop: >= 1024px (lg breakpoint)
 *
 * @param visibility - The block's visibility settings from CMS
 * @returns CSS class string for device visibility
 *
 * @example
 * ```tsx
 * <div className={cn('relative', getDeviceVisibilityClasses(visibility))}>
 *   {children}
 * </div>
 * ```
 */
export function getDeviceVisibilityClasses(
  visibility: VisibilitySettingsType['visibility'] | null | undefined,
): string {
  if (!visibility) {
    return ''
  }

  const classes: string[] = []

  // Default to true if not explicitly set
  const showOnMobile = visibility.showOnMobile !== false
  const showOnTablet = visibility.showOnTablet !== false
  const showOnDesktop = visibility.showOnDesktop !== false

  // Hide on mobile (< 768px)
  if (!showOnMobile) {
    classes.push('hidden md:block')
  }

  // Hide on tablet (768px - 1024px)
  // This is tricky - we need to show on mobile, hide on tablet, show on desktop
  if (!showOnTablet && showOnMobile && showOnDesktop) {
    // Show below md, hide md-lg, show lg+
    classes.push('md:hidden lg:block')
  } else if (!showOnTablet && !showOnMobile && showOnDesktop) {
    // Hidden until lg
    classes.push('hidden lg:block')
  } else if (!showOnTablet && showOnMobile && !showOnDesktop) {
    // Show only on mobile
    classes.push('md:hidden')
  }

  // Hide on desktop (>= 1024px)
  if (!showOnDesktop && (showOnMobile || showOnTablet)) {
    classes.push('lg:hidden')
  }

  // All hidden - add hidden class
  if (!showOnMobile && !showOnTablet && !showOnDesktop) {
    classes.push('hidden')
  }

  return classes.join(' ')
}
