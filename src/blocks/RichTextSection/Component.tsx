import React from 'react'
import type { RichTextSectionBlock as RichTextSectionProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'
import { typographyToClasses } from '@/utilities/typographyToClasses'

export const RichTextSectionBlock: React.FC<RichTextSectionProps> = ({
  title,
  body,
  maxWidth = 'prose',
  typography,
  appearance,
}) => {
  const maxWidthClasses = cn(
    maxWidth === 'prose' && 'max-w-prose',
    maxWidth === 'medium' && 'max-w-3xl',
    maxWidth === 'wide' && 'max-w-5xl',
    maxWidth === 'full' && 'max-w-full',
  )

  // Get text color class based on appearance settings
  const getTextColorClass = () => {
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

  const textColorClass = getTextColorClass()

  // Determine prose color variant
  const getProseColorClass = () => {
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

  return (
    <section className={blockAppearanceToClasses(appearance)}>
      <div className={getContainerClasses(appearance?.fullWidth)}>
        <div
          className={cn(
            maxWidthClasses,
            appearance?.alignment === 'center' && 'mx-auto',
            appearance?.alignment === 'right' && 'ml-auto',
            typographyToClasses(typography),
          )}
        >
          {title && (
            <h2 className={cn('text-h2 font-heading font-semibold mb-6', textColorClass)}>{title}</h2>
          )}

          {body && (
            <RichText
              data={body}
              enableGutter={false}
              className={cn(
                'prose max-w-none',
                getProseColorClass(),
                textColorClass,
              )}
            />
          )}
        </div>
      </div>
    </section>
  )
}
