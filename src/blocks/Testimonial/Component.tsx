import React from 'react'
import type { TestimonialBlock as TestimonialProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'

export const TestimonialBlock: React.FC<TestimonialProps> = ({
  quote,
  name,
  role,
  image,
  layout = 'card',
  appearance,
}) => {
  const isDarkBg = appearance?.backgroundVariant === 'dark' || appearance?.backgroundVariant === 'brand'

  // Card layout - boxed testimonial
  if (layout === 'card') {
    return (
      <section className={blockAppearanceToClasses(appearance)}>
        <div className={getContainerClasses(appearance?.fullWidth)}>
          <div
            className={cn(
              'max-w-2xl p-8 rounded-lg',
              appearance?.alignment === 'center' && 'mx-auto',
              appearance?.alignment === 'right' && 'ml-auto',
              isDarkBg ? 'bg-white/10' : 'bg-white shadow-md',
            )}
          >
            {/* Quote icon */}
            <svg
              className={cn(
                'w-10 h-10 mb-4',
                isDarkBg ? 'text-white/40' : 'text-sh-primary/30',
              )}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            {/* Quote */}
            <div className="mb-6">
              <RichText
                data={quote}
                enableGutter={false}
                className={cn(
                  'prose text-lg',
                  isDarkBg && 'prose-invert',
                )}
              />
            </div>

            {/* Attribution */}
            <div className="flex items-center gap-4">
              {image && typeof image === 'object' && (
                <div className="flex-shrink-0">
                  <Media
                    resource={image}
                    className="w-12 h-12 rounded-full overflow-hidden"
                    imgClassName="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className={cn('font-semibold', isDarkBg && 'text-white')}>
                  {name}
                </p>
                {role && (
                  <p className={cn('text-sm', isDarkBg ? 'text-white/70' : 'text-sh-text-muted')}>
                    {role}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Inline layout - simple quote with attribution
  if (layout === 'inline') {
    return (
      <section className={blockAppearanceToClasses(appearance)}>
        <div className={getContainerClasses(appearance?.fullWidth)}>
          <div
            className={cn(
              'max-w-3xl border-l-4',
              appearance?.alignment === 'center' && 'mx-auto',
              appearance?.alignment === 'right' && 'ml-auto',
              isDarkBg ? 'border-white/40 pl-6' : 'border-sh-primary pl-6',
            )}
          >
            {/* Quote */}
            <div className="mb-4">
              <RichText
                data={quote}
                enableGutter={false}
                className={cn(
                  'prose text-lg italic',
                  isDarkBg && 'prose-invert',
                )}
              />
            </div>

            {/* Attribution */}
            <div className="flex items-center gap-3">
              {image && typeof image === 'object' && (
                <Media
                  resource={image}
                  className="w-10 h-10 rounded-full overflow-hidden"
                  imgClassName="w-full h-full object-cover"
                />
              )}
              <div>
                <p className={cn('font-semibold text-sm', isDarkBg && 'text-white')}>
                  — {name}
                  {role && <span className={cn('font-normal', isDarkBg ? 'text-white/70' : 'text-sh-text-muted')}>, {role}</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Featured layout - large, centered testimonial
  return (
    <section className={blockAppearanceToClasses(appearance)}>
      <div className={getContainerClasses(appearance?.fullWidth)}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Image */}
          {image && typeof image === 'object' && (
            <div className="mb-6 flex justify-center">
              <Media
                resource={image}
                className="w-20 h-20 rounded-full overflow-hidden"
                imgClassName="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Quote */}
          <div className="mb-6">
            <RichText
              data={quote}
              enableGutter={false}
              className={cn(
                'prose prose-xl',
                isDarkBg && 'prose-invert',
              )}
            />
          </div>

          {/* Attribution */}
          <div>
            <p className={cn('text-lg font-semibold', isDarkBg && 'text-white')}>
              {name}
            </p>
            {role && (
              <p className={cn('text-base', isDarkBg ? 'text-white/70' : 'text-sh-text-muted')}>
                {role}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
