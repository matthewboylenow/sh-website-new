import React from 'react'
import type { RichTextSectionBlock as RichTextSectionProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'
import { typographyToClasses } from '@/utilities/typographyToClasses'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'
import { DecorativePattern } from '@/components/DecorativePattern'

export const RichTextSectionBlock: React.FC<RichTextSectionProps> = ({
  title,
  body,
  maxWidth = 'prose',
  typography,
  appearance,
  decorPattern,
}) => {
  const maxWidthClasses = cn(
    maxWidth === 'prose' && 'max-w-prose',
    maxWidth === 'medium' && 'max-w-3xl',
    maxWidth === 'wide' && 'max-w-5xl',
    maxWidth === 'full' && 'max-w-full',
  )

  const textColorClass = getTextColorClass(appearance)
  const proseColorClass = getProseColorClass(appearance)

  return (
    <section className={cn(blockAppearanceToClasses(appearance), 'relative overflow-hidden')}>
      {/* Decorative Pattern */}
      {decorPattern?.enabled && (
        <DecorativePattern
          type={decorPattern.typ || 'text'}
          text={decorPattern.text || undefined}
          customSvg={typeof decorPattern.customSvg === 'object' ? decorPattern.customSvg : undefined}
          opacity={decorPattern.opacity || undefined}
          size={decorPattern.sz || undefined}
          repeatCount={decorPattern.repeatCount || undefined}
          color={decorPattern.color || undefined}
          position={decorPattern.pos || undefined}
          rotation={decorPattern.rotation || undefined}
        />
      )}

      <div className={cn(getContainerClasses(appearance?.fullWidth), 'relative z-10')}>
        <div
          className={cn(
            maxWidthClasses,
            appearance?.alignment === 'center' && 'mx-auto',
            appearance?.alignment === 'right' && 'ml-auto',
            typographyToClasses(typography),
          )}
        >
          {title && (
            <h2 className={cn('mb-6 font-heading text-h2 font-bold', textColorClass)}>{title}</h2>
          )}

          {body && (
            <RichText
              data={body}
              enableGutter={false}
              className={cn(
                'prose max-w-none',
                proseColorClass,
                textColorClass,
              )}
            />
          )}
        </div>
      </div>
    </section>
  )
}
