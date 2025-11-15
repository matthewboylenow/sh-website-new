import React from 'react'
import type { HeroBasicBlock as HeroBasicProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'
import { typographyToClasses } from '@/utilities/typographyToClasses'
import { MissionStatement } from './MissionStatement'
import { WelcomeCard } from './WelcomeCard'

export const HeroBasicBlock: React.FC<HeroBasicProps> = ({
  eyebrow,
  title,
  subtitle,
  backgroundType,
  backgroundImage,
  backgroundVideo,
  posterImage,
  backgroundOverlay,
  links,
  showMissionStatement,
  missionAnimationMode,
  showWelcomeCard,
  welcomeEyebrow,
  welcomeTitle,
  welcomeSubtitle,
  welcomeButtons,
  minHeight = 'default',
  typography,
  appearance,
}) => {
  const hasBackground = backgroundType && backgroundType !== 'none'

  // Convert minHeight to Tailwind classes
  const heightClasses = {
    small: 'min-h-[50vh]',
    default: 'min-h-[60vh] md:min-h-[70vh]',
    large: 'min-h-[80vh]',
    fullscreen: 'min-h-screen',
    auto: 'min-h-fit',
  }[minHeight] || 'min-h-[60vh] md:min-h-[70vh]'

  // Overlay classes with gradient for video/image backgrounds
  const overlayClasses = cn(
    'absolute inset-0 z-[1]',
    backgroundOverlay === 'light' && 'bg-black/20',
    backgroundOverlay === 'medium' && 'bg-black/40',
    backgroundOverlay === 'dark' && 'bg-black/60',
  )

  // Dark gradient overlay for video/image (matte black bottom to transparent top)
  const gradientOverlayClasses = 'absolute inset-0 z-[2] bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent'

  return (
    <section
      className={cn(
        'relative',
        blockAppearanceToClasses(appearance),
        hasBackground && 'text-white',
      )}
    >
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

      {/* Dark gradient overlay for enhanced video/image effect */}
      {hasBackground && <div className={gradientOverlayClasses} />}

      {/* Content */}
      <div className={cn(getContainerClasses(false), 'relative z-10')}>
        {/* Hero Content Area - Centered with proper spacing */}
        <div
          className={cn(
            heightClasses,
            'flex flex-col justify-center items-center text-center py-16 md:py-24',
            typographyToClasses(typography),
          )}
        >
          {/* Legacy content: eyebrow, title, subtitle (kept for backward compatibility) */}
          {(eyebrow || title || subtitle) && (
            <div className="max-w-4xl mx-auto mb-12 md:mb-16">
              {eyebrow && (
                <p
                  className={cn(
                    'text-sm font-medium uppercase tracking-wider mb-4',
                    hasBackground ? 'text-white/90' : 'text-sh-gold',
                  )}
                >
                  {eyebrow}
                </p>
              )}

              {title && (
                <h1
                  className={cn(
                    'text-hero font-heading font-semibold mb-6',
                    hasBackground && 'text-white',
                  )}
                >
                  {title}
                </h1>
              )}

              {subtitle && (
                <div className={cn('text-body-lg mb-8')}>
                  <RichText
                    data={subtitle}
                    enableGutter={false}
                    className={cn('prose-lg', hasBackground && 'prose-invert')}
                  />
                </div>
              )}

              {/* Legacy links (kept for backward compatibility) */}
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
          )}

          {/* Mission Statement Animation */}
          {showMissionStatement && (
            <MissionStatement
              mode={missionAnimationMode as 'rotating' | 'lineByLine'}
              className="mb-auto"
            />
          )}
        </div>

        {/* Welcome Card - Floats at bottom */}
        {showWelcomeCard && (
          <WelcomeCard
            eyebrow={welcomeEyebrow ?? undefined}
            title={welcomeTitle ?? undefined}
            subtitle={welcomeSubtitle ?? undefined}
            buttons={welcomeButtons ?? undefined}
          />
        )}
      </div>
    </section>
  )
}
