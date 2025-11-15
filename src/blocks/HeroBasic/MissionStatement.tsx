'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utilities/ui'

type AnimationMode = 'rotating' | 'lineByLine'

interface MissionStatementProps {
  mode?: AnimationMode
  className?: string
}

const missionPhrases = ['worshiping God.', 'serving others.', 'making disciples.']

export const MissionStatement: React.FC<MissionStatementProps> = ({
  mode = 'rotating',
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (mode === 'rotating') {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % missionPhrases.length)
      }, 2500) // Cycle every 2.5 seconds

      return () => clearInterval(interval)
    }
  }, [mode])

  if (mode === 'lineByLine') {
    return (
      <div
        className={cn(
          'text-center mb-8 md:mb-12 space-y-2',
          'text-white drop-shadow-lg',
          className,
        )}
      >
        {missionPhrases.map((phrase, index) => (
          <motion.div
            key={phrase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.3,
              ease: 'easeOut',
            }}
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold"
          >
            {phrase}
          </motion.div>
        ))}
      </div>
    )
  }

  // Rotating word version (default)
  return (
    <div
      className={cn(
        'text-center mb-8 md:mb-12',
        'text-white drop-shadow-lg',
        className,
      )}
      role="region"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold">
        <span className="block mb-2">We are a community</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            className="block text-sh-gold"
          >
            {missionPhrases[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
