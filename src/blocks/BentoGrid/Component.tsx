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
                className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] ${getSizeClasses(
                  item.size || 'medium',
                )}`}
                style={{
                  background: hasBackgroundImage
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow:
                    '0 8px 32px 0 rgba(0, 0, 0, 0.08), 0 2px 8px 0 rgba(0, 0, 0, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />

                {/* Subtle border */}
                <div className="absolute inset-0 rounded-2xl border border-white/20 transition-all duration-500 group-hover:border-sh-primary/40" />

                {/* Glow effect on hover */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-sh-primary/20 via-blue-400/20 to-sh-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70" />

                {/* Background Image */}
                {hasBackgroundImage && item.image && typeof item.image === 'object' && item.image.url && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt || item.title || ''}
                      fill
                      className="object-cover opacity-30 transition-all duration-700 group-hover:scale-110 group-hover:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-sh-primary/20 via-blue-500/10 to-transparent" />
                  </div>
                )}

                {/* Animated shimmer effect */}
                <div
                  className="absolute inset-0 -translate-x-full opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-30"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col">
                  {/* Icon Image (if not background) */}
                  {item.imageStyle === 'icon' &&
                    item.image &&
                    typeof item.image === 'object' &&
                    item.image.url && (
                      <div className="mb-4 h-14 w-14 rounded-xl bg-gradient-to-br from-sh-primary/10 to-blue-500/5 p-3 shadow-lg ring-1 ring-white/10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:ring-sh-primary/30">
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || ''}
                          width={48}
                          height={48}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:rotate-3"
                        />
                      </div>
                    )}

                  {/* Tag */}
                  {item.tag && (
                    <div className="mb-3 inline-flex w-fit items-center rounded-full bg-gradient-to-r from-sh-gold/20 to-yellow-400/20 px-3 py-1.5 text-xs font-semibold text-sh-gold shadow-sm ring-1 ring-sh-gold/20 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md">
                      {item.tag}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="mb-3 bg-gradient-to-br from-sh-text-main to-sh-text-main/80 bg-clip-text font-heading text-h4 font-bold transition-all duration-500 group-hover:from-sh-primary group-hover:to-blue-600 group-hover:text-transparent">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-5 flex-1 text-base leading-relaxed text-sh-text-muted transition-colors duration-300 group-hover:text-sh-text-main">
                    {item.description}
                  </p>

                  {/* Arrow Indicator */}
                  <div className="flex items-center text-sm font-semibold text-sh-primary transition-all duration-300 group-hover:gap-2">
                    <span className="transition-colors group-hover:text-blue-600">Learn more</span>
                    <svg
                      className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
