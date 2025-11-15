import React from 'react'
import type { DividerBlock as DividerProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'

export const DividerBlock: React.FC<DividerProps> = ({
  style = 'line',
  thickness = 'normal',
  width = 'full',
  appearance,
}) => {
  // Space divider - just vertical spacing
  if (style === 'space') {
    return <div className={cn('h-16', blockAppearanceToClasses(appearance))} aria-hidden="true" />
  }

  // Line thickness classes
  const thicknessClasses = cn(
    thickness === 'thin' && 'border-t',
    thickness === 'normal' && 'border-t-2',
    thickness === 'thick' && 'border-t-4',
  )

  // Width classes
  const widthClasses = cn(
    width === 'full' && 'w-full',
    width === 'narrow' && 'w-3/4',
    width === 'short' && 'w-1/2',
  )

  // Border color based on background variant
  const borderColorClasses = cn(
    appearance?.backgroundVariant === 'dark' && 'border-white/20',
    appearance?.backgroundVariant === 'brand' && 'border-white/20',
    (!appearance?.backgroundVariant || appearance?.backgroundVariant === 'light' || appearance?.backgroundVariant === 'transparent') && 'border-sh-border-subtle',
  )

  // Alignment classes
  const alignmentClasses = cn(
    appearance?.alignment === 'center' && 'mx-auto',
    appearance?.alignment === 'right' && 'ml-auto',
  )

  return (
    <div className={blockAppearanceToClasses(appearance)}>
      <div className={getContainerClasses(appearance?.fullWidth)}>
        {style === 'line' && (
          <hr
            className={cn(
              thicknessClasses,
              widthClasses,
              borderColorClasses,
              alignmentClasses,
            )}
            aria-hidden="true"
          />
        )}

        {style === 'decorative' && (
          <div className={cn('flex items-center gap-3', alignmentClasses, widthClasses)}>
            <div
              className={cn(
                'flex-1 border-t-2',
                borderColorClasses,
              )}
              aria-hidden="true"
            />
            <div
              className={cn(
                'flex gap-1',
                appearance?.backgroundVariant === 'dark' || appearance?.backgroundVariant === 'brand'
                  ? 'text-white/40'
                  : 'text-sh-primary/40',
              )}
              aria-hidden="true"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            </div>
            <div
              className={cn(
                'flex-1 border-t-2',
                borderColorClasses,
              )}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  )
}
