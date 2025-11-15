import React from 'react'
import type { MediaListBlock as MediaListProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'

export const MediaListBlock: React.FC<MediaListProps> = async ({
  title,
  subtitle,
  mediaType = 'podcast',
  limit = 6,
  layout = 'grid',
  showDate = true,
  showDuration = true,
  viewAllUrl,
  appearance,
}) => {
  // TODO: Fetch media/podcasts from collection once it's created
  // For now, we'll show a placeholder
  const mediaItems: any[] = []

  const isDarkBg = appearance?.backgroundVariant === 'dark' || appearance?.backgroundVariant === 'brand'

  return (
    <section className={blockAppearanceToClasses(appearance)}>
      <div className={getContainerClasses(appearance?.fullWidth)}>
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2
                className={cn(
                  'text-h2 font-heading font-semibold mb-3',
                  isDarkBg && 'text-white',
                  appearance?.alignment === 'center' && 'text-center',
                  appearance?.alignment === 'right' && 'text-right',
                )}
              >
                {title}
              </h2>
            )}

            {subtitle && (
              <RichText
                data={subtitle}
                enableGutter={false}
                className={cn(
                  'prose',
                  isDarkBg && 'prose-invert',
                  appearance?.alignment === 'center' && 'mx-auto text-center',
                  appearance?.alignment === 'right' && 'ml-auto text-right',
                )}
              />
            )}
          </div>
        )}

        {/* Media Items */}
        {mediaItems.length > 0 ? (
          <div
            className={cn(
              layout === 'grid' && 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
              layout === 'list' && 'space-y-4',
              layout === 'featured' && 'space-y-8',
            )}
          >
            {mediaItems.map((item: any, index: number) => (
              <div
                key={index}
                className={cn(
                  'rounded-lg overflow-hidden',
                  isDarkBg ? 'bg-white/10' : 'bg-white shadow-md',
                )}
              >
                {/* Placeholder for media item */}
                <div className="p-6">
                  <h3 className={cn('font-semibold mb-2', isDarkBg && 'text-white')}>
                    {item.title}
                  </h3>
                  {showDate && (
                    <p className={cn('text-sm', isDarkBg ? 'text-white/70' : 'text-sh-text-muted')}>
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={cn(
              'p-8 rounded-lg border-2 border-dashed text-center',
              isDarkBg
                ? 'border-white/30 text-white/70'
                : 'border-sh-border-subtle text-sh-text-muted',
            )}
          >
            <p>No media items to display. The Podcasts collection needs to be created and populated.</p>
          </div>
        )}

        {/* View All Link */}
        {viewAllUrl && mediaItems.length > 0 && (
          <div
            className={cn(
              'mt-8',
              appearance?.alignment === 'center' && 'text-center',
              appearance?.alignment === 'right' && 'text-right',
            )}
          >
            <CMSLink
              {...{
                type: 'custom',
                url: viewAllUrl,
                label: 'View All Media',
                appearance: 'default',
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
