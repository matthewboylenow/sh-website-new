'use client'

import React, { useState } from 'react'
import type { AlertBannerBlock as AlertBannerProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { DecorativePattern } from '@/components/DecorativePattern'

const iconMap = {
  megaphone: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
      />
    </svg>
  ),
  bell: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  ),
  exclamation: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  check: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
}

export const AlertBannerBlock: React.FC<AlertBannerProps> = ({
  message,
  type = 'info',
  linkLabel,
  linkUrl,
  dismissible = true,
  icon = 'auto',
  decorativePattern,
}) => {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) {
    return null
  }

  // Determine which icon to show
  let iconElement = null
  if (icon !== 'none') {
    if (icon === 'auto') {
      // Auto-select based on type
      if (type === 'info') iconElement = iconMap.bell
      if (type === 'warning') iconElement = iconMap.exclamation
      if (type === 'urgent') iconElement = iconMap.exclamation
      if (type === 'success') iconElement = iconMap.check
    } else {
      iconElement = iconMap[icon as keyof typeof iconMap]
    }
  }

  // Type-specific styling
  const typeClasses = cn(
    type === 'info' && 'bg-blue-50 text-blue-900 border-blue-200',
    type === 'warning' && 'bg-yellow-50 text-yellow-900 border-yellow-200',
    type === 'urgent' && 'bg-red-50 text-red-900 border-red-200',
    type === 'success' && 'bg-green-50 text-green-900 border-green-200',
  )

  const linkClasses = cn(
    'font-semibold underline hover:no-underline ml-1',
    type === 'info' && 'text-blue-700',
    type === 'warning' && 'text-yellow-700',
    type === 'urgent' && 'text-red-700',
    type === 'success' && 'text-green-700',
  )

  return (
    <div className={cn('relative overflow-hidden border-l-4 p-4', typeClasses)} role="alert">
      {/* Decorative Pattern */}
      {decorativePattern?.enabled && (
        <DecorativePattern
          type={decorativePattern.type || 'text'}
          text={decorativePattern.text || undefined}
          opacity={decorativePattern.opacity || undefined}
          size={decorativePattern.size || undefined}
          repeatCount={decorativePattern.repeatCount || undefined}
          color={decorativePattern.color || undefined}
          position={decorativePattern.position || undefined}
          rotation={decorativePattern.rotation || undefined}
        />
      )}

      <div className="relative z-10 flex items-start gap-3">
        {/* Icon */}
        {iconElement && <div className="flex-shrink-0 mt-0.5">{iconElement}</div>}

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed">
            {message}
            {linkLabel && linkUrl && (
              <a href={linkUrl} className={linkClasses}>
                {linkLabel}
              </a>
            )}
          </p>
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="flex-shrink-0 ml-2 -mr-1 -mt-1 p-1 rounded hover:bg-black/10 transition-colors"
            aria-label="Dismiss alert"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
