'use client'

import React from 'react'
import type { VideoEmbedBlock as VideoEmbedProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'
import { DecorativePattern } from '@/components/DecorativePattern'

/**
 * Convert various video URLs to embed URLs
 */
function getEmbedUrl(url: string): string {
  // YouTube
  if (url.includes('youtube.com/watch')) {
    const videoId = new URL(url).searchParams.get('v')
    return `https://www.youtube.com/embed/${videoId}`
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }

  // Vimeo
  if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
    return `https://player.vimeo.com/video/${videoId}`
  }

  // Already an embed URL or unknown format
  return url
}

export const VideoEmbedBlock: React.FC<VideoEmbedProps> = ({
  title,
  embedUrl,
  posterImage,
  description,
  aspectRatio = '16/9',
  appearance,
  decorPattern,
}) => {
  const textColorClass = getTextColorClass(appearance)
  const proseColorClass = getProseColorClass(appearance)
  const embedSrc = getEmbedUrl(embedUrl)

  // Calculate aspect ratio padding
  const aspectRatioPadding = {
    '16/9': 'pb-[56.25%]', // 9/16 = 0.5625
    '4/3': 'pb-[75%]', // 3/4 = 0.75
    '21/9': 'pb-[42.86%]', // 9/21 = 0.4286
    '1/1': 'pb-[100%]', // 1/1 = 1.0
  }[aspectRatio || '16/9'] || 'pb-[56.25%]'

  return (
    <section className={cn(blockAppearanceToClasses(appearance), 'relative overflow-hidden')}>
      {/* Decorative Pattern */}
      {decorPattern?.enabled && (
        <DecorativePattern
          type={decorPattern.typ || 'text'}
          text={decorPattern.text || undefined}
          customSvg={typeof decorPattern.customSvg === 'object' ? decorPattern.customSvg : undefined}
          opacity={decorPattern.opacity || undefined}
          size={decorPattern.sz || undefined}
          repeatCount={decorPattern.repeatCount || undefined}
          color={decorPattern.color || undefined}
          position={decorPattern.pos || undefined}
          rotation={decorPattern.rotation || undefined}
        />
      )}

      <div className={cn(getContainerClasses(appearance?.fullWidth), 'relative z-10')}>
        <div
          className={cn(
            'max-w-4xl',
            appearance?.alignment === 'center' && 'mx-auto',
            appearance?.alignment === 'right' && 'ml-auto',
          )}
        >
          {title && (
            <h2
              className={cn(
                'mb-6 font-heading text-h2 font-bold',
                textColorClass,
              )}
            >
              {title}
            </h2>
          )}

          {/* Video Container */}
          <div className={cn('relative w-full overflow-hidden rounded-lg', aspectRatioPadding)}>
            <iframe
              src={embedSrc}
              title={title || 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {description && (
            <div className="mt-6">
              <RichText
                data={description}
                enableGutter={false}
                className={cn(
                  'prose max-w-none',
                  proseColorClass,
                  textColorClass,
                )}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
