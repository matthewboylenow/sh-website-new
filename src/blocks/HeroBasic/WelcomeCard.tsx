import React from 'react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import type { Page } from '@/payload-types'

interface WelcomeCardProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  buttons?: {
    link: Page['hero']['links'][0]['link']
  }[]
  className?: string
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  eyebrow = 'WELCOME',
  title = "We're glad you're here.",
  subtitle,
  buttons,
  className,
}) => {
  return (
    <div
      className={cn(
        // Positioning - float at bottom with negative margin
        'relative -mb-16 md:-mb-20',
        // Container width
        'w-full px-6 md:px-0 md:w-[85%] lg:w-[70%] mx-auto',
        className,
      )}
    >
      <div
        className={cn(
          // Frosted glass effect
          'backdrop-blur-xl bg-white/10',
          'border border-white/25',
          'rounded-2xl shadow-2xl',
          // Padding and layout
          'p-6 md:p-8 lg:p-10',
          // Grid layout for desktop
          'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center',
        )}
      >
        {/* Left column: Welcome text */}
        <div className="text-center md:text-left">
          {eyebrow && (
            <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-sh-gold mb-3">
              {eyebrow}
            </p>
          )}
          {title && (
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-white mb-3">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-base md:text-lg text-white/90 leading-relaxed">{subtitle}</p>
          )}
        </div>

        {/* Right column: Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-col gap-3 md:gap-4 items-center md:items-end">
            {buttons.map(({ link }, index) => (
              <CMSLink key={index} {...link} size="lg" className="w-full md:w-auto" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
