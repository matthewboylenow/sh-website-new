'use client'

import React, { useState, useRef, useEffect } from 'react'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { ChevronDown } from 'lucide-react'
import type { Header } from '@/payload-types'

type NavItem = NonNullable<Header['navItems']>[number]

interface DropdownMenuProps {
  item: NavItem
  isMobile?: boolean
  onClose?: () => void
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  isMobile = false,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen && !isMobile) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, isMobile])

  const submenu = item.submenu || []
  const allItems = submenu.flatMap((group) => group.items || [])

  if (isMobile) {
    return (
      <div className="border-b border-sh-border-subtle">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-sh-text-main hover:bg-sh-surface rounded-lg transition-colors"
        >
          <span>{typeof item.link === 'object' ? item.link.label : 'Menu'}</span>
          <ChevronDown
            className={cn('h-5 w-5 transition-transform', isOpen && 'rotate-180')}
          />
        </button>
        {isOpen && (
          <div className="pl-4 pb-2 space-y-1">
            {allItems.map((subItem, idx) => (
              <div key={idx} onClick={onClose}>
                <CMSLink
                  {...subItem.link}
                  className="block px-4 py-2 text-sm text-sh-text-main hover:bg-sh-surface hover:text-sh-primary rounded-lg transition-colors"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Desktop dropdown
  return (
    <div className="relative" ref={menuRef}>
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-base font-medium text-sh-text-main hover:text-sh-primary transition-colors"
      >
        <span>{typeof item.link === 'object' ? item.link.label : 'Menu'}</span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-2 w-56 z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="bg-sh-bg border border-sh-border-subtle rounded-lg shadow-xl py-2">
            {allItems.map((subItem, idx) => (
              <div key={idx}>
                <CMSLink
                  {...subItem.link}
                  className="block px-4 py-2.5 text-sm font-medium text-sh-text-main hover:bg-sh-surface hover:text-sh-primary transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
