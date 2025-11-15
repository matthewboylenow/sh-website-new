'use client'

import React, { useState } from 'react'
import type { FAQAccordionBlock as FAQAccordionProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'

interface AccordionItemProps {
  question: string
  answer: any
  isOpen: boolean
  onToggle: () => void
  isDarkBg: boolean
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  isDarkBg,
}) => {
  return (
    <div
      className={cn(
        'border-b',
        isDarkBg ? 'border-white/20' : 'border-sh-border-subtle',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between gap-4 py-5 text-left transition-colors',
          isDarkBg ? 'hover:text-white/80' : 'hover:text-sh-primary',
        )}
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            'text-lg font-semibold',
            isDarkBg && 'text-white',
          )}
        >
          {question}
        </span>
        <svg
          className={cn(
            'w-5 h-5 flex-shrink-0 transition-transform',
            isOpen && 'rotate-180',
            isDarkBg ? 'text-white/70' : 'text-sh-text-muted',
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="pb-5 pt-2">
          <RichText
            data={answer}
            enableGutter={false}
            className={cn(
              'prose',
              isDarkBg && 'prose-invert',
            )}
          />
        </div>
      )}
    </div>
  )
}

export const FAQAccordionBlock: React.FC<FAQAccordionProps> = ({
  title,
  items,
  defaultOpen = 'none',
  appearance,
}) => {
  // Initialize open state based on defaultOpen setting
  const [openItems, setOpenItems] = useState<Set<number>>(() => {
    if (defaultOpen === 'all') {
      return new Set(items?.map((_, index) => index) || [])
    }
    if (defaultOpen === 'first' && items && items.length > 0) {
      return new Set([0])
    }
    return new Set()
  })

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const isDarkBg = appearance?.backgroundVariant === 'dark' || appearance?.backgroundVariant === 'brand'

  return (
    <section className={blockAppearanceToClasses(appearance)}>
      <div className={getContainerClasses(appearance?.fullWidth)}>
        <div
          className={cn(
            'max-w-3xl',
            appearance?.alignment === 'center' && 'mx-auto',
            appearance?.alignment === 'right' && 'ml-auto',
          )}
        >
          {title && (
            <h2
              className={cn(
                'text-h2 font-heading font-semibold mb-8',
                isDarkBg && 'text-white',
              )}
            >
              {title}
            </h2>
          )}

          <div className="space-y-0">
            {items?.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openItems.has(index)}
                onToggle={() => toggleItem(index)}
                isDarkBg={isDarkBg}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
