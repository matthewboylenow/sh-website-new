import React from 'react'
import type { StoryHighlightBlock as StoryHighlightProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'

export const StoryHighlightBlock: React.FC<StoryHighlightProps> = ({
  title,
  body,
  image,
  url,
  linkLabel = 'Read More',
  tag,
  imagePosition = 'left',
  appearance,
}) => {
  const textColorClass = getTextColorClass(appearance)
  const proseColorClass = getProseColorClass(appearance)

  return (
    <section className={blockAppearanceToClasses(appearance)}>
      <div className={getContainerClasses(appearance?.fullWidth)}>
        <div
          className={cn(
            'grid md:grid-cols-2 gap-8 lg:gap-12 items-center',
            imagePosition === 'right' && 'md:grid-flow-dense',
          )}
        >
          {/* Image */}
          <div
            className={cn(
              'relative aspect-[4/3] rounded-lg overflow-hidden',
              imagePosition === 'right' && 'md:col-start-2',
            )}
          >
            {image && typeof image === 'object' && (
              <Media
                resource={image}
                className="w-full h-full"
                imgClassName="w-full h-full object-cover"
              />
            )}
            {tag && (
              <div className="absolute top-4 left-4">
                <span
                  className={cn(
                    'inline-block px-3 py-1 rounded-full text-sm font-medium',
                    'bg-sh-gold text-white',
                  )}
                >
                  {tag}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className={cn(imagePosition === 'right' && 'md:col-start-1 md:row-start-1')}>
            <h2
              className={cn(
                'text-h2 font-heading font-semibold mb-4',
                textColorClass,
              )}
            >
              {title}
            </h2>

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

            {url && (
              <CMSLink
                {...{
                  type: 'custom',
                  url,
                  label: linkLabel,
                  appearance: 'default',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
