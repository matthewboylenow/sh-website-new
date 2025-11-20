import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { CardGridBlock as CardGridBlockType } from '@/payload-types'
import { blockAppearanceToClasses } from '@/utilities/blockAppearanceToClasses'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'
import { DecorativePattern } from '@/components/DecorativePattern'

export const CardGridBlock: React.FC<CardGridBlockType> = (props) => {
  const {
    title,
    subtitle,
    sourceType,
    cards,
    columns,
    cardStyle,
    showViewAllLink,
    viewAllUrl,
    decorativePattern,
  } = props

  const containerClasses = blockAppearanceToClasses(props.appearance)
  const textColorClass = getTextColorClass(props.appearance)
  const proseColorClass = getProseColorClass(props.appearance)

  const gridClasses = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns || '3']

  const cardStyleClasses = {
    bordered: 'border border-sh-border-subtle bg-sh-surface hover:border-sh-border-strong',
    elevated: 'bg-sh-surface shadow-md hover:shadow-lg',
    minimal: 'bg-transparent hover:bg-sh-surface/50',
  }[cardStyle || 'bordered']

  // For now, we only handle manual cards
  // Collection source will be implemented when collections are created
  const displayCards = sourceType === 'manual' ? cards : []

  if (!displayCards || displayCards.length === 0) {
    return null
  }

  return (
    <section className={cn(containerClasses, 'relative overflow-hidden')}>
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className={cn('mb-4 font-heading text-h2 font-bold', textColorClass)}>
                {title}
              </h2>
            )}
            {subtitle && (
              <div className="mx-auto max-w-3xl text-lg">
                <RichText data={subtitle} enableGutter={false} className={cn('prose max-w-none', proseColorClass, textColorClass)} />
              </div>
            )}
          </div>
        )}

        {/* Card Grid */}
        <div className={`grid gap-6 ${gridClasses}`}>
          {displayCards.map((card, index) => {
            const cardContent = (
              <>
                {/* Card Image */}
                {card.image && typeof card.image === 'object' && card.image.url && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={card.image.url}
                      alt={card.image.alt || card.title || ''}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {card.badge && (
                      <div className="absolute right-4 top-4 rounded-full bg-sh-accent-gold px-3 py-1 text-sm font-medium text-white">
                        {card.badge}
                      </div>
                    )}
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                  <h3 className={cn('mb-3 font-heading text-h4 font-semibold', textColorClass)}>
                    {card.title}
                  </h3>
                  {card.body && (
                    <div className="text-base">
                      <RichText data={card.body} enableGutter={false} className={cn('prose max-w-none', proseColorClass, textColorClass)} />
                    </div>
                  )}
                </div>
              </>
            )

            if (card.url) {
              return (
                <Link
                  key={index}
                  href={card.url}
                  className={`block overflow-hidden rounded-lg transition-all duration-200 ${cardStyleClasses}`}
                >
                  {cardContent}
                </Link>
              )
            }

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-lg ${cardStyleClasses}`}
              >
                {cardContent}
              </div>
            )
          })}
        </div>

        {/* View All Link */}
        {showViewAllLink && viewAllUrl && (
          <div className="mt-12 text-center">
            <Link
              href={viewAllUrl}
              className={cn('inline-flex items-center text-lg font-medium hover:opacity-80', textColorClass)}
            >
              View All
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
