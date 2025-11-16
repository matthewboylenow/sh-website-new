'use client'

import React, { useState } from 'react'
import type { FAQAccordionBlock as FAQAccordionProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { blockAppearanceToClasses, getContainerClasses } from '@/utilities/blockAppearanceToClasses'
import { getTextColorClass, getProseColorClass } from '@/utilities/getTextColorClasses'

interface AccordionItemProps {
  question: string
  answer: any
  isOpen: boolean
  onToggle: () => void
  textColorClass: string
  proseColorClass: string
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  textColorClass,
  proseColorClass,
}) => {
  return (
    <div
      className={cn(
        'border-b border-sh-border-subtle',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between gap-4 py-5 text-left transition-colors hover:opacity-80',
        )}
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            'text-lg font-semibold',
            textColorClass,
          )}
        >
          {question}
        </span>
        <svg
          className={cn(
            'w-5 h-5 flex-shrink-0 transition-transform',
            isOpen && 'rotate-180',
            textColorClass,
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
              'prose max-w-none',
              proseColorClass,
              textColorClass,
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

  const textColorClass = getTextColorClass(appearance)
  const proseColorClass = getProseColorClass(appearance)

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
                'mb-8 font-heading text-h2 font-bold',
                textColorClass,
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
                textColorClass={textColorClass}
                proseColorClass={proseColorClass}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
