import React from 'react'
import type { SpacerBlock as SpacerProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const SpacerBlock: React.FC<SpacerProps> = ({ size = 'medium' }) => {
  const sizeClasses = cn(
    size === 'small' && 'h-8', // 2rem
    size === 'medium' && 'h-16', // 4rem
    size === 'large' && 'h-24', // 6rem
    size === 'xlarge' && 'h-32', // 8rem
  )

  return <div className={sizeClasses} aria-hidden="true" />
}
