import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { EventListBlock as EventListBlockType } from '@/payload-types'
import { blockAppearanceToClasses } from '@/utilities/blockAppearanceToClasses'
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cn } from '@/utilities/ui'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'
import { DecorativePattern } from '@/components/DecorativePattern'

export const EventListBlock: React.FC<EventListBlockType> = async (props) => {
  const {
    title,
    subtitle,
    mode = 'upcoming',
    startDate,
    endDate,
    categoryFilter,
    limit = 6,
    layout = 'cards',
    showViewAllLink,
    viewAllUrl,
    decorPattern,
  } = props

  const containerClasses = blockAppearanceToClasses(props.appearance)
  const textColorClass = getTextColorClass(props.appearance)
  const proseColorClass = getProseColorClass(props.appearance)
  const payload = await getPayload({ config })

  // Build query based on mode
  const where: any = {}

  if (mode === 'upcoming') {
    where.startDate = {
      greater_than_equal: new Date().toISOString(),
    }
  } else if (mode === 'dateRange' && startDate && endDate) {
    where.and = [
      {
        startDate: {
          greater_than_equal: new Date(startDate).toISOString(),
        },
      },
      {
        startDate: {
          less_than_equal: new Date(endDate).toISOString(),
        },
      },
    ]
  } else if (mode === 'featured') {
    where.isFeatured = {
      equals: true,
    }
  }

  // Add category filter
  if (categoryFilter && categoryFilter.length > 0) {
    where.category = {
      in: categoryFilter,
    }
  }

  // Fetch events
  const events = await payload.find({
    collection: 'events',
    where,
    limit: limit || 6,
    sort: 'startDate',
  })

  if (!events.docs || events.docs.length === 0) {
    return null
  }

  const formatEventDate = (date: string | Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatEventTime = (date: string | Date) => {
    const d = new Date(date)
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  return (
    <section className={cn(containerClasses, 'relative overflow-hidden')}>
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

        {/* Events Display */}
        {layout === 'cards' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.docs.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-sh-accent-gold/30"
              >
                {/* Date Badge - Prominent Calendar Style */}
                <div className="absolute left-4 top-4 z-10 flex flex-col items-center rounded-xl bg-gradient-to-br from-sh-accent-gold to-yellow-500 px-4 py-3 text-white shadow-lg shadow-sh-accent-gold/40 ring-2 ring-white transition-transform group-hover:scale-110">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="text-2xl font-black leading-none">
                    {new Date(event.startDate).getDate()}
                  </span>
                </div>

                {event.featuredImage && typeof event.featuredImage === 'object' && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={event.featuredImage.url || ''}
                      alt={event.featuredImage.alt || event.title || ''}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    {event.category && (
                      <span className="rounded-full bg-sh-accent-gold/15 px-3 py-1 text-xs font-semibold text-sh-accent-gold ring-1 ring-sh-accent-gold/30">
                        {event.category}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 font-heading text-h4 font-semibold text-sh-text-main group-hover:text-sh-primary">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-sh-text-muted">
                    {event.startDate && (
                      <span className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {formatEventTime(event.startDate)}
                      </span>
                    )}
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {layout === 'list' && (
          <div className="space-y-4">
            {events.docs.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group flex gap-6 rounded-lg border border-sh-border-subtle bg-sh-surface p-6 transition-all hover:border-sh-border-strong hover:shadow-md"
              >
                {event.featuredImage && typeof event.featuredImage === 'object' && (
                  <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={event.featuredImage.url || ''}
                      alt={event.featuredImage.alt || event.title || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <time className="text-sm font-medium text-sh-primary">
                      {formatEventDate(event.startDate)}
                    </time>
                    {event.category && (
                      <span className="rounded-full bg-sh-accent-teal/10 px-2 py-1 text-xs font-medium text-sh-accent-teal">
                        {event.category}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 font-heading text-h4 font-semibold text-sh-text-main group-hover:text-sh-primary">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-sh-text-muted">
                    {event.startDate && <span>{formatEventTime(event.startDate)}</span>}
                    {event.location && <span>• {event.location}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {layout === 'compact' && (
          <div className="divide-y divide-sh-border-subtle">
            {events.docs.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group flex items-center justify-between py-4 transition-colors hover:bg-sh-surface/50"
              >
                <div className="flex-1">
                  <h3 className="mb-1 font-heading text-lg font-semibold text-sh-text-main group-hover:text-sh-primary">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-sh-text-muted">
                    <span>{formatEventDate(event.startDate)}</span>
                    {event.startDate && <span>• {formatEventTime(event.startDate)}</span>}
                    {event.location && <span>• {event.location}</span>}
                  </div>
                </div>
                <svg
                  className="h-5 w-5 text-sh-primary transition-transform group-hover:translate-x-1"
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
            ))}
          </div>
        )}

        {/* View All Link */}
        {showViewAllLink && viewAllUrl && (
          <div className="mt-12 text-center">
            <Link
              href={viewAllUrl}
              className={cn('inline-flex items-center text-lg font-medium hover:opacity-80', textColorClass)}
            >
              View All Events
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
