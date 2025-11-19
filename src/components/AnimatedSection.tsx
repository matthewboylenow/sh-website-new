'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import type { AnimationSettingsType } from '@/fields/animationSettings'

interface AnimatedSectionProps extends AnimationSettingsType {
  children: React.ReactNode
  className?: string
}

/**
 * AnimatedSection Wrapper Component
 *
 * Wraps block content with Framer Motion entrance animations based on
 * the animation settings configured in the CMS.
 *
 * Animation Presets:
 * - fadeIn: opacity 0 → 1
 * - fadeUp: opacity 0, y: 24 → opacity 1, y: 0
 * - fadeInScale: opacity 0, scale 0.95 → opacity 1, scale 1
 *
 * @param animation - Animation settings from CMS
 * @param children - Block content to animate
 * @param className - Optional CSS classes to apply
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  animation,
  children,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: animation?.animateOnce ?? true,
    amount: 0.2, // Trigger when 20% of element is visible
  })

  // If no animation preset or 'none', render children without animation
  if (!animation?.animationPreset || animation.animationPreset === 'none') {
    return <>{children}</>
  }

  // Get animation settings with defaults
  const delay = (animation.animationDelay ?? 0) / 1000 // Convert ms to seconds
  const duration = (animation.animationDuration ?? 600) / 1000 // Convert ms to seconds

  // Define animation variants based on preset
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    fadeUp: {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0 },
    },
    fadeInScale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  }

  const selectedVariant = variants[animation.animationPreset as keyof typeof variants]

  if (!selectedVariant) {
    return <>{children}</>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
