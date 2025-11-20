import React from 'react'
import type { StoryHighlightBlock as StoryHighlightProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'
import { DecorativePattern } from '@/components/DecorativePattern'

export const StoryHighlightBlock: React.FC<StoryHighlightProps> = ({
  title,
  body,
  image,
  url,
  linkLabel = 'Read More',
  tag,
  imagePosition = 'left',
  appearance,
  decorativePattern,
}) => {
  const textColorClass = getTextColorClass(appearance)
  const proseColorClass = getProseColorClass(appearance)

  return (
    <section className={cn(blockAppearanceToClasses(appearance), 'relative overflow-hidden')}>
      {/* Decorative Pattern */}
      {decorativePattern?.enabled && (
        <DecorativePattern
          type={decorativePattern.type || 'text'}
          text={decorativePattern.text || undefined}
          opacity={decorativePattern.opacity || undefined}
          size={decorativePattern.size || undefined}
          repeatCount={decorativePattern.repeatCount || undefined}
          color={decorativePattern.color || undefined}
          position={decorativePattern.position || undefined}
          rotation={decorativePattern.rotation || undefined}
        />
      )}

      <div className={cn(getContainerClasses(appearance?.fullWidth), 'relative z-10')}>
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
                'mb-4 font-heading text-h2 font-bold',
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
