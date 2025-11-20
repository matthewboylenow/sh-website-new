import React from 'react'
import type { ColumnsBlock as ColumnsProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'
import { DecorativePattern } from '@/components/DecorativePattern'

export const ColumnsBlock: React.FC<ColumnsProps> = ({
  sectionTitle,
  layout = 'equal',
  columns,
  columnGap = 'default',
  appearance,
  decorPattern,
}) => {
  const gapClasses = cn(
    columnGap === 'small' && 'gap-4 md:gap-6',
    columnGap === 'default' && 'gap-6 md:gap-8',
    columnGap === 'large' && 'gap-8 md:gap-12',
  )

  const layoutClasses = cn(
    'grid',
    gapClasses,
    // Equal columns based on count
    layout === 'equal' && columns?.length === 2 && 'md:grid-cols-2',
    layout === 'equal' && columns?.length === 3 && 'md:grid-cols-3',
    layout === 'equal' && columns?.length === 4 && 'md:grid-cols-2 lg:grid-cols-4',
    // Asymmetric layouts
    layout === 'oneThirdLeft' && 'md:grid-cols-3',
    layout === 'oneThirdRight' && 'md:grid-cols-3',
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
          opacity={decorPattern.opacity || undefined}
          size={decorPattern.sz || undefined}
          repeatCount={decorPattern.repeatCount || undefined}
          color={decorPattern.color || undefined}
          position={decorPattern.pos || undefined}
          rotation={decorPattern.rotation || undefined}
        />
      )}

      <div className={cn(getContainerClasses(appearance?.fullWidth), 'relative z-10')}>
        {sectionTitle && (
          <h2 className={cn('mb-8 font-heading text-h2 font-bold', textColorClass)}>
            {sectionTitle}
          </h2>
        )}

        <div className={layoutClasses}>
          {columns?.map((column, index) => {
            const columnClasses = cn(
              'flex flex-col',
              // Special column spans for asymmetric layouts
              layout === 'oneThirdLeft' && index === 0 && 'md:col-span-1',
              layout === 'oneThirdLeft' && index === 1 && 'md:col-span-2',
              layout === 'oneThirdRight' && index === 0 && 'md:col-span-2',
              layout === 'oneThirdRight' && index === 1 && 'md:col-span-1',
            )

            return (
              <div key={index} className={columnClasses}>
                {/* Content Type: Image */}
                {column.contentType === 'image' && column.image && typeof column.image === 'object' && (
                  <div className="mb-4 w-full">
                    <Media
                      resource={column.image}
                      className="w-full h-auto rounded-lg overflow-hidden"
                      imgClassName="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content Type: Video */}
                {column.contentType === 'video' && (
                  <div className="mb-4 w-full">
                    {column.videoEmbed ? (
                      // Embedded video (YouTube, Vimeo, etc.)
                      <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
                        <iframe
                          src={column.videoEmbed}
                          className="absolute top-0 left-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={column.title || 'Video'}
                        />
                      </div>
                    ) : (
                      column.video &&
                      typeof column.video === 'object' &&
                      column.video.url && (
                        // Uploaded video file
                        <video
                          controls
                          poster={
                            column.videoPoster && typeof column.videoPoster === 'object' && column.videoPoster.url
                              ? column.videoPoster.url
                              : undefined
                          }
                          className="w-full h-auto rounded-lg"
                        >
                          <source src={column.video.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )
                    )}
                  </div>
                )}

                {/* Content Type: Text (default) - Show icon if present */}
                {(!column.contentType || column.contentType === 'text') &&
                  column.icon &&
                  typeof column.icon === 'object' && (
                    <div className="mb-4">
                      <Media
                        resource={column.icon}
                        className="w-16 h-16 object-contain"
                        imgClassName="w-full h-full object-contain"
                      />
                    </div>
                  )}

                {column.title && (
                  <h3 className={cn('text-h3 font-heading font-semibold mb-4', textColorClass)}>
                    {column.title}
                  </h3>
                )}

                {column.body && (
                  <div className="mb-4 flex-grow">
                    <RichText
                      data={column.body}
                      enableGutter={false}
                      className={cn(
                        'prose max-w-none',
                        proseColorClass,
                        textColorClass,
                      )}
                    />
                  </div>
                )}

                {column.links && column.links.length > 0 && (
                  <div className="flex flex-col gap-3 mt-auto">
                    {column.links.map(({ link }, linkIndex) => (
                      <CMSLink key={linkIndex} {...link} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
