import React from 'react'
import type { CTAFullWidthBlock as CTAFullWidthProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'
import { DecorativePattern } from '@/components/DecorativePattern'

export const CTAFullWidthBlock: React.FC<CTAFullWidthProps> = ({
  eyebrow,
  title,
  body,
  backgroundImage,
  backgroundOverlay,
  links,
  appearance,
  decorPattern,
}) => {
  const hasBackgroundImage = Boolean(backgroundImage)
  const textColorClass = getTextColorClass(appearance)
  const proseColorClass = getProseColorClass(appearance)

  const overlayClasses = cn(
    'absolute inset-0',
    backgroundOverlay === 'light' && 'bg-black/20',
    backgroundOverlay === 'medium' && 'bg-black/40',
    backgroundOverlay === 'dark' && 'bg-black/60',
  )

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        blockAppearanceToClasses(appearance),
        hasBackgroundImage && 'text-white',
      )}
    >
      {/* Decorative Pattern */}
      {decorPattern?.enabled && (
        <DecorativePattern
          type={decorPattern.typ || 'text'}
          text={decorPattern.text || undefined}
          customSvg={typeof (decorPattern as any)?.customSvg === 'object' ? (decorPattern as any).customSvg : undefined}
          opacity={decorPattern.opacity || undefined}
          size={decorPattern.sz || undefined}
          repeatCount={decorPattern.repeatCount || undefined}
          color={decorPattern.color || undefined}
          position={decorPattern.pos || undefined}
          rotation={decorPattern.rotation || undefined}
        />
      )}

      {/* Background Image */}
      {hasBackgroundImage && typeof backgroundImage === 'object' && (
        <>
          <div className="absolute inset-0 z-0">
            <Media
              resource={backgroundImage}
              className="w-full h-full object-cover"
              imgClassName="w-full h-full object-cover"
            />
          </div>
          {backgroundOverlay && backgroundOverlay !== 'none' && (
            <div className={overlayClasses} />
          )}
        </>
      )}

      {/* Content */}
      <div className={cn(getContainerClasses(appearance?.fullWidth), 'relative z-10')}>
        <div
          className={cn(
            'max-w-3xl',
            appearance?.alignment === 'center' && 'mx-auto',
            appearance?.alignment === 'right' && 'ml-auto',
          )}
        >
          {eyebrow && (
            <p
              className={cn(
                'text-sm font-medium uppercase tracking-wider mb-3',
                textColorClass,
              )}
            >
              {eyebrow}
            </p>
          )}

          {title && (
            <h2 className={cn('mb-4 font-heading text-h2 font-bold', textColorClass)}>{title}</h2>
          )}

          {body && (
            <div className="mb-6">
              <RichText
                data={body}
                enableGutter={false}
                className={cn(
                  'prose max-w-none',
                  proseColorClass,
                  textColorClass,
                )}
              />
            </div>
          )}

          {links && links.length > 0 && (
            <div
              className={cn(
                'flex flex-wrap gap-4',
                appearance?.alignment === 'center' && 'justify-center',
                appearance?.alignment === 'right' && 'justify-end',
              )}
            >
              {links.map(({ link }, index) => (
                <CMSLink key={index} {...link} size="lg" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
