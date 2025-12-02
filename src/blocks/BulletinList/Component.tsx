import React from 'react'
import Link from 'next/link'
import type { BulletinListBlock as BulletinListBlockType } from '@/payload-types'
import { blockAppearanceToClasses } from '@/utilities/blockAppearanceToClasses'
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cn } from '@/utilities/ui'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'
import { DecorativePattern } from '@/components/DecorativePattern'

export const BulletinListBlock: React.FC<BulletinListBlockType> = async (props) => {
  const {
    title,
    subtitle,
    displayMode = 'recent',
    limit = 4,
    showHighlights = false,
    layout = 'grid',
    showViewAllLink,
    viewAllUrl,
    decorPattern,
  } = props

  const containerClasses = blockAppearanceToClasses(props.appearance)
  const textColorClass = getTextColorClass(props.appearance)
  const proseColorClass = getProseColorClass(props.appearance)
  const payload = await getPayload({ config })

  // Build query based on display mode
  const where: any = {}

  if (displayMode === 'current') {
    where.isCurrent = {
      equals: true,
    }
  }

  // Fetch bulletins
  const bulletins = await payload.find({
    collection: 'bulletins',
    where,
    limit: displayMode === 'current' ? 1 : (limit || 4),
    sort: '-date',
  })

  if (!bulletins.docs || bulletins.docs.length === 0) {
    return null
  }

  const formatDate = (date: string | Date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getFileUrl = (bulletin: any) => {
    if (bulletin.file && typeof bulletin.file === 'object' && bulletin.file.url) {
      return bulletin.file.url
    }
    return '#'
  }

  const getCoverImageUrl = (bulletin: any) => {
    if (bulletin.coverImage && typeof bulletin.coverImage === 'object' && bulletin.coverImage.url) {
      return bulletin.coverImage.url
    }
    return null
  }

  const getLiturgicalSeasonColor = (season?: string) => {
    switch (season) {
      case 'advent':
        return 'bg-purple-500/10 text-purple-700'
      case 'christmas':
        return 'bg-yellow-500/10 text-yellow-700'
      case 'lent':
        return 'bg-gray-500/10 text-gray-700'
      case 'easter':
        return 'bg-white/10 text-white'
      case 'special':
        return 'bg-sh-accent-gold/10 text-sh-accent-gold'
      default:
        return 'bg-sh-primary/10 text-sh-primary'
    }
  }

  return (
    <section className={cn(containerClasses, 'relative overflow-hidden')}>
      {/* Decorative Pattern */}
      {decorPattern?.enabled && (
        <DecorativePattern
          type={decorPattern.typ || 'text'}
          text={decorPattern.text || undefined}
          customSvg={typeof (decorPattern as any)?.customSvg === 'object' ? (decorPattern as any).customSvg : undefined}
          opacity={decorPattern.opacity || undefined}
          size={decorPattern.sz || undefined}
          repeatCount={decorPattern.repeatCount || undefined}
          color={decorPattern.color || undefined}
          position={decorPattern.pos || undefined}
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

        {/* Bulletins Display - Grid */}
        {layout === 'grid' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bulletins.docs.map((bulletin) => (
              <article
                key={bulletin.id}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-xl hover:ring-gray-300"
              >
                {/* Left Accent Border */}
                <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-red-500 to-red-600 transition-all group-hover:w-2" />

                {/* Corner Fold Effect */}
                <div className="absolute right-0 top-0 h-0 w-0 border-l-[20px] border-t-[20px] border-l-transparent border-t-gray-200 transition-all group-hover:border-t-gray-300" />

                {/* PDF Icon */}
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Date and Season */}
                <div className="mb-3 flex items-center gap-2">
                  <time className="text-sm font-medium text-sh-primary">
                    {formatDate(bulletin.date)}
                  </time>
                  {bulletin.isCurrent && (
                    <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700">
                      Current
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mb-3 font-heading text-lg font-semibold text-sh-text-main">
                  {bulletin.title}
                </h3>

                {/* Highlights */}
                {showHighlights && bulletin.highlights && (
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-sh-text-muted">
                    {bulletin.highlights}
                  </p>
                )}

                {/* Liturgical Season Badge */}
                {bulletin.liturgicalSeason && (
                  <div className="mb-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getLiturgicalSeasonColor(
                        bulletin.liturgicalSeason,
                      )}`}
                    >
                      {bulletin.liturgicalSeason.charAt(0).toUpperCase() +
                        bulletin.liturgicalSeason.slice(1)}
                    </span>
                  </div>
                )}

                {/* Download Link */}
                <a
                  href={getFileUrl(bulletin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center text-sm font-medium text-sh-primary transition-colors hover:text-sh-primary-soft"
                >
                  Download PDF
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        )}

        {/* Bulletins Display - Cover Gallery */}
        {layout === 'covers' && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {bulletins.docs.map((bulletin) => {
              const coverUrl = getCoverImageUrl(bulletin)
              const fileUrl = getFileUrl(bulletin)

              return (
                <a
                  key={bulletin.id}
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Background Image or Gradient Fallback */}
                  {coverUrl ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${coverUrl})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-sh-primary via-sh-primary-soft to-sh-accent-gold transition-transform duration-500 group-hover:scale-105" />
                  )}

                  {/* Overlay gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Current badge */}
                  {bulletin.isCurrent && (
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        This Week
                      </span>
                    </div>
                  )}

                  {/* Liturgical Season Badge */}
                  {bulletin.liturgicalSeason && !bulletin.isCurrent && (
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-sh-primary shadow-lg">
                        {bulletin.liturgicalSeason.charAt(0).toUpperCase() + bulletin.liturgicalSeason.slice(1)}
                      </span>
                    </div>
                  )}

                  {/* Download icon - appears on hover */}
                  <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-sh-primary shadow-lg">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Date */}
                    <time className="mb-2 block text-sm font-medium text-white/80">
                      {formatDate(bulletin.date)}
                    </time>

                    {/* Visual divider */}
                    <div className="mb-3 h-0.5 w-12 bg-sh-accent-gold" />

                    {/* Download prompt - appears on hover */}
                    <div className="flex items-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <span className="text-sm font-medium">Download PDF</span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {/* Bulletins Display - List */}
        {layout === 'list' && (
          <div className="space-y-4">
            {bulletins.docs.map((bulletin) => (
              <article
                key={bulletin.id}
                className="group flex items-center gap-6 rounded-lg border border-sh-border-subtle bg-sh-surface p-6 transition-all hover:border-sh-border-strong hover:shadow-md"
              >
                {/* PDF Icon */}
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                  <svg
                    className="h-8 w-8 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <time className="text-sm font-medium text-sh-primary">
                      {formatDate(bulletin.date)}
                    </time>
                    {bulletin.isCurrent && (
                      <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700">
                        Current
                      </span>
                    )}
                    {bulletin.liturgicalSeason && (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getLiturgicalSeasonColor(
                          bulletin.liturgicalSeason,
                        )}`}
                      >
                        {bulletin.liturgicalSeason.charAt(0).toUpperCase() +
                          bulletin.liturgicalSeason.slice(1)}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-1 font-heading text-lg font-semibold text-sh-text-main">
                    {bulletin.title}
                  </h3>
                  {showHighlights && bulletin.highlights && (
                    <p className="text-sm text-sh-text-muted">{bulletin.highlights}</p>
                  )}
                </div>

                {/* Download Button */}
                <a
                  href={getFileUrl(bulletin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 rounded-lg bg-sh-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sh-primary-soft"
                >
                  Download
                </a>
              </article>
            ))}
          </div>
        )}

        {/* Bulletins Display - Compact */}
        {layout === 'compact' && (
          <div className="divide-y divide-sh-border-subtle">
            {bulletins.docs.map((bulletin) => (
              <div
                key={bulletin.id}
                className="group flex items-center justify-between py-4 transition-colors hover:bg-sh-surface/50"
              >
                <div className="flex-1">
                  <h3 className="mb-1 font-heading text-base font-semibold text-sh-text-main">
                    {bulletin.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-sh-text-muted">
                    <time>{formatDate(bulletin.date)}</time>
                    {bulletin.isCurrent && (
                      <>
                        <span>•</span>
                        <span className="font-medium text-green-700">Current Week</span>
                      </>
                    )}
                  </div>
                </div>
                <a
                  href={getFileUrl(bulletin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-sh-primary transition-colors hover:text-sh-primary-soft"
                >
                  Download
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3"
                    />
                  </svg>
                </a>
              </div>
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
              View All Bulletins
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
