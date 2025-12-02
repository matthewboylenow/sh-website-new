'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { AnimatedSection } from '@/components/AnimatedSection'
import {
  getBlockAppearance,
  getContainerClasses,
} from '@/utilities/blockAppearanceToClasses'
import {
  shouldRenderBlock,
  getDeviceVisibilityClasses,
  type VisibilityContext,
} from '@/utilities/shouldRenderBlock'
import type { BlockAppearanceType } from '@/fields/blockAppearance'
import type { AnimationSettingsType } from '@/fields/animationSettings'
import type { VisibilitySettingsType } from '@/fields/visibilitySettings'

export interface SectionWrapperProps {
  /** Block appearance settings from CMS */
  appearance?: BlockAppearanceType['appearance'] | null
  /** Animation settings from CMS */
  animation?: AnimationSettingsType['animation'] | null
  /** Visibility settings from CMS */
  visibility?: VisibilitySettingsType['visibility'] | null
  /** Additional classes to apply to the outer section */
  className?: string
  /** Additional classes to apply to the inner container */
  containerClassName?: string
  /** Override fullWidth setting */
  fullWidth?: boolean
  /** Element to render as (default: section) */
  as?: 'section' | 'div' | 'article' | 'aside'
  /** Children to render inside the wrapper */
  children: React.ReactNode
  /** Visibility context for audience/date filtering */
  visibilityContext?: VisibilityContext
  /** ID for the section (useful for anchor links) */
  id?: string
}

/**
 * SectionWrapper Component
 *
 * A centralized wrapper for block components that provides:
 * - Block appearance styling (background, padding, alignment)
 * - Animation wrapper (via AnimatedSection)
 * - Visibility filtering (audience, device, seasonal)
 * - Container width management
 *
 * This component standardizes how all blocks handle their wrapper,
 * reducing duplication and ensuring consistency across the page builder.
 *
 * @example Basic usage
 * ```tsx
 * <SectionWrapper
 *   appearance={appearance}
 *   animation={animation}
 *   visibility={visibility}
 * >
 *   <h2>Block Title</h2>
 *   <p>Block content...</p>
 * </SectionWrapper>
 * ```
 *
 * @example With overrides
 * ```tsx
 * <SectionWrapper
 *   appearance={appearance}
 *   animation={animation}
 *   visibility={visibility}
 *   fullWidth={true}
 *   className="overflow-hidden"
 *   containerClassName="py-8"
 * >
 *   {children}
 * </SectionWrapper>
 * ```
 */
export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  appearance,
  animation,
  visibility,
  className,
  containerClassName,
  fullWidth,
  as: Element = 'section',
  children,
  visibilityContext,
  id,
}) => {
  // Check if block should be rendered based on audience/date
  if (!shouldRenderBlock(visibility, visibilityContext)) {
    return null
  }

  // Get appearance classes and styles
  const { className: appearanceClasses, style } = getBlockAppearance(appearance)

  // Determine fullWidth setting
  const isFullWidth = fullWidth ?? appearance?.fullWidth ?? false

  // Get container classes
  const containerClasses = getContainerClasses(isFullWidth, containerClassName)

  // Get device visibility classes
  const deviceClasses = getDeviceVisibilityClasses(visibility)

  // Build the section content
  const sectionContent = (
    <Element
      id={id}
      className={cn(
        appearanceClasses,
        deviceClasses,
        'relative overflow-hidden',
        className,
      )}
      style={style}
    >
      <div className={containerClasses}>{children}</div>
    </Element>
  )

  // Wrap with animation if animation settings exist
  if (animation?.preset && animation.preset !== 'none') {
    return <AnimatedSection animation={animation}>{sectionContent}</AnimatedSection>
  }

  return sectionContent
}

/**
 * Helper type for blocks using SectionWrapper
 * Use this to extend your block props
 */
export interface WithSectionWrapperProps {
  appearance?: BlockAppearanceType['appearance'] | null
  animation?: AnimationSettingsType['animation'] | null
  visibility?: VisibilitySettingsType['visibility'] | null
}
