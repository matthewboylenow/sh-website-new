import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

export type PatternType = 'text' | 'circles' | 'lines' | 'dots' | 'waves' | 'zigzag' | 'chevron' | 'hexagons' | 'crosses' | 'custom-svg'

export interface DecorativePatternProps {
  type: PatternType
  text?: string
  customSvg?: MediaType | number | string
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
  customSvg,
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

  // Zig Zag Pattern
  if (type === 'zigzag') {
    const spacing = {
      small: 40,
      medium: 60,
      large: 100,
    }[size]

    return (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-0',
        )}
        style={{ opacity: opacity / 100, transform: `rotate(${rotation}deg)` }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: repeatCount }).map((_, i) => {
            const yOffset = i * spacing
            return (
              <path
                key={i}
                d={`M 0 ${yOffset} L 100 ${yOffset + 50} L 200 ${yOffset} L 300 ${yOffset + 50} L 400 ${yOffset} L 500 ${yOffset + 50} L 600 ${yOffset} L 700 ${yOffset + 50} L 800 ${yOffset} L 900 ${yOffset + 50} L 1000 ${yOffset} L 1100 ${yOffset + 50} L 1200 ${yOffset}`}
                stroke={color}
                strokeWidth="3"
                fill="none"
              />
            )
          })}
        </svg>
      </div>
    )
  }

  // Chevron Pattern
  if (type === 'chevron') {
    const spacing = {
      small: 30,
      medium: 50,
      large: 80,
    }[size]

    return (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-0',
        )}
        style={{ opacity: opacity / 100, transform: `rotate(${rotation}deg)` }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: repeatCount }).map((_, i) => {
            const yOffset = i * spacing
            return (
              <g key={i}>
                <path
                  d={`M 0 ${yOffset} L 600 ${yOffset + 40} L 1200 ${yOffset}`}
                  stroke={color}
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            )
          })}
        </svg>
      </div>
    )
  }

  // Hexagons Pattern
  if (type === 'hexagons') {
    const hexSize = {
      small: 30,
      medium: 50,
      large: 80,
    }[size]

    // Calculate hexagon points
    const getHexagonPoints = (cx: number, cy: number, radius: number) => {
      const points = []
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const x = cx + radius * Math.cos(angle)
        const y = cy + radius * Math.sin(angle)
        points.push(`${x},${y}`)
      }
      return points.join(' ')
    }

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
          {Array.from({ length: Math.ceil(repeatCount * 1.5) }).map((_, row) => (
            <g key={row}>
              {Array.from({ length: Math.ceil(1200 / (hexSize * 2)) }).map((_, col) => {
                const x = col * hexSize * 1.75
                const y = row * hexSize * 1.5 + (col % 2 ? hexSize * 0.75 : 0)
                return (
                  <polygon
                    key={`${row}-${col}`}
                    points={getHexagonPoints(x, y, hexSize / 2)}
                    stroke={color}
                    strokeWidth="1.5"
                    fill="none"
                  />
                )
              })}
            </g>
          ))}
        </svg>
      </div>
    )
  }

  // Crosses Pattern
  if (type === 'crosses') {
    const crossSize = {
      small: 20,
      medium: 35,
      large: 50,
    }[size]

    const spacing = crossSize * 2.5

    return (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-0',
        )}
        style={{ opacity: opacity / 100, transform: `rotate(${rotation}deg)` }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: Math.ceil(800 / spacing) }).map((_, row) =>
            Array.from({ length: Math.ceil(1200 / spacing) }).map((_, col) => {
              const x = col * spacing
              const y = row * spacing
              return (
                <g key={`${row}-${col}`}>
                  <line
                    x1={x}
                    y1={y - crossSize / 2}
                    x2={x}
                    y2={y + crossSize / 2}
                    stroke={color}
                    strokeWidth="2"
                  />
                  <line
                    x1={x - crossSize / 2}
                    y1={y}
                    x2={x + crossSize / 2}
                    y2={y}
                    stroke={color}
                    strokeWidth="2"
                  />
                </g>
              )
            })
          )}
        </svg>
      </div>
    )
  }

  // Custom SVG Pattern
  if (type === 'custom-svg' && customSvg && typeof customSvg === 'object') {
    return (
      <div
        className={cn(
          'pointer-events-none absolute z-0',
          positionClasses[position],
        )}
        style={{
          opacity: opacity / 100,
          transform: `${position === 'center' ? 'translate(-50%, -50%) ' : ''}rotate(${rotation}deg)`,
        }}
      >
        <Media
          resource={customSvg}
          className={cn(
            'w-auto',
            size === 'small' && 'h-32 md:h-48',
            size === 'medium' && 'h-48 md:h-64',
            size === 'large' && 'h-64 md:h-96',
          )}
          imgClassName="w-auto h-full object-contain"
        />
      </div>
    )
  }

  return null
}
