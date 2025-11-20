import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { DecorativePattern } from '@/components/DecorativePattern'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, decorativePattern }) => {
  return (
    <div className="container relative overflow-hidden">
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

      <div className="relative z-10 bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
