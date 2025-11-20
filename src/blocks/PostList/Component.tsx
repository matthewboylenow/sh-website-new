import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { PostListBlock as PostListBlockType } from '@/payload-types'
import { blockAppearanceToClasses } from '@/utilities/blockAppearanceToClasses'
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cn } from '@/utilities/ui'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'
import { DecorativePattern } from '@/components/DecorativePattern'

export const PostListBlock: React.FC<PostListBlockType> = async (props) => {
  const {
    title,
    subtitle,
    categoryFilter,
    limit = 6,
    layout = 'cards',
    showExcerpt = true,
    showAuthor = true,
    showDate = true,
    showViewAllLink,
    viewAllUrl,
    decorPattern,
  } = props

  const containerClasses = blockAppearanceToClasses(props.appearance)
  const textColorClass = getTextColorClass(props.appearance)
  const proseColorClass = getProseColorClass(props.appearance)
  const payload = await getPayload({ config })

  // Build query
  const where: any = {
    _status: {
      equals: 'published',
    },
  }

  // Add category filter
  if (categoryFilter && categoryFilter.length > 0) {
    where.categories = {
      in: categoryFilter.map((cat) => (typeof cat === 'object' ? cat.id : cat)),
    }
  }

  // Fetch posts
  const posts = await payload.find({
    collection: 'posts',
    where,
    limit: limit || 6,
    sort: '-publishedAt',
  })

  if (!posts.docs || posts.docs.length === 0) {
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

  const getExcerpt = (content: any) => {
    // Simple excerpt extraction - in production you might want more sophisticated logic
    if (typeof content === 'string') {
      return content.slice(0, 150) + '...'
    }
    // For Lexical content, extract first text node
    return 'Read more...'
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

        {/* Posts Display - Card Grid */}
        {layout === 'cards' && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.docs.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-2xl hover:ring-black/10"
              >
                {post.heroImage && typeof post.heroImage === 'object' && (
                  <Link href={`/posts/${post.slug}`} className="block relative">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={post.heroImage.url || ''}
                        alt={post.heroImage.alt || post.title || ''}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                      />
                      {/* Gradient Overlay on Image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                    </div>
                  </Link>
                )}
                <div className="flex flex-1 flex-col p-6 bg-gradient-to-br from-white to-gray-50/50">
                  {/* Categories */}
                  {post.categories && Array.isArray(post.categories) && post.categories.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map((cat) => (
                        <span
                          key={typeof cat === 'object' ? cat.id : cat}
                          className="inline-flex items-center rounded-full bg-gradient-to-r from-sh-primary to-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-blue-600/20"
                        >
                          {typeof cat === 'object' ? cat.title : cat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <Link href={`/posts/${post.slug}`} className="mb-3">
                    <h3 className="font-heading text-h4 font-semibold text-sh-text-main transition-colors group-hover:text-sh-primary">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  {showExcerpt && post.meta?.description && (
                    <p className="mb-4 flex-1 text-base leading-relaxed text-sh-text-muted">
                      {post.meta.description}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-sh-text-muted">
                    {showDate && post.publishedAt && (
                      <time>{formatDate(post.publishedAt)}</time>
                    )}
                    {showAuthor &&
                      post.populatedAuthors &&
                      Array.isArray(post.populatedAuthors) &&
                      post.populatedAuthors.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{post.populatedAuthors[0].name}</span>
                        </>
                      )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Posts Display - List View */}
        {layout === 'list' && (
          <div className="space-y-6">
            {posts.docs.map((post) => (
              <article
                key={post.id}
                className="group flex gap-6 rounded-lg border border-sh-border-subtle bg-sh-surface p-6 transition-all hover:border-sh-border-strong hover:shadow-md"
              >
                {post.heroImage && typeof post.heroImage === 'object' && (
                  <Link
                    href={`/posts/${post.slug}`}
                    className="flex-shrink-0"
                  >
                    <div className="relative h-40 w-60 overflow-hidden rounded-lg">
                      <Image
                        src={post.heroImage.url || ''}
                        alt={post.heroImage.alt || post.title || ''}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                )}
                <div className="flex-1">
                  {/* Categories */}
                  {post.categories && Array.isArray(post.categories) && post.categories.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map((cat) => (
                        <span
                          key={typeof cat === 'object' ? cat.id : cat}
                          className="inline-flex items-center rounded-full bg-gradient-to-r from-sh-primary to-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-blue-600/20"
                        >
                          {typeof cat === 'object' ? cat.title : cat}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <Link href={`/posts/${post.slug}`} className="mb-3 block">
                    <h3 className="font-heading text-h3 font-semibold text-sh-text-main transition-colors group-hover:text-sh-primary">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  {showExcerpt && post.meta?.description && (
                    <p className="mb-4 text-base leading-relaxed text-sh-text-muted">
                      {post.meta.description}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-sh-text-muted">
                    {showDate && post.publishedAt && (
                      <time>{formatDate(post.publishedAt)}</time>
                    )}
                    {showAuthor &&
                      post.populatedAuthors &&
                      Array.isArray(post.populatedAuthors) &&
                      post.populatedAuthors.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{post.populatedAuthors[0].name}</span>
                        </>
                      )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Posts Display - Featured + Grid */}
        {layout === 'featured' && posts.docs.length > 0 && (
          <div className="space-y-8">
            {/* Featured Post (First) */}
            <article className="group rounded-lg border border-sh-border-subtle bg-sh-surface overflow-hidden transition-all hover:border-sh-border-strong hover:shadow-lg">
              <div className="grid md:grid-cols-2 gap-0">
                {posts.docs[0].heroImage && typeof posts.docs[0].heroImage === 'object' && (
                  <Link href={`/posts/${posts.docs[0].slug}`} className="block">
                    <div className="relative aspect-[16/9] md:aspect-auto md:h-full w-full overflow-hidden">
                      <Image
                        src={posts.docs[0].heroImage.url || ''}
                        alt={posts.docs[0].heroImage.alt || posts.docs[0].title || ''}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-8 flex flex-col justify-center">
                  <Link href={`/posts/${posts.docs[0].slug}`}>
                    <h3 className="mb-4 font-heading text-h2 font-bold text-sh-text-main transition-colors group-hover:text-sh-primary">
                      {posts.docs[0].title}
                    </h3>
                  </Link>
                  {showExcerpt && posts.docs[0].meta?.description && (
                    <p className="mb-6 text-lg leading-relaxed text-sh-text-muted">
                      {posts.docs[0].meta.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-sh-text-muted">
                    {showDate && posts.docs[0].publishedAt && (
                      <time>{formatDate(posts.docs[0].publishedAt)}</time>
                    )}
                    {showAuthor &&
                      posts.docs[0].populatedAuthors &&
                      Array.isArray(posts.docs[0].populatedAuthors) &&
                      posts.docs[0].populatedAuthors.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{posts.docs[0].populatedAuthors[0].name}</span>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </article>

            {/* Remaining Posts Grid */}
            {posts.docs.length > 1 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {posts.docs.slice(1).map((post) => (
                  <article
                    key={post.id}
                    className="group flex flex-col overflow-hidden rounded-lg border border-sh-border-subtle bg-sh-surface transition-all hover:border-sh-border-strong hover:shadow-lg"
                  >
                    {post.heroImage && typeof post.heroImage === 'object' && (
                      <Link href={`/posts/${post.slug}`} className="block">
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          <Image
                            src={post.heroImage.url || ''}
                            alt={post.heroImage.alt || post.title || ''}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <Link href={`/posts/${post.slug}`} className="mb-3">
                        <h3 className="font-heading text-h4 font-semibold text-sh-text-main transition-colors group-hover:text-sh-primary">
                          {post.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-4 text-sm text-sh-text-muted">
                        {showDate && post.publishedAt && (
                          <time>{formatDate(post.publishedAt)}</time>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* View All Link */}
        {showViewAllLink && viewAllUrl && (
          <div className="mt-12 text-center">
            <Link
              href={viewAllUrl}
              className={cn('inline-flex items-center text-lg font-medium hover:opacity-80', textColorClass)}
            >
              View All Posts
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
