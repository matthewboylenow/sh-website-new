import React from 'react'
import type { HeroWithStatsBlock as HeroWithStatsProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'
import { DecorativePattern } from '@/components/DecorativePattern'

export const HeroWithStatsBlock: React.FC<HeroWithStatsProps> = ({
  eyebrow,
  title,
  subtitle,
  backgroundType,
  backgroundImage,
  backgroundVideo,
  posterImage,
  backgroundOverlay,
  buttons,
  stats,
  minHeight = 'default',
  appearance,
  decorPattern,
}) => {
  const hasBackground = backgroundType && backgroundType !== 'none'
  const textColorClass = getTextColorClass(appearance)
  const proseColorClass = getProseColorClass(appearance)

  // Convert minHeight to Tailwind classes
  const heightClasses = {
    small: 'min-h-[50vh]',
    default: 'min-h-[60vh] md:min-h-[70vh]',
    large: 'min-h-[80vh]',
    fullscreen: 'min-h-screen',
    auto: 'min-h-fit',
  }[minHeight ?? 'default'] || 'min-h-[60vh] md:min-h-[70vh]'

  const overlayClasses = cn(
    'absolute inset-0 z-[1]',
    backgroundOverlay === 'light' && 'bg-black/20',
    backgroundOverlay === 'medium' && 'bg-black/40',
    backgroundOverlay === 'dark' && 'bg-black/60',
  )

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        blockAppearanceToClasses(appearance),
        hasBackground && 'text-white',
      )}
    >
      {/* Decorative Pattern */}
      {decorPattern?.enabled && (
        <DecorativePattern
          type={decorPattern.type || 'text'}
          text={decorPattern.text || undefined}
          opacity={decorPattern.opacity || undefined}
          size={decorPattern.size || undefined}
          repeatCount={decorPattern.repeatCount || undefined}
          color={decorPattern.color || undefined}
          position={decorPattern.position || undefined}
          rotation={decorPattern.rotation || undefined}
        />
      )}

      {/* Background Image */}
      {backgroundType === 'image' && typeof backgroundImage === 'object' && (
        <div className="absolute inset-0 z-0">
          <Media
            resource={backgroundImage}
            className="w-full h-full object-cover"
            imgClassName="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Background Video */}
      {backgroundType === 'video' && backgroundVideo && typeof backgroundVideo === 'object' && backgroundVideo.url && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={typeof posterImage === 'object' && posterImage?.url ? posterImage.url : undefined}
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo.url} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Overlay */}
      {hasBackground && backgroundOverlay && backgroundOverlay !== 'none' && (
        <div className={overlayClasses} />
      )}

      {/* Content */}
      <div className={cn(getContainerClasses(appearance?.fullWidth), 'relative z-10', heightClasses, 'flex flex-col justify-center py-16 md:py-24')}>
        <div
          className={cn(
            'max-w-4xl',
            appearance?.alignment === 'center' && 'mx-auto text-center',
            appearance?.alignment === 'right' && 'ml-auto text-right',
          )}
        >
          {/* Eyebrow */}
          {eyebrow && (
            <p
              className={cn(
                'text-sm font-medium uppercase tracking-wider mb-4',
                textColorClass,
              )}
            >
              {eyebrow}
            </p>
          )}

          {/* Title */}
          <h1 className={cn('text-hero font-heading font-bold mb-6', textColorClass)}>{title}</h1>

          {/* Subtitle */}
          {subtitle && (
            <div className="mb-8">
              <RichText
                data={subtitle}
                enableGutter={false}
                className={cn(
                  'prose prose-lg max-w-none',
                  proseColorClass,
                  textColorClass,
                )}
              />
            </div>
          )}

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <div
              className={cn(
                'flex flex-wrap gap-4 mb-12',
                appearance?.alignment === 'center' && 'justify-center',
                appearance?.alignment === 'right' && 'justify-end',
              )}
            >
              {buttons.map(({ link }, index) => (
                <CMSLink key={index} {...link} size="lg" />
              ))}
            </div>
          )}

          {/* Statistics */}
          {stats && stats.length > 0 && (
            <div
              className={cn(
                'grid gap-8 pt-8 border-t',
                stats.length === 2 && 'grid-cols-2',
                stats.length === 3 && 'grid-cols-3',
                stats.length === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
                hasBackground || appearance?.bgVariant === 'dark' || appearance?.bgVariant === 'brand'
                  ? 'border-white/30'
                  : 'border-sh-border-subtle',
              )}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    appearance?.alignment === 'center' && 'text-center',
                    appearance?.alignment === 'right' && 'text-right',
                  )}
                >
                  <div
                    className={cn(
                      'text-4xl font-bold font-heading mb-2',
                      textColorClass,
                    )}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={cn(
                      'text-base',
                      textColorClass,
                    )}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
