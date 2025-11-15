import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BentoGridBlock as BentoGridBlockType } from '@/payload-types'
import { blockAppearanceToClasses } from '@/utilities/blockAppearanceToClasses'
import RichText from '@/components/RichText'

export const BentoGridBlock: React.FC<BentoGridBlockType> = (props) => {
  const { title, subtitle, items, appearance } = props

  const containerClasses = blockAppearanceToClasses(appearance)

  if (!items || items.length === 0) {
    return null
  }

  // Map size to grid span classes
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1'
      case 'medium':
        return 'col-span-1 md:col-span-1 row-span-1'
      case 'large':
        return 'col-span-1 md:col-span-2 row-span-1'
      case 'xlarge':
        return 'col-span-1 md:col-span-2 row-span-2'
      default:
        return 'col-span-1 row-span-1'
    }
  }

  return (
    <section className={containerClasses}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="mb-4 font-heading text-h2 font-bold text-sh-text-main">
                {title}
              </h2>
            )}
            {subtitle && (
              <div className="mx-auto max-w-3xl text-lg text-sh-text-muted">
                <RichText data={subtitle} enableGutter={false} />
              </div>
            )}
          </div>
        )}

        {/* Bento Grid */}
        <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((item, index) => {
            const hasBackgroundImage =
              item.imageStyle === 'background' &&
              item.image &&
              typeof item.image === 'object' &&
              item.image.url

            return (
              <Link
                key={index}
                href={item.url || '#'}
                className={`group relative overflow-hidden rounded-xl bg-sh-surface p-6 transition-all duration-300 hover:shadow-lg ${getSizeClasses(
                  item.size || 'medium',
                )}`}
              >
                {/* Background Image */}
                {hasBackgroundImage && item.image && typeof item.image === 'object' && item.image.url && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || item.title || ''}
                      fill
                      className="object-cover opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-sh-primary/5 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col">
                  {/* Icon Image (if not background) */}
                  {item.imageStyle === 'icon' &&
                    item.image &&
                    typeof item.image === 'object' &&
                    item.image.url && (
                      <div className="mb-4 h-12 w-12">
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || ''}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                    )}

                  {/* Tag */}
                  {item.tag && (
                    <div className="mb-3 inline-flex w-fit items-center rounded-full bg-sh-accent-gold/10 px-3 py-1 text-xs font-medium text-sh-accent-gold">
                      {item.tag}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="mb-3 font-heading text-h4 font-semibold text-sh-text-main group-hover:text-sh-primary">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 flex-1 text-base leading-relaxed text-sh-text-muted">
                    {item.description}
                  </p>

                  {/* Arrow Indicator */}
                  <div className="flex items-center text-sm font-medium text-sh-primary">
                    Learn more
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
                  </div>
                </div>

                {/* Border Effect */}
                <div className="absolute inset-0 rounded-xl border border-sh-border-subtle transition-colors group-hover:border-sh-primary/30" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
