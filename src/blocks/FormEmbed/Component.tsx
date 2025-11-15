'use client'

import React from 'react'
import type { FormEmbedBlock as FormEmbedProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'

export const FormEmbedBlock: React.FC<FormEmbedProps> = ({
  title,
  description,
  embedType,
  embedCode,
  formUrl,
  height = 600,
  widthMode = 'centered',
  appearance,
}) => {
  const isDarkBg = appearance?.backgroundVariant === 'dark' || appearance?.backgroundVariant === 'brand'

  return (
    <section className={blockAppearanceToClasses(appearance)}>
      <div className={getContainerClasses(appearance?.fullWidth)}>
        <div
          className={cn(
            widthMode === 'centered' ? 'max-w-3xl' : 'w-full',
            appearance?.alignment === 'center' && 'mx-auto',
            appearance?.alignment === 'right' && 'ml-auto',
          )}
        >
          {/* Header */}
          {(title || description) && (
            <div className="mb-8">
              {title && (
                <h2
                  className={cn(
                    'text-h2 font-heading font-semibold mb-4',
                    isDarkBg && 'text-white',
                  )}
                >
                  {title}
                </h2>
              )}

              {description && (
                <RichText
                  data={description}
                  enableGutter={false}
                  className={cn(
                    'prose',
                    isDarkBg && 'prose-invert',
                  )}
                />
              )}
            </div>
          )}

          {/* Form Embed */}
          <div className="w-full">
            {embedType === 'html' && embedCode && (
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: embedCode }}
              />
            )}

            {embedType === 'url' && formUrl && (
              <iframe
                src={formUrl}
                title={title || 'Embedded Form'}
                width="100%"
                height={height || 600}
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full rounded-lg"
              >
                Loading form...
              </iframe>
            )}

            {/* Fallback if neither embedCode nor formUrl is provided */}
            {!embedCode && !formUrl && (
              <div
                className={cn(
                  'p-8 rounded-lg border-2 border-dashed text-center',
                  isDarkBg
                    ? 'border-white/30 text-white/70'
                    : 'border-sh-border-subtle text-sh-text-muted',
                )}
              >
                <p>Form embed not configured. Please add embed code or form URL.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
