import React from 'react'
import { cn } from '@/utilities/ui'

export type PatternType = 'text' | 'circles' | 'lines' | 'dots' | 'waves'

export interface DecorativePatternProps {
  type: PatternType
  text?: string
  opacity?: number // 0-100
  size?: 'small' | 'medium' | 'large'
  repeatCount?: number
  color?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  rotation?: number // degrees
}

export const DecorativePattern: React.FC<DecorativePatternProps> = ({
  type,
  text = 'CHURCH',
  opacity = 5,
  size = 'large',
  repeatCount = 3,
  color = '#20336b',
  position = 'center',
  rotation = 0,
}) => {
  const sizeClasses = {
    small: 'text-[4rem] md:text-[6rem]',
    medium: 'text-[6rem] md:text-[10rem]',
    large: 'text-[8rem] md:text-[14rem] lg:text-[18rem]',
  }

  const positionClasses = {
    'top-left': 'top-0 left-0 items-start justify-start',
    'top-right': 'top-0 right-0 items-start justify-end',
    'bottom-left': 'bottom-0 left-0 items-end justify-start',
    'bottom-right': 'bottom-0 right-0 items-end justify-end',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center',
  }

  // Text Pattern
  if (type === 'text') {
    return (
      <div
        className={cn(
          'pointer-events-none absolute z-0 flex flex-col',
          positionClasses[position],
        )}
        style={{
          opacity: opacity / 100,
          color,
          transform: `${position === 'center' ? 'translate(-50%, -50%) ' : ''}rotate(${rotation}deg)`,
        }}
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'whitespace-nowrap font-heading font-black uppercase leading-none',
              sizeClasses[size],
            )}
          >
            {text}
          </div>
        ))}
      </div>
    )
  }

  // Circle Pattern
  if (type === 'circles') {
    const circleSize = {
      small: 100,
      medium: 200,
      large: 400,
    }[size]

    return (
      <div
        className={cn(
          'pointer-events-none absolute z-0',
          positionClasses[position],
        )}
        style={{ opacity: opacity / 100 }}
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <div
            key={i}
            className="rounded-full border-2 absolute"
            style={{
              width: circleSize + i * 50,
              height: circleSize + i * 50,
              borderColor: color,
              transform: `translate(-50%, -50%)`,
            }}
          />
        ))}
      </div>
    )
  }

  // Lines Pattern
  if (type === 'lines') {
    return (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-0 flex flex-col gap-8',
          positionClasses[position],
        )}
        style={{ opacity: opacity / 100, transform: `rotate(${rotation}deg)` }}
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <div
            key={i}
            className="h-1"
            style={{
              backgroundColor: color,
              width: '100%',
            }}
          />
        ))}
      </div>
    )
  }

  // Dots Pattern
  if (type === 'dots') {
    const dotSize = {
      small: 4,
      medium: 8,
      large: 12,
    }[size]

    return (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-0',
        )}
        style={{ opacity: opacity / 100 }}
      >
        <div
          className="grid grid-cols-12 gap-4 w-full h-full"
          style={{
            gridTemplateRows: `repeat(${repeatCount}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: 12 * repeatCount }).map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  // Waves Pattern
  if (type === 'waves') {
    return (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-0',
        )}
        style={{ opacity: opacity / 100 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: repeatCount }).map((_, i) => (
            <path
              key={i}
              d={`M 0 ${200 + i * 150} Q 300 ${150 + i * 150} 600 ${200 + i * 150} T 1200 ${200 + i * 150}`}
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          ))}
        </svg>
      </div>
    )
  }

  return null
}
