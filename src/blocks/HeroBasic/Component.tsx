import React from 'react'
import type { HeroBasicBlock as HeroBasicProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'

export const HeroBasicBlock: React.FC<HeroBasicProps> = ({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  backgroundOverlay,
  links,
  appearance,
}) => {
  const hasBackgroundImage = Boolean(backgroundImage)

  // Overlay classes
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
      <div className={cn(getContainerClasses(false), 'relative z-10')}>
        <div className="max-w-4xl mx-auto">
          {eyebrow && (
            <p
              className={cn(
                'text-sm font-medium uppercase tracking-wider mb-4',
                hasBackgroundImage ? 'text-white/90' : 'text-sh-gold',
              )}
            >
              {eyebrow}
            </p>
          )}

          {title && (
            <h1
              className={cn(
                'text-hero font-heading font-semibold mb-6',
                appearance?.alignment === 'center' && 'mx-auto',
              )}
            >
              {title}
            </h1>
          )}

          {subtitle && (
            <div
              className={cn(
                'text-body-lg mb-8',
                appearance?.alignment === 'center' && 'mx-auto',
              )}
            >
              <RichText
                data={subtitle}
                enableGutter={false}
                className={cn('prose-lg', hasBackgroundImage && 'prose-invert')}
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
