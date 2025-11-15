import React from 'react'
import type { CTAFullWidthBlock as CTAFullWidthProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'

export const CTAFullWidthBlock: React.FC<CTAFullWidthProps> = ({
  eyebrow,
  title,
  body,
  backgroundImage,
  backgroundOverlay,
  links,
  appearance,
}) => {
  const hasBackgroundImage = Boolean(backgroundImage)

  const overlayClasses = cn(
    'absolute inset-0',
    backgroundOverlay === 'light' && 'bg-black/20',
    backgroundOverlay === 'medium' && 'bg-black/40',
    backgroundOverlay === 'dark' && 'bg-black/60',
  )

  return (
    <section
      className={cn(
        'relative',
        blockAppearanceToClasses(appearance),
        hasBackgroundImage && 'text-white',
      )}
    >
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
                hasBackgroundImage ? 'text-white/90' : 'text-sh-gold',
              )}
            >
              {eyebrow}
            </p>
          )}

          {title && (
            <h2 className="text-h2 font-heading font-semibold mb-4">{title}</h2>
          )}

          {body && (
            <div className="mb-6">
              <RichText
                data={body}
                enableGutter={false}
                className={cn(
                  'prose',
                  hasBackgroundImage && 'prose-invert',
                  appearance?.backgroundVariant === 'dark' && 'prose-invert',
                  appearance?.backgroundVariant === 'brand' && 'prose-invert',
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
